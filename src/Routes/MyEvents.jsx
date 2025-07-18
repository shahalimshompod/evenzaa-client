import React, { useContext, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { StateManagementContext } from "../Contexts/StateContext";
import useSecureData from "../Hooks/useSecureData";
import useUser from "../Hooks/userUser";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import MyEventCard from "../Components/Cards/MyEventCard";
import UpdateEventModal from "../Components/Modals/UpdateEventModal";

const MyEvents = () => {
  // states
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedEventForUpdate, setSelectedEventForUpdate] = useState(null);

  // getting user instance
  const { isLoggedIn: user } = useAuth();

  // getting axios instance
  const axiosSecure = useAxiosSecure();

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

  //   handle delete events
  const handleDeleteEvent = async (id) => {
    try {
      // fire the alert to confirm delete
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteLoading(true);
          const res = await axiosSecure.delete(`/delete-event/${id}`);
          if (res?.data?.deletedCount > 0) {
            toast.success("Booking cancelled successfully");
            refetch();
            setDeleteLoading(false);
          }
        }
      });
    } catch (error) {
      setDeleteLoading(false);
      toast.error(`Something went wrong: ${error}`);
    }
  };

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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE3E01]"></div>
          </div>
        ) : myEvents?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 sand">
              No Events found
            </h2>
            <Link to="/events">
              <button className="sand cursor-pointer rounded-none border border-[#FE3E01] mt-4 px-4 py-2 bg-transparent hover:text-white text-black hover:bg-[#FE3E01] transition duration-300 font-semibold">
                Browse Events
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myEvents?.map((event, idx) => (
              <MyEventCard
                key={idx}
                event={event}
                handleDeleteEvent={handleDeleteEvent}
                setSelectedEventForUpdate={setSelectedEventForUpdate}
                updateLoading={updateLoading}
                deleteLoading={deleteLoading}
              />
            ))}
          </div>
        )}
      </div>

      {/* update modal component here */}
      <UpdateEventModal
        setSelectedEventForUpdate={setSelectedEventForUpdate}
        selectedEventForUpdate={selectedEventForUpdate}
        refetch={refetch}
        setUpdateLoading={setUpdateLoading}
      />
    </div>
  );
};
export default MyEvents;
