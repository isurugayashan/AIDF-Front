import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useCreateBookingMutation } from "@/lib/api";
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

// Schema validation
const formSchema = z.object({
  name: z.string().min(2, "Hotel name is required"),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  roomNumber: z.number().min(1, "Room number is required"),
});

const CreateBookingForm = ({ hotel }) => {
    // console.log(hotel);
    
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: hotel?.name || "",
      checkIn: null,
      checkOut: null,
      roomNumber: "",
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    
    const { checkIn, checkOut, roomNumber} = values;
    const hotelId = hotel._id; // Ensure id is properly assigned

    try {
      toast.loading("Creating booking...");
      await createBooking({
        hotelId,
        roomNumber,
        checkOut,
        checkIn,              
       }).unwrap();
      toast.success("Booking created successfully");
    } catch (error) {
      toast.error("Booking creation failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-1/2">
        <div className="grid gap-4">
          {/* Hotel Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check-in Date */}
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-In Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="ml-5">
                        {field.value ? field.value.toDateString() : "Select date"}
                        <CalendarIcon className="ml-5 h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setCheckInDate(date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check-out Date */}
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-Out Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline"  className="ml-5">
                        {field.value ? field.value.toDateString() : "Select date"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setCheckOutDate(date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Room Number */}
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Room Number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
            <Button type="submit">Create Booking</Button>
            </div>
      </form>
    </Form>
  );
};

export default CreateBookingForm;
