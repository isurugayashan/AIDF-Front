
import { Toggle } from "@radix-ui/react-toggle";
import HotelCard from "./HotelCard";
import LocationTab from "./locationTab";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { getHotels } from "@/lib/api/hotels";



export default function HotelListings(){

    const [hotels, setHotels] = useState([]);
    const locations = ["All", "France", "Italy", "Australia", "Japan"]

    const [selectedLocation , setSelectedLocation] = useState("All")

    const handleSelectLocation = (location)=>{
        setSelectedLocation(location);    
        }
    
    
     const filteredHotels =  selectedLocation ==="All"? hotels: hotels.filter((hotel)=>{
        return hotel.location.toLocaleLowerCase().includes(selectedLocation.toLocaleLowerCase())  
     })

     useEffect(() => {
       
                getHotels().then((data) =>{
                  setHotels(data)
        
                })
                .catch((error) =>{
                    console.log(error);
                    
                });      
     //dependancy array
     }, []);
    
    return(
        <section className="px-8 py-8 lg:py-16">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trendin hotels worldwide</h2>
                <p>
                    Discover the most trendin hotels worldwide for an unforgettable experiance
                </p>
            </div>

            <div className="flex items-center gap-x-4">
                    {
                        locations.map((location, i)=>{
                            return(<LocationTab  key={i} selectedLocation={selectedLocation} name={location} onClick={handleSelectLocation}/>)
                        })
                    }
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  mt-4">
                {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel = {hotel}/>
                ))}

            </div>
        </section>
    );
};

