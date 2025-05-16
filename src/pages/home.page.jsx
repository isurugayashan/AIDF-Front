import Hero from "@/components/hero";
import HotelListings from "@/components/HotelListings";
 

function HomePage(){
    return(

    <>
        <div className="relative min-h-screen">
        <Hero/>
        {/* <img src="/assets/hero/hero_1.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover -z-10  "/> */}
        <div className=" bg-cover bg-center animate-zoomIn absolute top-0 left-0 w-full h-full object-cover -z-10" 
        style={{animationDuration: '30s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDirection: 'alternate', 
        backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}></div>
        </div>
        <HotelListings/> 
    </>
    )
}export default HomePage