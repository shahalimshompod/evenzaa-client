import React from "react";
import { Link, useLocation } from "react-router";
import { MdDateRange } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const EventCard = ({ data }) => {
  const routeLocation = useLocation();
  const path = routeLocation.pathname;
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
          <Link to={`/event-details/${_id}`}>
            <button className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5">
              Join Event
            </button>
          </Link>

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
