import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdDateRange } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { StateManagementContext } from "../../Contexts/StateContext";
import toast from "react-hot-toast";

const EventCard = ({ data }) => {
  const routeLocation = useLocation();
  const navigate = useNavigate();

  // getting the user instance
  const { isLoggedIn: user } = useAuth();

  // getting state for  calling login modal
  const { setIsLoginModalOpen } = useContext(StateManagementContext);

  // getting the pathname
  const path = routeLocation.pathname;

  // destructuring data
  const {
    _id,
    title,
    time,
    location,
    organizer,
    attendeeCount,
    eventDate,
    image,
    featured,
    description,
  } = data;

  // handle navigate to details page
  const handleNavigate = async () => {
    try {
      if (!user) {
        setIsLoginModalOpen(true);
      } else {
        navigate(`/event-details/${_id}`);
      }
    } catch (error) {
      toast.error(`Error navigating to details Page: ${error}`);
    }
  };

  return (
    <div className="bg-base-100 w-full shadow-lg hover:shadow-2xl hover:ease-in-out duration-500">
      <figure className="h-52 overflow-hidden">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="p-4 flex flex-col gap-2 ">
        <h2 className="card-title marcel flex items-center justify-between">
          <span>{title}</span>
          <div>
            {path !== "/" && (
              <div>
                {featured === "true" ? (
                  <div className="badge badge-secondary">
                    {featured === "true" ? "Featured" : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </h2>

        {/* description */}
        <p className="sand line-clamp-2 text-[14px]">{description}</p>

        {/* Event date */}
        <p className="flex items-center gap-2 sand">
          <MdDateRange size={20} />
          <span>
            {eventDate} | {time}
          </span>
        </p>

        {/* event location */}
        <p className="flex items-center gap-2 sand">
          <FaLocationArrow size={18} />
          <span>{location}</span>
        </p>

        {/* organizer */}
        <p className="sand flex items-center gap-2">
          <FaUserTie size={18} />
          <span>{organizer}</span>
        </p>

        <div className="border-b border-b-gray-300"></div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleNavigate}
            className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5"
          >
            Join Event
          </button>

          {/* attendee count */}
          <div className="flex items-center gap-2 border border-[#FE3E01] p-2">
            <FaUser />
            <p className="sand">{attendeeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
