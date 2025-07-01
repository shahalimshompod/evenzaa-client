import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useUser from "../Hooks/userUser";

// IMAGE HOSTING KEY
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  //   axios instance
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  //   logged in user data
  const { userData: user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const description = watch("description", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const imageData = { image: data.eventImage[0] };

      // hosting image to image bb
      const res = await axiosPublic.post(image_hosting_api, imageData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const image = res?.data.data.display_url;

      if (image) {
        const finalData = {
          title: data.title,
          category: data.category,
          eventDate: data.eventDate,
          time: data.time,
          location: data.location,
          description: data.description,
          organizer: user.name,
          organizerEmail: user.email,
          featured: data.featured,
          image: image,
        };

        console.log(finalData);

        const response = await axiosSecure.post("/add-event", finalData);
        if (response?.data.insertedId) {
          toast.success("Event Added Successfully!");
        }
      }
    } catch (err) {
      setError("Failed to add event. Please try again.");
      console.error("Error adding event:", err);
      toast.error(`Something went wrong!: ${err}`);
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-36 px-3 lg:px-0">
      <h1 className="marcel text-3xl font-bold mb-6 text-center">
        Add New Event
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Title */}
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
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Event Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Event Date</label>
            <input
              type="date"
              {...register("eventDate", { required: "Event date is required" })}
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
              <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Location and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className={`w-full px-4 py-2 border ${
                errors.location ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter location"
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
            <span className="text-gray-500">
              ({description.length}/200 Maximum)
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 100,
                message: "Description must be at least 100 characters",
              },
              maxLength: {
                value: 200,
                message: "Description must be under 200 characters",
              },
            })}
            maxLength={200}
            rows={5}
            className={`w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-[#FE3E01]"
            } rounded focus:outline-none focus:ring-1 focus:ring-[#dfb5a9]`}
            placeholder="Enter event description (minimum 100 characters)"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Upload Event Image */}
        <div>
          <label className="sand block mb-1">
            Event Image (Upload Image carefully, you can't change image once it
            uploaded)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("eventImage", {
              required: "Event image is required",
            })}
            className={`w-full file-input  ${
              errors.eventImage ? "border-red-500" : "border-[#FE3E01]"
            } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
          />
          {errors.eventImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventImage.message}
            </p>
          )}
        </div>

        {/* Featured Radio Buttons */}
        <div>
          <label className="sand block mb-1">Featured Event</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("featured", {
                  required: "Please select an option",
                })}
                className="mr-2 text-[#FE3E01] focus:ring-[#FE3E01]"
              />
              <span className="sand">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register("featured")}
                className="mr-2 text-[#FE3E01] focus:ring-[#FE3E01]"
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

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#FE3E01] text-white py-2 cursor-pointer px-4 rounded hover:bg-opacity-90 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding Event..." : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
