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

const CreateTourForm = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTour()) return;

    setIsSubmitting(true);

    try {
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

      // Close form after 2 seconds if onClose prop is provided
      if (onClose) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      toast.error(error.response?.data?.message || "Failed to create tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" mb={2}>
          Add New Tour
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

        <DayProgram>
          <DayTitle>Add Daily Program (Day {day.dayNumber})</DayTitle>

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
                value={day.date}
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
                    value={day.price.excluded.adult}
                    onChange={handleDayChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Child Price</Label>
                  <Input
                    name="child"
                    type="number"
                    placeholder="Enter child price"
                    value={day.price.excluded.child}
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
            {isSubmitting ? "Creating..." : "Create Tour"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateTourForm;
