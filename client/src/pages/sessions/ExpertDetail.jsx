import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaVideo,
  FaUser,
  FaPhone,
  FaInfoCircle,
  FaBell,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const parseDate = (dateStr) => {
  const parts = dateStr?.split("-");
  if (parts?.length !== 3) return new Date(dateStr);
  const [year, month, day] = parts.map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const officeData = {
  officeAddress: "Ollato Mind Mapping, Mulund, India",
  officePhotos: [
    "https://thumbs.dreamstime.com/b/office-work-place-5879959.jpg",
    "https://thumbs.dreamstime.com/b/office-work-place-5879959.jpg",
    "https://thumbs.dreamstime.com/b/office-work-place-5879959.jpg",
    // "https://thumbs.dreamstime.com/b/office-work-place-5879959.jpg",
  ],
};

const groupTimeSlots = (slots = []) => {
  const groups = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  slots.forEach((time) => {
    if (!time) return;

    try {
      const [timePart, modifier] = time.split(" ");
      let [hoursStr, minutesStr] = timePart.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr || "0", 10);

      if (modifier) {
        if (modifier.toUpperCase() === "PM" && hours !== 12) {
          hours += 12;
        } else if (modifier.toUpperCase() === "AM" && hours === 12) {
          hours = 0;
        }
      }

      if (hours >= 5 && hours < 12) {
        groups.Morning.push(time);
      } else if (hours >= 12 && hours < 17) {
        groups.Afternoon.push(time);
      } else {
        groups.Evening.push(time);
      }
    } catch (error) {
      console.error("Error processing time slot:", time, error);
    }
  });

  return groups;
};

