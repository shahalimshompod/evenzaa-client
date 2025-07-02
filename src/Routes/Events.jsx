import React, { useEffect, useState } from "react";
import EventCard from "../Components/Cards/EventCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const Events = () => {
  const axiosSecure = useAxiosSecure();

  // react hook form initializing
  const { register, reset, watch } = useForm();

  // watch input changes
  const watchedDate = watch("date");
  const watchedRange = watch("range");

  // local states
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all initially
  const fetchEvents = async (query = "") => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/all-events${query}`);
      setEventData(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  // trigger when date or range changes
  useEffect(() => {
    let query = "";

    if (watchedDate) {
      query = `?date=${watchedDate}`;
    } else if (watchedRange) {
      query = `?range=${watchedRange}`;
    }

    fetchEvents(query);
  }, [watchedDate, watchedRange]);

  // clear filters
  const handleClear = () => {
    reset({ date: "", range: "" });
    fetchEvents(); // fetch all events again
  };

  return (
    <div className="my-24 ">
      <div className="relative events-bg-image py-44 ">
        <div className="absolute top-0 left-0 w-full h-full bg-black/85 flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FE3E01]/30 via-[#FE3E01]/20 to-[#FE3E01]/30 flex flex-col items-center justify-center text-center">
            <div
              data-aos="fade-down"
              className="border-l-4 border-l-[#FE3E01] text-black/2 mb-6"
            >
              .
            </div>
            <h1 data-aos="fade-up" className="text-8xl marcel text-white">
              Events
            </h1>

            {/* filter form */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {/* Single Date */}
              <input
                type="date"
                {...register("date")}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-white sand bg-black"
                style={{
                  colorScheme: "dark",
                }}
              />

              {/* Predefined Range Dropdown */}
              <select
                {...register("range")}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-white sand bg-black"
              >
                <option value="">Select a date range</option>
                <option value="currentWeek">Current Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="currentMonth">Current Month</option>
                <option value="lastMonth">Last Month</option>
              </select>

              {/* Clear */}
              <button
                onClick={handleClear}
                className="sand cursor-pointer rounded-none border border-white px-4 py-2 bg-transparent hover:text-black text-white hover:bg-white transition duration-300 font-semibold"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 xl:py-20 px-3 xl:px-0">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE3E01]"></div>
          </div>
        ) : eventData?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 sand">
              No Events found
            </h2>
            <Link to="/">
              <button className="sand cursor-pointer rounded-none border border-[#FE3E01] mt-4 px-4 py-2 bg-transparent hover:text-white text-black hover:bg-[#FE3E01] transition duration-300 font-semibold">
                Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 container mx-auto gap-4">
            {eventData?.map((data, idx) => (
              <EventCard data={data} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
