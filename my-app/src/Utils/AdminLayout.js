// AdminLayout.js
import React from 'react';

import AdminHeader from '../components/AdminHeader/AdminHeader';
import SideBar from '../components/SideBar/SideBar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header/>
      <SideBar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
