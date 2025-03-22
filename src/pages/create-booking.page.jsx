import CreateBookingForm from "@/components/CreateBookingFom";
import { Button } from "@/components/ui/button";
import { useCreateHotelMutation } from "@/lib/api";
import { useLocation } from "react-router";
import { toast } from "sonner";


export default function CreateBookingPage(props){
    const location = useLocation();
    const hotel = location.state?.hotel; // Access passed data
   
    

    // return (
    //    <main className="container mx-auto px-4 py-8 min-h-screen">
    //          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create a Booking</h2>
    //           <CreateBookingForm hotel={hotel} />
    //    </main>
    // )

}