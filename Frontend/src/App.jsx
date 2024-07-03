import React from "react"
import { createBrowserRouter,Router,RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";

function App(){
  const appRouter=createBrowserRouter([{
    path:"/",
    element:<Home/>,
    children:[
      {
        path:"/",
        element:<Dashboard/>
      }
    ]

  }]);
return(
  <RouterProvider router={appRouter}/>
)}
export default App