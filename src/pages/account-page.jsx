import { useDeleteBookingMutation, useGetBookingByuserIdQuery } from "@/lib/api";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import CreateBookingForm from "@/components/CreateBookingFom";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge"
import AccountPageSkeleton from "./account-page-skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Clock, Home, MapPin, Trash2, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BookingDialog } from "@/components/BookingDialog";


const AccountPage = () =>{
    const {isLoaded, isSignedIn, user} = useUser();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const {data: bookings , isLoading , isError, refetch} = useGetBookingByuserIdQuery(user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleUpdateClick = (booking) => {
    //   setSelectedBooking(booking);
    //  };

    const handleDeleteClick = (booking) => {
      setSelectedBooking(booking); // Store selected booking
      setShowDeletePopup(true); // Show the confirmation popup
    };

     // Function to close the modal
    // const handleCloseModal = () => {
    //     setIsUpdateModalOpen(false);
    //     setSelectedBooking(null);
    // };

    // Calculate days between check-in and check-out
    const calculateDays = (checkIn, checkOut) => {
      const start = new Date(checkIn)
      const end = new Date(checkOut)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
  
    // Format date to a more readable format
    const formatDate = (dateString) => {
      const options = { weekday: "short", month: "short", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    }


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
      refetch();
      setShowDeletePopup(false);
     
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
    
  };
  

    if (isLoading) {
      return <AccountPageSkeleton />
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
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">My Bookings</h2>
          <Badge variant="outline" className="px-3 py-1">
            {bookings?.length || 0} {(bookings?.length || 0) === 1 ? "Booking" : "Bookings"}
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : !bookings || bookings.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
              <Calendar className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium">No bookings yet</h3>
            <p className="text-muted-foreground mt-2">When you book a stay, it will appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking, index) => (
              <Card key={`${booking._id}-${index}`} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-0">
                  <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <Home className="w-12 h-12 opacity-20" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white truncate">{booking.hotel.name}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        <span>Room {booking.roomNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">CHECK-IN</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-primary" />
                        <p className="font-medium">{formatDate(booking.checkIn)}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">CHECK-OUT</p>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-primary" />
                        <p className="font-medium">{formatDate(booking.checkOut)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {calculateDays(booking.checkIn, booking.checkOut)}{" "}
                        {calculateDays(booking.checkIn, booking.checkOut) === 1 ? "night" : "nights"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Confirmed</Badge>
                      <Badge variant={booking.paymentStatus === "Paid" ? "success" : "destructive"}>
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 bg-muted/20 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                   onClick={() => navigate(`/booking/payment?bookingId=${booking._id}`)}
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" />
                    Pay now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(booking)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeletePopup} onOpenChange={setShowDeletePopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your reservation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => selectedBooking && handleDeleteBooking(selectedBooking._id)}
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
    );
}

export default AccountPage;