const computeEndTime = (startTime, duration) => {
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier?.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const formatTime = (mins) => {
    const hrs = Math.floor(mins / 60) % 24;
    const minutes = mins % 60;
    const period = hrs >= 12 ? "PM" : "AM";
    const hours12 = hrs % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const startMinutes = parseTime(startTime);
  const endMinutes = startMinutes + duration;
  return formatTime(endMinutes);
};

const ExpertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_APP_SESSION_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [detailsResponse, availabilityResponse] = await Promise.all([
          axios.get(`${apiUrl}/expert-details/get-experts-details/${id}`),
          axios.get(`${apiUrl}/expert-details/get-experts-availability/${id}`),
        ]);

        const expertData =
          detailsResponse.data.expertsDetails?.[0] || detailsResponse.data;
        setExpert({
          ...expertData,
          expertise: expertData.expertise
            ? JSON.parse(expertData.expertise)
            : [],
          languages: expertData.languages
            ? JSON.parse(expertData.languages)
            : [],
        });

        const availData = Array.isArray(availabilityResponse.data)
          ? availabilityResponse.data
          : [availabilityResponse.data];
        setAvailability(
          availData.filter((item) => item.availability_status === "available")
        );

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load expert details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, apiUrl]);

  useEffect(() => {
    if (availability.length > 0 && !selectedDate) {
      setSelectedDate(availability[0]);
    }
  }, [availability, selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedDate.availability_mode && !selectedMode) {
      setSelectedMode(selectedDate.availability_mode.split(",")[0].trim());
    }
  }, [selectedDate, selectedMode]);

  useEffect(() => {
    if (
      selectedDate &&
      selectedDate.availability_duration &&
      !selectedDuration
    ) {
      setSelectedDuration(
        `${selectedDate.availability_duration.split(",")[0].trim()} mins`
      );
    }
  }, [selectedDate, selectedDuration]);

  const generateTimeSlots = (start, end, duration) => {
    if (!start || !end || !duration) return [];

    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier?.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const formatTime = (mins) => {
      const hrs = Math.floor(mins / 60) % 24;
      const minutes = mins % 60;
      const period = hrs >= 12 ? "PM" : "AM";
      const hours12 = hrs % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const startMinutes = parseTime(start);
    const endMinutes = parseTime(end);
    const slots = [];

    for (
      let time = startMinutes;
      time <= endMinutes - duration;
      time += duration
    ) {
      slots.push(formatTime(time));
    }

    return slots;
  };

  const handleDateNavigation = (direction) => {
    setCurrentDateIndex((prev) =>
      direction === "left"
        ? Math.max(0, prev - 1)
        : Math.min(availability.length - 3, prev + 1)
    );
  };

  const handleBookingConfirmation = async () => {
    if (
      !selectedDate ||
      !selectedStartTime ||
      !selectedDuration ||
      !selectedMode
    ) {
      toast.error("⚠️ Please select a mode, duration, date, and time.");
      return;
    }

    const durationMinutes = parseInt(selectedDuration.replace(" mins", ""), 10);
    const bookingEndTime = computeEndTime(selectedStartTime, durationMinutes);

    const payload = {
      client_id: user.userId,
      expert_id: id,
      booking_date: selectedDate.availability_date,
      booking_start_time: selectedStartTime,
      booking_end_time: bookingEndTime,
      session_mode: selectedMode.toLowerCase(),
      session_duration: durationMinutes,
    };
    try {
      const response = await axios.post(`${apiUrl}/sessions/request`, payload);
      setShowConfirmModal(false);
      toast.success(
        `🎉 Session booked successfully on ${selectedDate.availability_date} at ${selectedStartTime}!`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } catch (error) {
      console.error(" Booking failed:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          toast.error(
            `⚠️ ${
              data.message ||
              "A session at this time is already booked. Please pick another time."
            }`
          );
        } else {
          toast.error(
            `Booking failed: ${data.message || "Please try again later."}`
          );
        }
      } else {
        toast.error(
          "⚠️ Network error. Please check your connection and try again."
        );
      }
    }
  };

  const allSlots =
    selectedDate && selectedDuration
      ? generateTimeSlots(
          selectedDate.availability_start_time,
          selectedDate.availability_end_time,
          parseInt(selectedDuration.replace(" mins", ""), 10)
        )
      : [];

  const groupedSlots = groupTimeSlots(allSlots);
  const selectedEndTime = selectedStartTime
    ? computeEndTime(
        selectedStartTime,
        parseInt(selectedDuration.replace(" mins", ""), 10)
      )
    : "";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Expert not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="border border-gray-200 rounded-lg bg-white p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-textSecondary hover:text-textSecondary-hover"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <img
              src={expert.profile_Picture || "https://via.placeholder.com/150"}
              alt={`${expert.first_name} ${expert.last_name}`}
              className="rounded-full w-16 h-16 border-2 border-gray-700 mr-4"
            />
            <h2 className="text-xl text-textSecondary font-semibold">{`${expert.first_name} ${expert.last_name}`}</h2>
          </div>

          <div className="w-full md:w-auto">
            <h5 className="text-center font-bold text-secondary mb-2">
              Mode of session
            </h5>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedDate?.availability_mode
                ?.split(",")
                .map((mode, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                      selectedMode === mode.trim()
                        ? "bg-textSecondary text-white"
                        : "border border-textSecondary text-textSecondary"
                    }`}
                    onClick={() => setSelectedMode(mode.trim())}
                  >
                    {mode.trim() === "video" && (
                      <FaVideo className="inline mr-1" />
                    )}
                    {mode.trim() === "in-person" && (
                      <FaUser className="inline mr-1" />
                    )}
                    {mode.trim() === "call" && (
                      <FaPhoneAlt className="inline mr-1" />
                    )}
                    {mode.trim()}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          {/* Session Mode Details */}
          <div className="mb-6">
            <h5 className="font-bold text-gray-600 text-brown-600 mb-3">
              Mode of session: {selectedMode}
            </h5>
            {selectedMode.toLowerCase() === "in-person" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold  text-gray-600">
                    Address:{" "}
                    <span className="font-bold">
                      {" "}
                      {expert.officeAddress || officeData.officeAddress}
                    </span>
                  </p>
                  <FaMapMarkerAlt className="border border-gray-800 rounded p-1 text-xl" />
                </div>
                <div className="flex gap-3 overflow-x-auto py-3">
                  {officeData.officePhotos.map((photo, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={photo}
                        alt={`Office ${index + 1}`}
                        className="h-20 w-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Duration Selection */}
          <div>
            <h5 className="font-bold text-gray-600 mb-4">Session duration</h5>
            <div className="flex flex-wrap justify-center gap-3">
              {selectedDate?.availability_duration
                ?.split(",")
                .map((dur, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      selectedDuration === `${dur.trim()} mins`
                        ? "bg-textSecondary text-white"
                        : "border border-textSecondary text-textSecondary-hover"
                    }`}
                    onClick={() => setSelectedDuration(`${dur.trim()} mins`)}
                  >
                    <FaClock className="mr-2" />
                    {dur.trim()} mins
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column - Date & Time Selection */}
        <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
          <div>
            <h5 className="font-bold text-gray-600 mb-4">Date and time</h5>
            <div className="flex items-center justify-between mb-6">
              <button
                className="p-2 border border-gray-700 rounded-full"
                onClick={() => handleDateNavigation("left")}
              >
                <FaArrowLeft />
              </button>
              <div className="flex justify-between w-3/4">
                {availability
                  .slice(currentDateIndex, currentDateIndex + 3)
                  .map((date, index) => {
                    const slots =
                      selectedDate && selectedDuration
                        ? generateTimeSlots(
                            date.availability_start_time,
                            date.availability_end_time,
                            parseInt(selectedDuration.replace(" mins", ""), 10)
                          )
                        : [];
                    const totalSlots = slots.length;

                    return (
                      <div
                        key={index}
                        className={`text-center w-28 p-2 rounded-lg border cursor-pointer transition-colors ${
                          selectedDate?.availability_date ===
                          date.availability_date
                            ? "bg-blue-100 border-blue-300"
                            : "bg-gray-100 border-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedStartTime(null);
                        }}
                      >
                        <p className="font-bold text-gray-700">
                          {parseDate(date.availability_date).toLocaleDateString(
                            "en-US",
                            { weekday: "short" }
                          )}
                        </p>
                        <p className="text-gray-600 font-bold ">
                          {parseDate(date.availability_date).toLocaleDateString(
                            "en-US",
                            { day: "numeric" }
                          )}
                        </p>
                        <p className="text-sm text-green-600 font-bold">
                          {totalSlots} slots
                        </p>
                      </div>
                    );
                  })}
              </div>
              <button
                className="p-2 border border-gray-700 rounded-full"
                onClick={() => handleDateNavigation("right")}
              >
                <FaArrowRight />
              </button>
            </div>

            {selectedDate && selectedDuration && (
              <div className="mt-6">
                {Object.entries(groupedSlots).map(([period, slots]) => (
                  <div key={period} className="mb-6">
                    <h6 className="font-bold capitalize text-gray-600 mb-4">
                      {period}
                    </h6>
                    <div className="flex flex-wrap gap-3">
                      {slots.length > 0 ? (
                        slots.map((time, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg text-gray-600 cursor-pointer text-center w-28 ${
                              selectedStartTime === time
                                ? "border-2 border-brown-600 bg-blue-100"
                                : "border border-gray-200 bg-gray-50"
                            }`}
                            onClick={() => setSelectedStartTime(time)}
                          >
                            <p className="font-bold">{time}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-red-500">
                          No slots available
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-8 py-3 bg-textSecondary text-white rounded-lg text-lg hover:bg-textSecondary-hover disabled:opacity-50"
              disabled={!selectedStartTime}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="bg-secondary text-white rounded-t-lg p-4 flex justify-between items-center">
              <h5 className="text-lg font-semibold flex items-center">
                <FaInfoCircle className="mr-2" />
                Session Details
              </h5>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-white text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <p>
                  <strong>
                    <FaUser className="inline mr-2" />
                    Counselor Name:
                  </strong>{" "}
                  {`${expert.first_name} ${expert.last_name}`}
                </p>
                <p>
                  <strong>
                    <FaUser className="inline mr-2" />
                    Counselor ID:
                  </strong>{" "}
                  {expert.expert_id}
                </p>
                <p>
                  <strong>
                    <FaVideo className="inline mr-2" />
                    Mode of Session:
                  </strong>{" "}
                  {selectedMode}
                </p>
                <p>
                  <strong>
                    <FaClock className="inline mr-2" />
                    Duration:
                  </strong>{" "}
                  {selectedDuration}
                </p>
                <p>
                  <strong>
                    <FaClock className="inline mr-2" />
                    Date:
                  </strong>{" "}
                  {parseDate(
                    selectedDate?.availability_date
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>
                    <FaClock className="inline mr-2" />
                    Time:
                  </strong>{" "}
                  {selectedStartTime} - {selectedEndTime}
                </p>
              </div>
              <div className="mt-6 p-3 bg-blue-50 rounded text-sm">
                <strong>
                  <FaBell className="inline mr-2" />
                  Note:
                </strong>{" "}
                The counselor will get back to you shortly.
              </div>
            </div>
            <div className="flex justify-between p-4 border-t">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
              >
                <FaTimes className="mr-2" /> Close
              </button>
              <button
                onClick={handleBookingConfirmation}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <FaCheck className="mr-2" /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ExpertDetails;
