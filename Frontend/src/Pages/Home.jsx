import React from "react";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";

const Home=()=>{
    return(
        <div className="w-full bg-red-400 flex"> 
             <SideBar />
             <Outlet/>
        </div>
    )
}
export default Home;