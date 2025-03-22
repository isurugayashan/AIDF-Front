import { Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useState } from "react";



export default function Hero(){
  
        const handlSearch = (e)=>{
            e.preventDeFault();
        }
        const [isHovered, setIsHovered] = useState(false); 

        return (
            <div>
                {/* Hero Section */}
                <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 pt-32 pb-32">
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                        Find Your Best Destination
                    </h1>
                    <p className="text-xl mb-12 text-center max-w-2xl">
                        Describe your dream destination and experience, and we'll find the perfect place for you.
                    </p>
    
                    {/* Search Form */}
                    <form
                        onSubmit={handlSearch}
                        className="relative w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center transition-all duration-500 ease-in-out"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Gradient Outline Effect */}
                        <div
                            className={`absolute inset-0 rounded-full border-2 transition-all duration-500
                                ${isHovered ? 'animate-siri-glow border-white/30' : 'border-gray-700  border-none'}`}
                        />
    
                        <Button 
                            type="submit" 
                            className="relative z-10 rounded-full w-48 flex items-center gap-x-2 lg:h-12"
                        >
                            <Sparkles
                                style={{ width: "20px", height: "20px" }}
                                className="mr-2 animate-pulse text-sky-400"
                            />
                            <span className="lg:text-lg">AI Search</span>
                        </Button>
    
                        <input
                            type="text"
                            placeholder="Describe your destination, experience, or hotel"
                            className="relative flex-grow bg-transparent lg:text-lg text-white text-center placeholder:text-white/50 border-none outline-none focus:border-none focus:outline-none z-10"
                        />
                    </form>
                </div>
            </div>
        );
};


