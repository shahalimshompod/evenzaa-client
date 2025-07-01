import React, { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import useSecureData from "../Hooks/useSecureData";
import { BsCalendar2DateFill } from "react-icons/bs";
import useAuth from "../Hooks/useAuth";
import { StateManagementContext } from "../Contexts/StateContext";
import JoinEventModal from "../Components/Modals/JoinEventModal";

const EventDetails = () => {
  const { id } = useParams();
  //   const { user, setIsLoginModalOpen } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //   getting the logged in user
  const { isLoggedIn: user } = useAuth();

  //   getting login modal state
  const { setIsLoginModalOpen } = useContext(StateManagementContext);

  console.log(user);

  //   fetch data by secure hook
  const {
    data: detailsData,
    loading,
    error,
    refetch,
  } = useSecureData(`/details-event/${id}`);

  //   if there is any error or lack of data then show this
  if (error || !detailsData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  const {
    description,
    eventDate,
    image,
    location,
    organizer,
    attendeeCount,
    time,
    title,
  } = detailsData;

  //   handle join event
  const handleJoinEvent = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setSelectedEvent(detailsData);
    }
  };

  return (
    <div className="mt-24 mb-0 md:mb-24">
      <div className="relative events-bg-image py-44">
        <div className="absolute top-0 left-0 w-full h-full bg-black/85  flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FE3E01]/30 via-[#FE3E01]/20 to-[#FE3E01]/30 flex flex-col items-center justify-center text-center">
            <div
              data-aos="fade-down"
              className="border-l-4 border-l-[#FE3E01] text-black/2 mb-6"
            >
              .
            </div>
            <h1 data-aos="fade-up" className="text-8xl marcel text-white">
              {/* {category.charAt(0).toUpperCase() + category.slice(1)} */}
              Event Details
            </h1>
          </div>
        </div>
      </div>
      {loading || !image ? (
        <div className="flex justify-center items-center h-[20vh]">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : (
        <div
          className="relative container mx-auto md:mt-12 py-20 lg:py-28 px-3 lg:px-12"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            {/* text content */}
            <div className="relative z-10 flex flex-col items-start gap-6 w-full">
              <h1 className="marcel text-white text-6xl">{title}</h1>
              <p className="text-white sand">
                <strong>Organized By: </strong>
                {organizer}
              </p>
              <p className="text-white sand w-11/12">{description}</p>
              <p className="text-white sand flex items-center gap-2">
                <FaLocationArrow />
                <span>{location}</span>
              </p>
            </div>

            {/* card content */}
            <div className="relative z-30 bg-white px-5 py-10 w-full lg:w-1/2 mt-6  lg:mt-0 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-black marcel text-3xl">Date & Time</h1>

                {/* attendee count */}
                <div className="flex items-center gap-2 border border-[#FE3E01] py-2 px-4">
                  <FaUser />
                  <p className="sand">{attendeeCount}</p>
                </div>
              </div>

              {/* time and date */}
              <div className="flex items-center gap-2">
                <BsCalendar2DateFill />
                <p className="text-black sand">
                  {eventDate} | {time}
                </p>
              </div>

              {/* join event button */}
              <button
                onClick={handleJoinEvent}
                className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5"
              >
                Join To The Event
              </button>
            </div>
          </div>
        </div>
      )}

      <JoinEventModal
        selectedEvent={selectedEvent}
        fetchData={refetch}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};

export default EventDetails;
