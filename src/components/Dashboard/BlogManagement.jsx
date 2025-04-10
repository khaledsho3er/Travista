import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

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
    embeddedImages: [],
    tagInput: "",
    seoInput: "",
  });

  const fetchBlogs = async () => {
    const { data } = await axios.get("http://localhost:5000/api/blog");
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
      setForm((prev) => ({ ...prev, embeddedImages: Array.from(files) }));
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
      if (key === "embeddedImages") {
        form.embeddedImages.forEach((file) =>
          formData.append("embeddedImages", file)
        );
      } else if (key === "tags" || key === "seoKeywords") {
        form[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, form[key]);
      }
    }

    if (selectedBlog) {
      await axios.put(
        `http://localhost:5000/api/blog/${selectedBlog._id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:5000/api/blog", formData);
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
      embeddedImages: [],
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
      <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
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
            embeddedImages: [],
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
                src={`http://localhost:5000/uploads/${blog.featuredImage}`}
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
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="w-full p-2 border rounded h-40"
                required
              ></textarea>

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

              <label>Embedded Images</label>
              <input
                type="file"
                name="embeddedImages"
                multiple
                onChange={handleChange}
                className="block w-full"
              />

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
    </div>
  );
};

export default BlogManager;
