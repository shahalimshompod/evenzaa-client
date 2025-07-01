import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RxCross1 } from "react-icons/rx";

const UpdateEventModal = ({
  setSelectedEventForUpdate,
  selectedEventForUpdate,
  refetch,
}) => {
  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   axios instance
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ defaultValues: selectedEventForUpdate });

  const description = watch("description", "");

  useEffect(() => {
    reset(selectedEventForUpdate);
  }, [selectedEventForUpdate, reset]);

  //   handle update onsubmit
  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await axiosSecure.put(
        `/update-event/${selectedEventForUpdate._id}`,
        data
      );
      if (response?.data.modifiedCount > 0) {
        toast.success("Event updated successfully!");
        setSelectedEventForUpdate(null);
      }
    } catch (error) {
      toast.error("Failed to update event.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      refetch();
    }
  };

  if (!selectedEventForUpdate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold marcel text-[#FE3E01]">
            Update Event
          </h2>

          {/* Close Button */}
          <button
            onClick={() => setSelectedEventForUpdate(null)}
            className="btn btn-circle border-none shadow-none bg-transparent text-gray-600 hover:text-red-500 hover:rotate-90 transition-transform duration-300 z-50 cursor-pointer"
          >
            <RxCross1 size={35} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="sand block mb-1">Event Title</label>
            <input
              {...register("title", { required: "Event title is required" })}
              className={`w-full px-4 py-2 border ${
                errors.title ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="sand block mb-1">Event Date</label>
              <input
                type="date"
                {...register("eventDate", {
                  required: "Event date is required",
                })}
                className={`w-full px-4 py-2 border ${
                  errors.eventDate ? "border-red-500" : "border-[#FE3E01]"
                } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              />
              {errors.eventDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="sand block mb-1">Time</label>
              <input
                type="time"
                {...register("time", { required: "Time is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.time ? "border-red-500" : "border-[#FE3E01]"
                } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* Location & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="sand block mb-1">Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.location ? "border-red-500" : "border-[#FE3E01]"
                } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="sand block mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.category ? "border-red-500" : "border-[#FE3E01]"
                } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              >
                <option value="">Select a category</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="tech">Tech</option>
                <option value="business">Business</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="sand block mb-1">
              Description{" "}
              <span className="text-gray-500">({description.length}/200)</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: { value: 100, message: "Minimum 100 characters" },
                maxLength: { value: 200, message: "Maximum 200 characters" },
              })}
              maxLength={200}
              rows={5}
              className={`w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Featured */}
          <div>
            <label className="sand block mb-1">Featured Event</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="true"
                  {...register("featured", { required: "Select an option" })}
                  className="mr-2"
                />
                <span className="sand">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="false"
                  {...register("featured")}
                  className="mr-2"
                />
                <span className="sand">No</span>
              </label>
            </div>
            {errors.featured && (
              <p className="text-red-500 text-sm mt-1">
                {errors.featured.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#FE3E01] text-white py-2 rounded hover:bg-opacity-90 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateEventModal;
