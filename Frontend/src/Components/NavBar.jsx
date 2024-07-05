import React from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div className='flex justify-between items-center bg-gray-900 p-4 shadow-lg'>
      <div className='text-white text-xl font-bold'>Asset Sphere</div>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <FaUser className='text-white text-xl' />
          <span className='text-white'>Susanta Swain</span>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <FaSignOutAlt className='text-white text-xl' />
          <span className='text-white'>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
