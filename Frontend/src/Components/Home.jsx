import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Home=()=>{
    return(
        <div className="w-full flex justify-center items-center"> 
        
           <div className="w-[23%] bg-green-500"><SideBar/></div>
           <div className="w-full ">  <Outlet/></div>
        </div>
    )
}
export default Home;