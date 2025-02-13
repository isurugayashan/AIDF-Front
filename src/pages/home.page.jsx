import Hero from "@/components/hero";
import HotelListings from "@/components/HotelListings";
 

function HomePage(){
    return(

    <>
        <div className="relative min-h-screen">
        <Hero/>
        <img src="/assets/hero/hero_1.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover -z-10  "/>
        </div>
        <HotelListings/> 
    </>
    )
}export default HomePage