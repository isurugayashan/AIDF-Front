import { useDeleteBookingMutation, useGetBookingByuserIdQuery } from "@/lib/api";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import CreateBookingForm from "@/components/CreateBookingFom";
import { useState } from "react";
import { toast } from "sonner";

const AccountPage = () =>{
    const {isLoaded, isSignedIn, user} = useUser();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleUpdateClick = (booking) => {
      setSelectedBooking(booking);
      setIsUpdateModalOpen(true);
     };
    const handleDeleteClick = (booking) => {
      setSelectedBooking(booking); // Store selected booking
      setShowDeletePopup(true); // Show the confirmation popup
    };

  // Function to close the modal
  const handleCloseModal = () => {
      setIsUpdateModalOpen(false);
      setSelectedBooking(null);
  };

  const [deleteBooking] = useDeleteBookingMutation();

  const handleDeleteBooking = async () => {
    try {
      await toast.promise(
        deleteBooking(selectedBooking._id).unwrap(), // Call mutation with the booking ID directly
        {
          loading: "Deleting booking...",
          success: "Booking deleted successfully!",
          error: "Booking deletion failed",
        }
      );
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
    
  };
  
  const {data: bookings , isLoading , isError,} = useGetBookingByuserIdQuery(user.id);
    if (isLoading) {
      return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>

          {/* Booking List Section */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">My Bookings</h2>
    
            {isLoading && (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-blue-500 text-3xl" />
              </div>
            )}
            {/* {error && } */}
    
          </div>
        </main>
      );
    }

    if (isError) {
      <p className="text-red-500">Error fetching bookings</p>
    }

    return (
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
  
        {/* Personal Information Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4"> 
              <p className="text-muted-foreground">Name: {user?.fullName}</p>
            </div>
            <div className="space-y-4"> 
              <p className="text-muted-foreground">Email: {user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
        </div>
  
        {/* Booking List Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">My Bookings</h2>
  
          {isLoading && (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-blue-500 text-3xl" />
            </div>
          )}
          {/* {error && <p className="text-red-500">Error fetching bookings</p>} */}
  
          
            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((booking, index) => (
                <div key={`${booking._id}-${index}`} className="relative bg-cyan-50 p-4 rounded-lg shadow">
                  {/* Booking details */}
                  <h3 className="text-lg font-semibold">Hotel Name: {booking.hotel.name}</h3>
                  <p className="text-gray-600">Room Number: {booking.roomNumber}</p>
                  <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  
                  {/* Button container */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    
                    <Button onClick={() => handleUpdateClick(booking)} className="bg-blue-500 hover:bg-blue-600 text-white">
                                      Update
                                  </Button>

                    <Button onClick={() => handleDeleteClick(booking)} className="bg-red-500 hover:bg-red-600 text-white" >
                                  Delete
                                </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal for Updating Booking */}
            {isUpdateModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-red-700 text-xl font-bold p-2"
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  &times;
                </button>
                      <CreateBookingForm 
                          existingBooking={selectedBooking} 
                          onBookingComplete={handleCloseModal} 
                      />
                  </div>
              </div>
             )}
             {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-lg font-semibold">Are you sure you want to delete this booking?</h3>
                    <p className="text-gray-600 mt-2">This action cannot be undone.</p>
                    
                    <div className="mt-4 flex justify-end gap-4">
                      <Button onClick={() => setShowDeletePopup(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleDeleteBooking(selectedBooking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </main>
    );
}

export default AccountPage;

