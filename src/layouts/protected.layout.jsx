import { SignedIn, useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";


const ProtectedLayout = () =>{
const {isLoaded, isSignedIn, user} = useUser();
console.log(user);

if(!isSignedIn){
    return <Navigate to="/sign-in"/>
}
return <Outlet/>
}

export default ProtectedLayout;