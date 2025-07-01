import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { StateManagementContext } from "../Contexts/StateContext";
import useSecureData from "../Hooks/useSecureData";
import useUser from "../Hooks/userUser";
import { IoTrashBin } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

const MyEvents = () => {
  // getting user instance
  const { isLoggedIn: user } = useAuth();

  //getting user data
  const { userData } = useUser();

  // getting login form state
  const { setIsLoginModalOpen } = useContext(StateManagementContext);

  //   getting the fetching instance to fetch data
  const {
    data: myEvents,
    loading,
    refetch,
  } = useSecureData(`/my-event-data?email=${userData?.email}`);

  console.log(myEvents);

  //   delete events
  //   const handleDeleteBooking = async (id) => {
  //     try {
  //       const res = await axiosPublic.delete(`/cancel-booking/${id}`);
  //       if (res?.data?.deletedCount > 0) {
  //         toast.success("Booking cancelled successfully");
  //         setBookings((prev) => prev.filter((b) => b._id !== id));
  //       }
  //     } catch (error) {
  //       console.error("Error cancelling booking:", error);
  //       toast.error("Something went wrong");
  //     }
  //   };

  //   if user is not logged in then return
  if (!user) {
    setIsLoginModalOpen(true);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-32 xl:py-36">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 marcel">My Events</h1>
          <p className="mt-2 text-lg text-gray-600 sand">All your events</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <span className="loading loading-spinner text-error"></span>
          </div>
        ) : myEvents?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 sand">
              No bookings found
            </h2>
            <Link to="/events">
              <button className="sand cursor-pointer rounded-none border border-[#FE3E01] mt-4 px-4 py-2 bg-transparent hover:text-white text-black hover:bg-[#FE3E01] transition duration-300 font-semibold">
                Browse Events
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-h-[700px] overflow-y-scroll">
            {myEvents?.map((event) => (
              <div key={event._id} className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 sand">
                      {event.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-gray-600 sand">
                      <span>{new Date(event.eventDate).toLocaleString()}</span>
                      <div className="flex items-center gap-2 border border-[#FE3E01] p-2">
                        <FaUser />
                        <p className="sand">{event.attendeeCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <button
                      //   onClick={() => handleDeleteBooking(booking._id)}
                      className="sand border-none rounded-full btn bg-green-100 text-black text-sm hover:bg-green-200 transition btn-circle"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      //   onClick={() => handleDeleteBooking(booking._id)}
                      className="sand border-none rounded-full btn bg-red-100 text-red-800 text-sm hover:bg-red-200 transition btn-circle"
                    >
                      <IoTrashBin size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="w-full mt-4 p-2 border rounded-md"
        rows="4"
        placeholder="Write your review..."
        {...register("reviewText", {
          required: "Review text is required",
        })}
      />
      {errors.reviewText && (
        <p className="text-red-500 text-sm">{errors.reviewText.message}</p>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-md sand"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 sand cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MyEvents;
