// import React, { useState } from 'react';
// import { FiLayout, FiUser, FiShoppingBag, FiBookOpen, FiLogIn, FiAlertTriangle, FiMessageSquare, FiGrid  } from 'react-icons/fi';
// import { FaRegUserCircle,FaNetworkWired  } from 'react-icons/fa';
// import { ASSETS } from '../assets/asset.js';
// import { BsFillDeviceSsdFill } from 'react-icons/bs';
// import { NavLink } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
// import { deepOrange, deepPurple } from '@mui/material/colors';

// const menuItems = [
//   { id: 1, text: 'Dashboard', path: "/", icon: FiLayout },
//   { id: 2, text: 'Caller', path: "/list-caller", icon: BsFillDeviceSsdFill },
//   { id: 3, text: 'Access Point',path: "/access-point", icon: FiShoppingBag },
//   { id: 4, text: 'Switch',path: "/switch", icon: FaNetworkWired },
//   { id: 5, text: 'AI Chat',path: "/ai-chat", icon: FiMessageSquare },
//   { id: 6, text: 'Dashboard',path: "/dashboard", icon: FiGrid },
//   { id: 7, text: 'Logout',path: "/logout", icon: FiLogIn },
// ];

// const Sidebar = () => {
//   const [activeMenu, setActiveMenu] = useState(1); 

//   return (
//     <div className="w-60 flex flex-col h-screen bg-white shadow-xl">

//       {/* Logo */}
//       <div className="p-5 font-bold text-2xl text-blue-600 text-center">
//         <img src={ASSETS.mainlogo} alt="" className="w-40" />
//       </div>

//       {/* User Info */}
//       <div className="flex items-center p-3 mx-2 my-2 bg-gray-100 rounded-lg">
//         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
//           <Avatar sx={{ bgcolor: deepOrange[500] }}>ST</Avatar>
//         </div>
//         <span className="font-semibold text-gray-800 text-sm">Truong Ngoc Son</span>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-grow p-2 mt-4">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeMenu === item.id;

//           return (
//             <NavLink
//               key={item.id}
//               to={item.path}
//               onClick={() => setActiveMenu(item.id)}
//               className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition duration-200
//                 ${isActive
//                   ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600'
//                   : 'text-gray-600 hover:bg-gray-100'}
//               `}
//             >
//               <Icon className="w-5 h-5 mr-3" />
//               <span>{item.text}</span>
//             </NavLink>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { FiLayout, FiUser, FiShoppingBag, FiMessageSquare, FiGrid, FiLogIn, FiChevronLeft, FiMenu } from 'react-icons/fi';
import { FaNetworkWired, FaRobot } from 'react-icons/fa';
import { BsFillDeviceSsdFill } from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { ASSETS } from '../assets/asset.js';

// Giả định ASSETS và menuItems đã được định nghĩa ở trên
const menuItems = [
  { id: 1, text: 'Dashboard', path: "/", icon: FiLayout },
  { id: 2, text: 'Caller', path: "/list-caller", icon: BsFillDeviceSsdFill },
  { id: 3, text: 'Access Point', path: "/access-point", icon: FiShoppingBag },
  { id: 4, text: 'Switch', path: "/switch", icon: FaNetworkWired },
  { id: 5, text: 'AI Chat', path: "/ai-chat", icon: FiMessageSquare },
  { id: 6, text: 'Thống kê', path: "/dashboard", icon: FiGrid },
  { id: 7, text: 'AGV', path: "/AGV", icon: FaRobot },
  { id: 8, text: 'Logout', path: "/logout", icon: FiLogIn },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState(1);

  const sidebarWidth = isOpen ? 'w-60' : 'w-20';
  const logoWidth = isOpen ? 'w-40' : 'w-10';
  const toggleIcon = isOpen ? FiChevronLeft : FiMenu;

  return (
    <div className={`${sidebarWidth} flex flex-col h-screen bg-white shadow-xl transition-all duration-300 relative`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 p-1 bg-blue-600 text-white rounded-full shadow-md z-10 hover:bg-blue-700 transition duration-300"
      >
        {React.createElement(toggleIcon, { className: 'w-4 h-4' })}
      </button>

      <div className={`flex justify-center items-center p-5 ${isOpen ? 'h-20' : 'h-16'}`}>
        <img src={ASSETS?.mainlogo} alt="Logo" className={`${logoWidth} transition-all duration-300`} />
      </div>

      <hr className="border-gray-200 mx-4" />

      {isOpen && (
        <div className="flex items-center p-3 mx-2 my-2 bg-blue-50/50 rounded-lg">
          <div className="flex-shrink-0">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>SN</Avatar>
          </div>
          {/* Chỉ hiển thị tên khi mở */}
          <span className="font-semibold text-gray-800 text-sm ml-3 truncate">Truong Ngoc Son</span>
        </div>
      )}
      {!isOpen && ( // Hiện Avatar nhỏ ở giữa khi thu nhỏ
        <div className="flex items-center justify-center p-3 my-2">
          <Avatar sx={{ bgcolor: deepOrange[500], width: 36, height: 36, fontSize: '0.8rem' }}>SN</Avatar>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-grow p-2 mt-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center my-1 rounded-lg cursor-pointer transition duration-200
                ${isOpen ? 'p-3' : 'p-3 justify-center'}
                ${isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}
              `}
            >
              <Icon className={`${isOpen ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`} />
              {/* Ẩn text khi thu nhỏ, dùng overflow-hidden để đảm bảo text không tràn ra */}
              <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                {item.text}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2 border-t border-gray-100 mt-auto">
        <NavLink
          to="/logout"
          className={`flex items-center my-1 rounded-lg cursor-pointer transition duration-200 text-red-500 hover:bg-red-50
              ${isOpen ? 'p-3' : 'p-3 justify-center'}
            `}
        >
          <FiLogIn className={`${isOpen ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`} />
          <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Đăng xuất
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;