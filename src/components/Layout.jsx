import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">  
        {/* Outlet sẽ render nội dung của các Route con (DashboardPage, UsersPage,...) */}
        <main className="flex-grow bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;