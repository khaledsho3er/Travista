import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    slug: "",
    contentTitle: "",
    content: "",
    category: "stories",
    tags: [],
    status: "draft",
    scheduledDate: "",
    seoKeywords: [],
    featuredImage: null,
    embeddedImages: null, // single file or null
    tagInput: "",
    seoInput: "",
    metaDescription: "",
  });

  const fetchBlogs = async () => {
    const { data } = await axios.get("https://api.travistasl.com/api/blog");
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "featuredImage") {
      setForm((prev) => ({ ...prev, featuredImage: files[0] }));
    } else if (name === "embeddedImages") {
      setForm((prev) => ({
        ...prev,
        embeddedImages: files && files[0] ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    if (form.tagInput.trim()) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, form.tagInput.trim()],
        tagInput: "",
      }));
    }
  };
  const removeTag = (index) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const addSeoKeyword = () => {
    if (form.seoInput.trim()) {
      setForm((prev) => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, form.seoInput.trim()],
        seoInput: "",
      }));
    }
  };
  const removeSeoKeyword = (index) => {
    setForm((prev) => ({
      ...prev,
      seoKeywords: prev.seoKeywords.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (["tagInput", "seoInput"].includes(key)) continue;
      if (key === "embeddedImages" && form.embeddedImages) {
        formData.append("embeddedImages", form.embeddedImages);
      } else if (key === "tags" || key === "seoKeywords") {
        form[key].forEach((item) => formData.append(key, item));
      } else if (key !== "embeddedImages") {
        formData.append(key, form[key]);
      }
    }

    if (selectedBlog) {
      await axios.put(
        `https://api.travistasl.com/api/blog/${selectedBlog._id}`,
        formData
      );
    } else {
      await axios.post("https://api.travistasl.com/api/blog", formData);
    }

    const isSeoFriendly =
      form.title.length > 10 &&
      form.subTitle.length > 30 &&
      form.seoKeywords.length >= 3 &&
      form.slug.length > 5;

    if (isSeoFriendly) {
      toast.success("Your blog is SEO-friendly and ready to be discovered!");
    } else {
      toast.warn(
        "Your blog is missing some SEO elements. Improve title, subtitle, keywords, and slug."
      );
    }
    fetchBlogs();
    setForm({
      title: "",
      subTitle: "",
      slug: "",
      contentTitle: "",
      content: "",
      category: "stories",
      tags: [],
      status: "draft",
      scheduledDate: "",
      seoKeywords: [],
      featuredImage: null,
      embeddedImages: null,
      tagInput: "",
      seoInput: "",
    });
    setSelectedBlog(null);
    setFormVisible(false);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setForm({
      ...blog,
      seoKeywords: blog.seoKeywords || [],
      tags: blog.tags.map((tag) => tag._id || tag),
      scheduledDate: blog.scheduledDate ? blog.scheduledDate.slice(0, 10) : "",
      tagInput: "",
      seoInput: "",
    });
    setFormVisible(true);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Blog Management
      </Typography>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        onClick={() => {
          setSelectedBlog(null);
          setForm({
            title: "",
            subTitle: "",
            slug: "",
            contentTitle: "",
            content: "",
            category: "stories",
            tags: [],
            status: "draft",
            scheduledDate: "",
            seoKeywords: [],
            featuredImage: null,
            embeddedImages: null,
            tagInput: "",
            seoInput: "",
          });
          setFormVisible(true);
        }}
      >
        Write a Blog
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer"
            onClick={() => handleEdit(blog)}
          >
            {blog.featuredImage && (
              <img
                src={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
                alt="Featured"
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="font-bold text-lg">{blog.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedBlog ? "Edit Blog" : "Create Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <label>Sub Title</label>
              <input
                type="text"
                name="subTitle"
                value={form.subTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {/* Slug is a unique string that is used to identify the blog post in the URL. It should be short, descriptive and only contain letters, numbers and hyphens. */}
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <label>Content Title</label>
              <input
                type="text"
                name="contentTitle"
                value={form.contentTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <label>Content</label>
              <ReactQuill
                value={form.content}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, content: value }))
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                theme="snow"
              />

              <label>SEO Keywords</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="seoInput"
                  value={form.seoInput}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={addSeoKeyword}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {kw}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => removeSeoKeyword(idx)}
                    />
                  </span>
                ))}
              </div>
              <label>Meta Description (max 160 characters)</label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                maxLength={160}
                className="w-full p-2 border rounded h-20"
                placeholder="Write a concise description for SEO purposes."
              ></textarea>
              {/* SEO Tips */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded my-4">
                <h4 className="font-semibold text-yellow-800 mb-2">SEO Tips</h4>
                <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                  <li>Use a descriptive, keyword-rich title.</li>
                  <li>
                    Write a short and compelling sub-title (acts as meta
                    description).
                  </li>
                  <li>Add 3–8 relevant SEO keywords.</li>
                  <li>Use a clean, readable slug (e.g., my-travel-guide).</li>
                  <li>Upload a relevant featured image.</li>
                </ul>
              </div>

              {/* Google Search Result Preview */}
              <div className="bg-gray-100 p-4 rounded border">
                <p className="text-green-700 text-sm">
                  https:/travistasl.com/Blogs/{form.slug || "your-slug"}
                </p>
                <p className="text-blue-800 font-semibold">
                  {form.title || "Your Blog Title Here"}
                </p>
                <p className="text-gray-700 text-sm">
                  {(form.subTitle.length > 150
                    ? form.subTitle.slice(0, 150) + "..."
                    : form.subTitle) ||
                    "This is a short preview of your blog's content or subtitle..."}
                </p>
              </div>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="stories">Stories</option>
                <option value="news">News</option>
                <option value="guide">Guide</option>
              </select>

              <label>Tags</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="tagInput"
                  value={form.tagInput}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {kw}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={() => removeTag(idx)}
                    />
                  </span>
                ))}
              </div>

              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>

              <label>Scheduled Date</label>
              <input
                type="date"
                name="scheduledDate"
                value={form.scheduledDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <label>Featured Image</label>
              <input
                type="file"
                name="featuredImage"
                onChange={handleChange}
                className="block w-full"
              />
              {form.featuredImage && (
                <div style={{ margin: "10px 0" }}>
                  <img
                    src={
                      typeof form.featuredImage === "string"
                        ? `https://api.travistasl.com/uploads/${form.featuredImage}`
                        : URL.createObjectURL(form.featuredImage)
                    }
                    alt="Featured Preview"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  />
                </div>
              )}

              <label>Embedded Images</label>
              <input
                type="file"
                name="embeddedImages"
                onChange={handleChange} // ✅ keep as is
                className="block w-full"
              />
              {form.embeddedImages && (
                <div style={{ margin: "10px 0" }}>
                  <img
                    src={
                      typeof form.embeddedImages === "string"
                        ? `https://api.travistasl.com/uploads/${form.embeddedImages}`
                        : URL.createObjectURL(form.embeddedImages)
                    }
                    alt="Embedded Preview"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setFormVisible(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {selectedBlog ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default BlogManager;
