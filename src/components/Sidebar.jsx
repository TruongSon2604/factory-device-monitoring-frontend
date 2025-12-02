import React, { useState } from 'react';
import { FiLayout, FiUser, FiShoppingBag, FiBookOpen, FiLogIn, FiAlertTriangle } from 'react-icons/fi';
import { FaRegUserCircle,FaNetworkWired  } from 'react-icons/fa';
import { ASSETS } from '../assets/asset.js';
import { BsFillDeviceSsdFill } from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const menuItems = [
  { id: 1, text: 'Dashboard', path: "/", icon: FiLayout },
  { id: 2, text: 'Caller', path: "/list-caller", icon: BsFillDeviceSsdFill },
  { id: 3, text: 'Access Point',path: "/access-point", icon: FiShoppingBag },
  { id: 4, text: 'Switch',path: "/switch", icon: FaNetworkWired },
  { id: 5, text: 'Logout',path: "/logout", icon: FiLogIn },
  { id: 6, text: 'Not Found',path: "/not-found", icon: FiAlertTriangle },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(1); 

  return (
    <div className="w-60 flex flex-col h-screen bg-white shadow-xl">

      {/* Logo */}
      <div className="p-5 font-bold text-2xl text-blue-600 text-center">
        <img src={ASSETS.mainlogo} alt="" className="w-40" />
      </div>

      {/* User Info */}
      <div className="flex items-center p-3 mx-2 my-2 bg-gray-100 rounded-lg">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          {/* <FaRegUserCircle className="text-xl text-gray-600" /> */}
          <Avatar sx={{ bgcolor: deepOrange[500] }}>ST</Avatar>
        </div>
        <span className="font-semibold text-gray-800 text-sm">Truong Ngoc Son</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow p-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition duration-200
                ${isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.text}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
