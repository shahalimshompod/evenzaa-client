import React from "react";
import { Link, useLocation } from "react-router";
import { MdDateRange } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

const EventCard = ({ data }) => {
  const routeLocation = useLocation();
  const path = routeLocation.pathname;
  const {
    _id,
    title,
    time,
    location,
    organizer,
    availableSeats,
    eventDate,
    image,
    featured,
  } = data;
  return (
    <div className="bg-base-100 w-full shadow-lg">
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
        <p className="flex items-center gap-2 sand">
          <MdDateRange size={20} />
          <span>
            {eventDate} | {time}
          </span>
        </p>
        <p className="flex items-center gap-2 sand">
          <FaLocationArrow size={18} />
          <span>{location}</span>
        </p>
        {path !== "/" && (
          <p className="sand">
            <strong>Seats Available: </strong> <span>{availableSeats}</span>
          </p>
        )}
        <p className="sand">
          <strong>Organizer: </strong>
          {organizer}
        </p>

        <div className="border-b border-b-gray-300"></div>

        <Link to={`/event-details/${_id}`}>
          <button className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
