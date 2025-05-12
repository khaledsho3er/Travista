import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTourForm from "./CreateTourForm";
import { Typography } from "@mui/material";
const ToursDashboard = () => {
  const [tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  const fetchTours = async () => {
    try {
      const res = await axios.get("https://158.220.96.121/api/tours");
      setTours(res.data);
    } catch (error) {
      toast.error("Failed to load tours");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleTourCreated = () => {
    setShowModal(false);
    fetchTours();
    toast.success("Tour created successfully!");
  };

  const openTourDetails = (tour) => {
    setSelectedTour(tour);
  };

  const closeTourDetails = () => {
    setSelectedTour(null);
  };

  return (
    <div className="p-4 relative">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Tours Management
        </Typography>{" "}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Tour
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <div
            key={tour._id}
            onClick={() => openTourDetails(tour)}
            className="border rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{tour.name}</h2>
            <p className="text-sm text-gray-600">
              {tour.city}, {tour.country}
            </p>
            <p className="text-sm">
              Dates: {new Date(tour.startDate).toLocaleDateString()} →{" "}
              {new Date(tour.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-1">
              Days: {tour.dailyPrograms?.length || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Create Tour Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Tour</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <CreateTourForm
              onCreated={handleTourCreated}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Tour Details Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTour.name}</h2>
              <button
                onClick={closeTourDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Basic Information</h3>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {selectedTour.country}
                </p>
                <p>
                  <span className="font-medium">City:</span> {selectedTour.city}
                </p>
                <p>
                  <span className="font-medium">Dates:</span>{" "}
                  {new Date(selectedTour.startDate).toLocaleDateString()} -{" "}
                  {new Date(selectedTour.endDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Daily Programs ({selectedTour.dailyPrograms?.length || 0})
                </h3>
                <div className="space-y-2">
                  {selectedTour.dailyPrograms?.map((day, index) => (
                    <div
                      key={index}
                      className="border-b pb-2 cursor-pointer"
                      onClick={() => setExpandedDay(index)}
                    >
                      <p>
                        <span className="font-medium">
                          Day {day.dayNumber}:
                        </span>{" "}
                        {day.title}
                      </p>
                      <p className="text-sm">
                        {new Date(day.date).toLocaleDateString()}
                      </p>
                      {expandedDay === index && (
                        <div className="mt-2">
                          <h4 className="font-medium">Description:</h4>
                          <ul className="list-disc ml-5">
                            {day.description.map((desc, i) => (
                              <li key={i} className="text-sm">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={closeTourDetails}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursDashboard;
