import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
    const { user } = useUser();

    return (
        <nav className="z-10 bg-gray-900 flex flex-wrap items-center justify-between px-4 sm:px-8 text-white py-4">
            <div className="flex items-center space-x-4 sm:space-x-8 w-full sm:w-auto justify-between sm:justify-start">
                <Link to={'/'} className="text-2xl font-bold">CheckinEase</Link>
                <div className="hidden md:flex space-x-4">
                    <Link to={'/'} className="transition-colors">Home</Link>
                    {user?.publicMetadata?.role === "admin" && (
                        <Link to={'/hotels/create'} className="transition-colors">Create Hotel</Link>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0">
                <Button variant="ghost" className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    EN
                </Button>

                <SignedOut>
                    <Button variant="ghost" asChild>
                        <Link to="/sign-in" className="transition-colors">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/sign-up" className="transition-colors">Sign Up</Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                    <Button asChild>
                        <Link to="/account" className="transition-colors">My Account</Link>
                    </Button>
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navigation;
