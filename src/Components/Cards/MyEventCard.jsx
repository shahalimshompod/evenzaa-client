import React from "react";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

const MyEventCard = ({
  event,
  handleDeleteEvent,
  setSelectedEventForUpdate,
  deleteLoading,
}) => {
  return (
    <div
      key={event._id}
      className="bg-white shadow-md hover:shadow-2xl hover:ease-in-out duration-500 overflow-hidden border border-gray-200"
    >
      <div className="flex flex-col md:flex-row gap-4 p-5">
        {/* Image */}
        <div className="w-full md:w-40 h-32 flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1 sand">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1 sand">
              <strong>Organizer:</strong> {event.organizer}
            </p>
            <p className="text-sm text-gray-600 mb-1 sand">
              <strong>Date:</strong>{" "}
              {new Date(event.eventDate).toLocaleDateString()} |{" "}
              <strong>Time:</strong> {event.time}
            </p>
            <p className="text-sm text-gray-600 mb-1 sand">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-sm text-gray-700 mt-2 sand line-clamp-3">
              {event.description}
            </p>
          </div>

          {/* Bottom Row: Attendee + Buttons */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-[#FE3E01]">
              <FaUser className="text-[#FE3E01]" />
              <span className="text-sm font-medium text-gray-800 sand">
                {event.attendeeCount}
              </span>
            </div>

            <div className="flex gap-3">
              {/* update button */}
              <button
                className="cursor-pointer sand flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-100 text-green-800 hover:bg-green-200 text-sm transition"
                onClick={() => setSelectedEventForUpdate(event)}
              >
                <div className="flex items-center gap-2">
                  <FaRegEdit size={16} />
                  <span>Update</span>
                </div>
              </button>

              {/* delete button */}
              <button
                className="cursor-pointer sand  px-4 py-1.5 rounded-md bg-red-100 text-red-800 hover:bg-red-200 text-sm transition"
                onClick={() => handleDeleteEvent(event._id)}
              >
                {deleteLoading ? (
                  "Deleting..."
                ) : (
                  <div className="flex items-center gap-2">
                    <IoTrashBin size={16} />
                    <span>Delete</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
