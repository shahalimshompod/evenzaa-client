import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import useUser from "../../Hooks/userUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const JoinEventModal = ({ setSelectedEvent, selectedEvent, fetchData }) => {
  //   getting user id
  const { userData } = useUser();

  //   loading state
  const [loading, setLoading] = useState(false);

  //   axios instance
  const axiosSecure = useAxiosSecure();

  if (!selectedEvent) return null;
  console.log(selectedEvent._id);
  const { title, organizer, eventDate, time } = selectedEvent;

  //   handle join event
  const handleJoinEvent = async () => {
    try {
      setLoading(true);
      const id = userData?._id;
      // sending a post req
      const res = await axiosSecure.post(`/join-event/${selectedEvent._id}`, {
        id: id,
      });

      console.log(res?.data);
      if (res?.data.alreadyJoined) {
        // fetch data again to update ui data
        fetchData();
        setLoading(false);
        toast.error(`${res?.data.message}`);
      } else {
        // if success is true then go ahead
        if (res?.data.success) {
          // fetch data again to update ui data
          fetchData();
          setLoading(false);
          toast.success(`${res?.data.message}`);
          setSelectedEvent(null);
        }
      }
    } catch (error) {
      setLoading(false);
      setSelectedEvent(null);
      toast.error(`Error Joining Event: ${error}`);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedEvent(null)}
          className="btn btn-circle border-none shadow-none bg-transparent absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:rotate-90 transition-transform duration-300 z-50 cursor-pointer"
        >
          <RxCross1 size={35} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#FE3E01]">
            Join Event
          </h2>

          <p className="text-gray-700 mb-2">
            <strong>Title:</strong> {title}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Organizer:</strong> {organizer}
          </p>
          <p className="text-gray-700 mb-6">
            <strong>Date:</strong> {eventDate} | {time}
          </p>

          <p className="text-black font-medium mb-6">
            Are you sure you want to join this event?
          </p>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleJoinEvent}
              className="px-6 py-2 rounded bg-[#FE3E01] hover:bg-[#e63700] text-white font-semibold transition"
            >
              {loading ? "Joining..." : "Join Now"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinEventModal;
