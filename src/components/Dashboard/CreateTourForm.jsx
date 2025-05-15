import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const FormContainer = styled.div`
//   max-width: 900px;
//   margin: 2rem auto;
//   padding: 2rem;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
// `;

// const FormTitle = styled.h2`
//   color: #2c3e50;
//   text-align: center;
//   margin-bottom: 2rem;
// `;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
`;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   min-height: 100px;
//   resize: vertical;
// `;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &.secondary {
    background-color: #95a5a6;
    &:hover {
      background-color: #7f8c8d;
    }
  }
`;

const DayProgram = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  border-left: 4px solid #3498db;
`;

const DayTitle = styled.h4`
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const BulletPoint = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;

  input {
    flex-grow: 1;
    margin-right: 0.5rem;
  }
`;

const PriceSection = styled.div`
  background: #ecf0f1;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  input {
    margin-right: 0.5rem;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CreateTourForm = ({
  onClose,
  onCreated,
  onUpdated,
  tourData,
  isEditing = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDayIndex, setEditingDayIndex] = useState(null);

  const [tour, setTour] = useState({
    name: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",
    category: "",
    dailyPrograms: [],
  });

  const [day, setDay] = useState({
    dayNumber: 1,
    title: "",
    date: "",
    city: "",
    country: "",
    description: [""],
    price: {
      included: true,
      excluded: {
        adult: "",
        child: "",
      },
    },
  });

  // Initialize form with tour data if editing
  useEffect(() => {
    if (isEditing && tourData) {
      // Format dates to YYYY-MM-DD for input fields
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      setTour({
        ...tourData,
        startDate: formatDate(tourData.startDate),
        endDate: formatDate(tourData.endDate),
      });

      // Set day number for new days
      if (tourData.dailyPrograms && tourData.dailyPrograms.length > 0) {
        setDay({
          ...day,
          dayNumber: tourData.dailyPrograms.length + 1,
        });
      }
    }
  }, [tourData, isEditing]);

  // Fetch categories, countries, cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, countriesRes, citiesRes] = await Promise.all([
          axios.get("https://158.220.96.121/api/tour-categories"),
          axios.get("https://158.220.96.121/api/countries"),
          axios.get("https://158.220.96.121/api/cities"),
        ]);
        setCategories(categoriesRes.data);
        setCountries(countriesRes.data);
        setCities(citiesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load initial data");
      }
    };

    fetchData();
  }, []);
  const validateDayProgram = (day) => {
    if (!day.title.trim()) {
      toast.error("Day title is required");
      return false;
    }
    if (!day.date) {
      toast.error("Day date is required");
      return false;
    }
    return true;
  };
  const validateTour = () => {
    if (!tour.name.trim()) {
      toast.error("Tour name is required");
      return false;
    }
    if (!tour.country) {
      toast.error("Country is required");
      return false;
    }
    if (!tour.city) {
      toast.error("City is required");
      return false;
    }
    if (!tour.startDate) {
      toast.error("Start date is required");
      return false;
    }
    if (!tour.endDate) {
      toast.error("End date is required");
      return false;
    }
    if (!tour.category) {
      toast.error("Category is required");
      return false;
    }
    if (tour.dailyPrograms.length === 0) {
      toast.error("At least one day program is required");
      return false;
    }
    return true;
  };
  const addDailyProgram = () => {
    if (!validateDayProgram(day)) return;

    setTour((prev) => ({
      ...prev,
      dailyPrograms: [...prev.dailyPrograms, day],
    }));
    setDay({
      dayNumber: day.dayNumber + 1,
      title: "",
      date: "",
      city: "",
      country: "",
      description: [""],
      price: {
        included: true,
        excluded: { adult: "", child: "" },
      },
    });
  };

  const handleTourChange = (e) => {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "included") {
      setDay((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          included: checked,
        },
      }));
    } else if (["adult", "child"].includes(name)) {
      setDay((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          excluded: {
            ...prev.price.excluded,
            [name]: value,
          },
        },
      }));
    } else {
      setDay((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDescriptionChange = (index, value) => {
    const newDesc = [...day.description];
    newDesc[index] = value;
    setDay((prev) => ({ ...prev, description: newDesc }));
  };

  const addDescriptionBullet = () => {
    setDay((prev) => ({ ...prev, description: [...prev.description, ""] }));
  };

  const removeDescriptionBullet = (index) => {
    const newDesc = [...day.description];
    newDesc.splice(index, 1);
    setDay((prev) => ({ ...prev, description: newDesc }));
  };

  // New functions for editing existing days
  const startEditingDay = (index) => {
    setEditingDayIndex(index);
    setDay(tour.dailyPrograms[index]);
  };

  const updateDailyProgram = () => {
    if (!validateDayProgram(day)) return;

    const updatedPrograms = [...tour.dailyPrograms];
    updatedPrograms[editingDayIndex] = day;

    setTour((prev) => ({
      ...prev,
      dailyPrograms: updatedPrograms,
    }));

    // Reset day form and editing state
    setDay({
      dayNumber: tour.dailyPrograms.length + 1,
      title: "",
      date: "",
      city: "",
      country: "",
      description: [""],
      price: {
        included: true,
        excluded: { adult: "", child: "" },
      },
    });
    setEditingDayIndex(null);
  };

  const cancelEditingDay = () => {
    setEditingDayIndex(null);
    setDay({
      dayNumber: tour.dailyPrograms.length + 1,
      title: "",
      date: "",
      city: "",
      country: "",
      description: [""],
      price: {
        included: true,
        excluded: { adult: "", child: "" },
      },
    });
  };

  const removeDay = (index) => {
    if (window.confirm("Are you sure you want to remove this day?")) {
      const updatedPrograms = [...tour.dailyPrograms];
      updatedPrograms.splice(index, 1);

      // Update day numbers for all subsequent days
      for (let i = index; i < updatedPrograms.length; i++) {
        updatedPrograms[i].dayNumber = i + 1;
      }

      setTour((prev) => ({
        ...prev,
        dailyPrograms: updatedPrograms,
      }));

      // If we were editing this day, cancel editing
      if (editingDayIndex === index) {
        cancelEditingDay();
      } else if (editingDayIndex > index) {
        // Adjust editing index if we removed a day before the one being edited
        setEditingDayIndex(editingDayIndex - 1);
      }

      // Update the day number for new days
      setDay((prev) => ({
        ...prev,
        dayNumber: updatedPrograms.length + 1,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTour()) return;

    setIsSubmitting(true);

    try {
      if (isEditing) {
        // Update existing tour
        await axios.put(
          `https://158.220.96.121/api/tours/${tourData._id}`,
          tour
        );
        toast.success("Tour updated successfully!");

        if (onUpdated) {
          onUpdated();
        }
      } else {
        // Create new tour
        await axios.post("https://158.220.96.121/api/tours", tour);
        toast.success("Tour created successfully!");

        // Reset form
        setTour({
          name: "",
          country: "",
          city: "",
          startDate: "",
          endDate: "",
          category: "",
          dailyPrograms: [],
        });
        setDay({
          dayNumber: 1,
          title: "",
          date: "",
          city: "",
          country: "",
          description: [""],
          price: {
            included: true,
            excluded: { adult: "", child: "" },
          },
        });

        if (onCreated) {
          onCreated();
        }
      }

      // Close form after 2 seconds if onClose prop is provided
      if (onClose) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      console.error("Error saving tour:", error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "create"} tour`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit Tour" : "Add New Tour"}
        </Typography>
        <TwoColumnGrid>
          <FormGroup>
            <Label>Tour Name *</Label>
            <Input
              name="name"
              placeholder="Enter tour name"
              value={tour.name}
              onChange={handleTourChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Category *</Label>
            <Select
              name="category"
              value={tour.category}
              onChange={handleTourChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </TwoColumnGrid>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Country *</Label>
            <Select
              name="country"
              value={tour.country}
              onChange={handleTourChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country._id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>City *</Label>
            <Select
              name="city"
              value={tour.city}
              onChange={handleTourChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </TwoColumnGrid>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Start Date *</Label>
            <Input
              type="date"
              name="startDate"
              value={tour.startDate}
              onChange={handleTourChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>End Date *</Label>
            <Input
              type="date"
              name="endDate"
              value={tour.endDate}
              onChange={handleTourChange}
              required
            />
          </FormGroup>
        </TwoColumnGrid>

        {/* Display existing days with edit/delete options */}
        {tour.dailyPrograms.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <Typography variant="h6" mb={2}>
              Daily Programs
            </Typography>
            {tour.dailyPrograms.map((program, index) => (
              <DayProgram key={index} style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <DayTitle>
                    Day {program.dayNumber}: {program.title}
                  </DayTitle>
                  <div>
                    <Button
                      type="button"
                      onClick={() => startEditingDay(index)}
                      disabled={editingDayIndex !== null}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="secondary"
                      onClick={() => removeDay(index)}
                      disabled={editingDayIndex !== null}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <p>Date: {formatDate(program.date)}</p>
                <p>
                  Location: {program.city}, {program.country}
                </p>
                <div>
                  <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
                    Description:
                  </h4>
                  <ul style={{ paddingLeft: "20px" }}>
                    {program.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <h4 style={{ fontWeight: "bold" }}>Price:</h4>
                  {program.price.included ? (
                    <p>Included in package</p>
                  ) : (
                    <div>
                      <p>Adult: ${program.price.excluded.adult || "N/A"}</p>
                      <p>Child: ${program.price.excluded.child || "N/A"}</p>
                    </div>
                  )}
                </div>
              </DayProgram>
            ))}
          </div>
        )}

        <DayProgram>
          <DayTitle>
            {editingDayIndex !== null
              ? `Edit Day ${day.dayNumber}`
              : `Add Daily Program (Day ${day.dayNumber})`}
          </DayTitle>

          <TwoColumnGrid>
            <FormGroup>
              <Label>Title *</Label>
              <Input
                name="title"
                placeholder="Day title"
                value={day.title}
                onChange={handleDayChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Date *</Label>
              <Input
                type="date"
                name="date"
                value={
                  typeof day.date === "string" && day.date.includes("T")
                    ? day.date.split("T")[0]
                    : day.date
                }
                onChange={handleDayChange}
              />
            </FormGroup>
          </TwoColumnGrid>

          <TwoColumnGrid>
            <FormGroup>
              <Label>Country</Label>
              <Select
                name="country"
                value={day.country}
                onChange={handleDayChange}
              >
                <option value="">Select Day Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>City</Label>
              <Select name="city" value={day.city} onChange={handleDayChange}>
                <option value="">Select Day City</option>
                {cities.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </TwoColumnGrid>

          <FormGroup>
            <Label>Description</Label>
            {day.description.map((desc, i) => (
              <BulletPoint key={i}>
                <Input
                  placeholder={`Description point ${i + 1}`}
                  value={desc}
                  onChange={(e) => handleDescriptionChange(i, e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => removeDescriptionBullet(i)}
                  className="secondary"
                >
                  Remove
                </Button>
              </BulletPoint>
            ))}
            <Button type="button" onClick={addDescriptionBullet}>
              + Add Description Point
            </Button>
          </FormGroup>

          <PriceSection>
            <CheckboxLabel>
              <Input
                type="checkbox"
                name="included"
                checked={day.price.included}
                onChange={handleDayChange}
              />
              <span style={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
                Price Included in Package
              </span>
            </CheckboxLabel>

            {!day.price.included && (
              <TwoColumnGrid>
                <FormGroup>
                  <Label>Adult Price</Label>
                  <Input
                    name="adult"
                    type="number"
                    placeholder="Enter adult price"
                    value={day.price.excluded.adult || ""}
                    onChange={handleDayChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Child Price</Label>
                  <Input
                    name="child"
                    type="number"
                    placeholder="Enter child price"
                    value={day.price.excluded.child || ""}
                    onChange={handleDayChange}
                  />
                </FormGroup>
              </TwoColumnGrid>
            )}
          </PriceSection>

          <Button type="button" onClick={addDailyProgram}>
            + Add Day Program
          </Button>
        </DayProgram>

        {tour.dailyPrograms.length > 0 && (
          <div>
            <h3>Added Days ({tour.dailyPrograms.length})</h3>
            <ul>
              {tour.dailyPrograms.map((program, index) => (
                <li key={index}>
                  Day {program.dayNumber}: {program.title} ({program.date})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Tour"
              : "Create Tour"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateTourForm;
