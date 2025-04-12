import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useCreateBookingMutation, useUpdateBookingMutation , useGetBookingByuserIdQuery} from "@/lib/api";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";


// Schema validation
const formSchema = z.object({
  name: z.string(),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  roomNumber: z.coerce.number().min(1, "Room number is required"), // Use coerce to convert strings to numbers
});

const CreateBookingForm = ({ onBookingComplete, hotel, existingBooking }) => {
 
  const {isLoaded, isSignedIn, user} = useUser();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation(); // New hook for updates

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingBooking?.hotel.name || hotel?.name || "",
      checkIn: existingBooking ? new Date(existingBooking.checkIn) : null,
      checkOut: existingBooking ? new Date(existingBooking.checkOut) : null,
      roomNumber: existingBooking?.roomNumber || "",
    },
  });

  const {data: bookings , isLoading , isError, refetch} = useGetBookingByuserIdQuery(user.id);

  const handleSubmit = async (values) => {
    const { checkIn, checkOut, roomNumber } = values;
    const hotelId = hotel?._id || existingBooking?.hotel.id;
  
    try {
      if (existingBooking) {
        // Update booking
        await toast.promise(
          updateBooking({
            id: existingBooking?._id, 
            booking: {
              hotelId: existingBooking?.hotel.id,
              userId: user.id,
              roomNumber,
              checkIn,
              checkOut,
            }
          }).unwrap(),
          {
            loading: "Updating booking...",
            success: "Booking updated successfully!",
            error: "Booking update failed",
          }
        );
        refetch();
      } else {
        // Create new booking
        await toast.promise(
          createBooking({
            hotelId,
            roomNumber,
            checkIn,
            checkOut,
          }).unwrap(),
          {
            loading: "Creating booking...",
            success: "Booking created successfully!",
            error: "Booking creation failed",
          }
        );
      }
      
      onBookingComplete(); // Close modal or refresh data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {existingBooking ? "Update Booking" : "Hotel Booking"}
        </h1>
        <p className="text-muted-foreground">
          {existingBooking ? "Modify your booking details" : "Enter your booking details below"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="101"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-in Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full pl-3 text-left font-normal">
                        {field.value ? format(field.value, "PPP") : <span>Select check-in date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-out Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full pl-3 text-left font-normal">
                        {field.value ? format(field.value, "PPP") : <span>Select check-out date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const checkIn = form.getValues("checkIn");
                        return checkIn ? date <= checkIn : date <= new Date();
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {existingBooking ? "Update Booking" : "Book Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBookingForm;
