
import { Toggle } from "@radix-ui/react-toggle";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {  useGetHotelsForSearchQueryQuery } from "@/lib/api";



export default function HotelListings(){

    const searchValue = useSelector((state) => state.search.value);


    const {data, isLoading, isError, error} = useGetHotelsForSearchQueryQuery({
        query: searchValue,
    });

    const locations = ["All", "France", "Italy", "Australia", "Japan"]
  

    const [selectedLocation , setSelectedLocation] = useState("All")

    const handleSelectLocation = (location)=>{
        setSelectedLocation(location);    
        }

    
    if (isLoading) {
        return(<section className="px-8 py-8 lg:py-16">
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
               <p>Loading ...</p>
            </div>
        </section>)
     }

     if (isError) {
        return(<section className="px-8 py-8 lg:py-16">
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
               <p className="text-red-500"> Error Fetching ....</p>
    
            </div>
        </section>)
     }


  
     const hotels = data.map((hotel) => hotel.hotel);
    
     const filteredHotels =  selectedLocation ==="All"? hotels: hotels.filter((hotel)=>{
        return hotel.location.toLocaleLowerCase().includes(selectedLocation.toLocaleLowerCase())  
     })

    return(
        <section className="px-8 py-8 lg:py-16">
            <div className="mb-12">
                {/* <p>Hello, {userSlice.user.name}</p>
                <Button onClick={() =>{
                        dispatch(setUser({name:"Gayashan"}))
                }}>
                    Click me
                </Button> */}
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

// const [hotels, setHotels] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // const [error, setError] = useState("");


    // const dispatch = useDispatch();
    // const userSlice = useSelector((state)=> state.user);


  //  useEffect(() => {
       
    //             getHotels().then((data) =>{
    //               setHotels(data)
        
    //             })
    //             .catch((error) =>{
    //                 console.log(error.message);
                    
    //                 setIsError(true)
    //                 setError(error.message);
                    
    //             })
    //             .finally(() =>{
    //                 setIsLoading(false)
    //             })     
    //  //dependancy array
    //  }, []);
