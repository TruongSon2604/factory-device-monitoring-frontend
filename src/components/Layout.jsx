// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';

// const Layout = () => {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-grow flex flex-col">  
//         {/* Outlet sẽ render nội dung của các Route con (DashboardPage, UsersPage,...) */}
//         <main className="flex-grow bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Nội dung chính */}
      <div
        className="flex-grow flex flex-col transition-all duration-300"
       style={{
      width: isOpen ? "calc(100% - 240px)" : "calc(100% - 80px)",
      transition: "all 0.3s ease"
    }}
      >
        <main className="flex-grow bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
