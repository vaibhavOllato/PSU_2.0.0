import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Search } from "lucide-react";

const BookSession = () => {
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 3]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionsPerPage = 8;
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_SESSION_URL;

  const safeJsonParseArray = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Failed to parse:", str);
      return [];
    }
  };
  // Utility function to safely parse and flatten broken JSON array strings
  const parseExpertise = (expertiseArray) => {
    console.log("Expertise Array:", expertiseArray);

    try {
      const fixedString = expertiseArray.join(""); // Join the broken strings
      const parsed = JSON.parse(fixedString); // Parse as JSON
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const parseLanguages = (langArray) => {
    // console.log("Language Array:", langArray);

    try {
      const fixedString = langArray.join("");
      const parsed = JSON.parse(fixedString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [day, month, year] = dateString.split("-");
    const isoDate = `${year}-${month}-${day}`;
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [detailsResponse, availabilitiesResponse] = await Promise.all([
          axios.get(`${apiUrl}/expert-details/get-all-experts-details`),
          axios.get(`${apiUrl}/expert-details/get-expert-availabilities`),
        ]);

        const expertsData = detailsResponse.data.expertsDetails || [];
        const availabilities = availabilitiesResponse.data || [];

        const getNextSlotForMode = (expertAvailabilities, modeKeyword) => {
          const filtered = expertAvailabilities.filter(
            (av) =>
              av.availability_mode.toLowerCase().includes(modeKeyword) &&
              av.availability_status.toLowerCase() === "available"
          );
          if (filtered.length === 0) return null;
          filtered.sort((a, b) => {
            const dateA = new Date(
              `${a.availability_date}T${a.availability_start_time}`
            );
            const dateB = new Date(
              `${b.availability_date}T${b.availability_start_time}`
            );
            return dateA - dateB;
          });
          return filtered[0];
        };

        const sessionsData = expertsData.map((expert) => {
          const expertAvailabilities = availabilities.filter(
            (av) => av.expert_id === expert.expert_id
          );

          const modeSet = new Set();
          expertAvailabilities.forEach((av) => {
            av.availability_mode.split(",").forEach((mode) => {
              modeSet.add(mode.trim().toLowerCase());
            });
          });
          const availableModes = Array.from(modeSet);

          // const onlineSlot = getNextSlotForMode(expertAvailabilities, "video");
          // const inPersonSlot = getNextSlotForMode(
          //   expertAvailabilities,
          //   "in-person"
          // );
          // const activeTab = availableModes.includes("video")
          //   ? "online"
          //   : availableModes.includes("in-person")
          //     ? "inPerson"
          //     : null;
          // Determine active tab - prioritize video if available, then call, then in-person
          const videoSlot = getNextSlotForMode(expertAvailabilities, "video");
          const callSlot = getNextSlotForMode(expertAvailabilities, "call");
          const inPersonSlot = getNextSlotForMode(
            expertAvailabilities,
            "in-person"
          );

          const activeTab = availableModes.includes("video")
            ? "video"
            : availableModes.includes("call")
            ? "call"
            : availableModes.includes("in-person")
            ? "inPerson"
            : null;
          return {
            id: expert.expert_id,
            expertId: expert.expert_id,
            name: `${expert.first_name} ${expert.last_name}`,
            image: expert.profile_Picture,
            experience: `${expert.experience} year${
              expert.experience !== 1 ? "s" : ""
            }`,
            city: expert.district,
            state: expert.state,
            activeTab,
            availableModes,
            expertDetails: {
              ...expert,
              languages: safeJsonParseArray(expert.languages),
              expertise: safeJsonParseArray(expert.expertise),
            },
            videoSlot,
            callSlot,
            inPersonSlot,
          };
        });
        // console.log("Sessions Data:", sessionsData);

        setSessions(sessionsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const filteredSessions = sessions.filter((session) => {
    if (!searchQuery) return true;

    const name = session.name?.toLowerCase() || "";
    const expertise =
      session.expertDetails?.expertise?.join(",").toLowerCase() || "";
    const languages =
      session.expertDetails?.languages?.join(",").toLowerCase() || "";
    const location = `${session.city} ${session.state}`.toLowerCase() || "";

    return (
      name.includes(searchQuery.toLowerCase()) ||
      expertise.includes(searchQuery.toLowerCase()) ||
      languages.includes(searchQuery.toLowerCase()) ||
      location.includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession
  );
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      if (currentPage + 1 > pageRange[1]) {
        setPageRange([pageRange[0] + 3, pageRange[1] + 3]);
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      if (currentPage - 1 < pageRange[0]) {
        setPageRange([pageRange[0] - 3, pageRange[1] - 3]);
      }
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      if (pageNumber > pageRange[1]) {
        setPageRange([pageRange[0] + 3, pageRange[1] + 3]);
      } else if (pageNumber < pageRange[0]) {
        setPageRange([pageRange[0] - 3, pageRange[1] - 3]);
      }
    }
  };

  const pageNumbers = [];
  for (let i = pageRange[0]; i <= Math.min(pageRange[1], totalPages); i++) {
    pageNumbers.push(i);
  }

  const showPrevEllipsis = pageRange[0] > 1;
  const showNextEllipsis = pageRange[1] < totalPages;

  const handleTabClick = (id, tab) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id ? { ...session, activeTab: tab } : session
      )
    );
  };

  const handleBookNow = (expertId) => {
    navigate(`/expert-details/${expertId}`);
  };

  const PaginationControls = () => (
    <div className="p-5 rounded-lg">
      <div className="flex justify-center">
        <button
          className="mx-2 p-2 rounded-full bg-yellow-800 text-white disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>

        {showPrevEllipsis && (
          <button
            className="mx-2 p-2 rounded border border-gray-300"
            onClick={() => goToPage(pageRange[0] - 1)}
          >
            ...
          </button>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-2 p-2 rounded border ${
              currentPage === number
                ? "bg-yellow-600 text-white border-yellow-600"
                : "border-gray-300"
            }`}
            onClick={() => goToPage(number)}
          >
            {number}
          </button>
        ))}

        {showNextEllipsis && (
          <button
            className="mx-2 p-2 rounded border border-gray-300"
            onClick={() => goToPage(pageRange[1] + 1)}
          >
            ...
          </button>
        )}

        <button
          className="mx-2 p-2 rounded-full bg-yellow-900 text-white disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 mt-6">
        <h2 className="text-2xl text-gray-400 font-bold">Find Your Expert's</h2>
        <div className="relative w-64">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search counselors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-yellow-600 text-white rounded-r-lg hover:bg-yellow-700">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="mt-3 text-gray-600">Loading available experts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 bg-red-100 rounded-lg">
          <div className="text-lg font-medium text-red-700 mb-3">{error}</div>
          <button
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt mr-2"></i>Try Again
          </button>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="text-center mt-8">
          <h4 className="text-xl font-medium">No experts found</h4>
          <p className="text-gray-600">
            Try searching with a different name or term.
          </p>
          <button
            className="mt-3 px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-50"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-500">
              Showing{" "}
              {Math.min(indexOfFirstSession + 1, filteredSessions.length)}-
              {Math.min(indexOfLastSession, filteredSessions.length)} of{" "}
              {filteredSessions.length} expert's
            </div>
          </div>

          {/* {totalPages > 1 && <PaginationControls />} */}

          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSessions.map((session) => (
                <div
                  key={session.id}
                  className="border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex p-4">
                    <div className="p-2">
                      <img
                        src={session.image}
                        alt={`${session.name}'s Profile`}
                        className="border border-gray-700 rounded-full w-24 h-24 object-cover"
                      />
                    </div>
                    <div className="p-2 ml-4">
                      <div>
                        <span className="text-lg font-bold text-yellow-900">
                          {session.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          {session.experience} of experience
                        </span>
                      </div>
                      <div>
                        <strong>Expertise:</strong>{" "}
                        <span className="text-gray-700">
                          {session.expertDetails?.expertise?.join(", ") ||
                            "No expertise listed"}
                        </span>
                      </div>
                      <div>
                        <strong>Speaks:</strong>{" "}
                        <span className="text-gray-700">
                          {session.expertDetails?.languages?.join(", ") ||
                            "No languages listed"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-pink-50">
                    <div className="flex justify-center space-x-4">
                      {/* {session.availableModes.includes("video") && (
                        <button
                          type="button"
                          className={`px-4 py-1 rounded-full ${session.activeTab === "online"
                            ? "bg-green-600 text-white"
                            : "border border-green-600 text-green-600"}`}
                          onClick={() => handleTabClick(session.id, "online")}
                        >
                          <i className="fas fa-video mr-1"></i> Online
                        </button>
                      )} */}
                      {(session.videoSlot || session.callSlot) && (
                        <button
                          onClick={() => handleTabClick(session.id, "online")}
                          className={`px-4 py-1 rounded-full ${
                            session.activeTab === "online"
                              ? "bg-green-600 text-white"
                              : "border border-green-600 text-green-600"
                          }`}
                        >
                          <i className="fas fa-video mr-1"></i> Online
                        </button>
                      )}

                      {session.availableModes.includes("in-person") && (
                        <button
                          type="button"
                          className={`px-4 py-1 rounded-full ${
                            session.activeTab === "inPerson"
                              ? "bg-green-600 text-white"
                              : "border border-green-600 text-green-600"
                          }`}
                          onClick={() => handleTabClick(session.id, "inPerson")}
                        >
                          <i className="fas fa-user mr-1"></i> In-person
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between mt-4 text-sm">
                      {session.activeTab === "online" && (
                        <>
                          <div className="text-center">
                            <p className="mb-1">Available</p>
                            <p className="font-bold text-green-700">
                              <span>Video</span> <span>Online</span>
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="mb-1">Next online slot:</p>
                            <p>
                              {/* {session.onlineSlot ? (
                                <>
                                  <span>{formatDate(session.onlineSlot.availability_date)}</span>
                                  <br />
                                  <span>{formatTime(session.onlineSlot.availability_start_time)}</span>
                                </>
                              ) : "N/A"} */}
                              {session.videoSlot || session.callSlot ? (
                                <>
                                  <span>
                                    {formatDate(
                                      (session.videoSlot || session.callSlot)
                                        .availability_date
                                    )}
                                  </span>
                                  {", "}
                                  <span>
                                    {formatTime(
                                      (session.videoSlot || session.callSlot)
                                        .availability_start_time
                                    )}
                                  </span>
                                </>
                              ) : (
                                "N/A"
                              )}
                            </p>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                              onClick={() => handleBookNow(session.expertId)}
                              disabled={!session.onlineSlot}
                            >
                              Book now
                            </button>
                          </div>
                        </>
                      )}

                      {session.activeTab === "inPerson" && (
                        <>
                          <div className="text-center">
                            <p className="mb-1">Location</p>
                            <p className="font-bold text-green-700">
                              {session.city}, {session.state}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="mb-1">Next in-person slot:</p>
                            <p>
                              {session.inPersonSlot ? (
                                <>
                                  <span>
                                    {formatDate(
                                      session.inPersonSlot.availability_date
                                    )}
                                  </span>
                                  <br />
                                  <span>
                                    {formatTime(
                                      session.inPersonSlot
                                        .availability_start_time
                                    )}
                                  </span>
                                </>
                              ) : (
                                "N/A"
                              )}
                            </p>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                              onClick={() => handleBookNow(session.expertId)}
                              disabled={!session.inPersonSlot}
                            >
                              Book now
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <PaginationControls />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSession;
