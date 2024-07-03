import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='md:w-[30%] w-full md:fixed md:top-0 md:left-0'>
      <div className="w-full md:w-64 bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex flex-col h-screen">
        <div className="flex items-center justify-center h-20 border-b border-indigo-400">
          <img src="https://placehold.co/100x100" alt="Logo" className="h-12 w-12" />
          <span className="ml-2 text-xl font-bold">LOGO</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link to="/" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Dashboard</Link>
          <Link to="/assets" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Assets</Link>
          <Link to="/components" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Components</Link>
          <Link to="/maintenances" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Maintenances</Link>
          <Link to="/operations" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Operations</Link>
          <Link to="/asset-types" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Asset Types</Link>
          <Link to="/brands" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Brands</Link>
          <Link to="/suppliers" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Suppliers</Link>
          <Link to="/locations" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Locations</Link>
          <Link to="/employees" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Employees</Link>
          <Link to="/departments" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Departments</Link>
          <Link to="/reports" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Reports</Link>
          <Link to="/settings" className="block py-2 px-4 rounded transition duration-300 hover:bg-indigo-600 text-white">Settings</Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
