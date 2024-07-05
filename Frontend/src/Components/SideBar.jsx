import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaTachometerAlt, FaCogs, FaTools, FaHistory, FaChartLine, FaTags, FaTrademark, FaTruck, FaMapMarkerAlt, FaUsers, FaBuilding, FaChartBar, FaCog } from 'react-icons/fa';
import '../App.css';

const menuItems = [
  { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
  { name: 'Assets', icon: <FaCogs />, path: '/assets' },
  { name: 'Components', icon: <FaTools />, path: '/components' },
  { name: 'Maintenances', icon: <FaHistory />, path: '/maintenances' },
  { name: 'Depreciations', icon: <FaChartLine />, path: '/depreciations' },
  { name: 'Asset Types', icon: <FaTags />, path: '/asset-types' },
  { name: 'Brands', icon: <FaTrademark />, path: '/brands' },
  { name: 'Suppliers', icon: <FaTruck />, path: '/suppliers' },
  { name: 'Locations', icon: <FaMapMarkerAlt />, path: '/locations' },
  { name: 'Employees', icon: <FaUsers />, path: '/employees' },
  { name: 'Departments', icon: <FaBuilding />, path: '/departments' },
  { name: 'Reports', icon: <FaChartBar />, path: '/reports' },
  { name: 'Settings', icon: <FaCog />, path: '/settings' },
];

const SideBar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  return (
    <div className='sidebar md:w-64 w-full md:fixed md:top-0 md:left-0'>
      <div className="w-full md:w-64 bg-gray-900 text-gray-200 flex flex-col h-screen shadow-lg">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Link to="/"><img src={logo} alt="Logo" className="h-12 w-auto" /></Link>
        </div>
        <nav className="sidebar flex flex-col justify-center pt-40 flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center py-3 px-4 rounded-lg transition duration-300 ${selected === item.path ? 'bg-blue-500 text-white' : 'hover:bg-blue-700 hover:text-white'}`}
              onClick={() => setSelected(item.path)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="ml-4 md:block hidden">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
