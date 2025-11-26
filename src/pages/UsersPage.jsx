import React, { useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
// Giả định InfoCard component của bạn đã sẵn sàng
import InfoCard from '../components/InfoCard'; 
import { FaAndroid, FaApple, FaShoppingCart, FaBug, FaWifi, FaLaptop, FaMapMarkerAlt, FaPowerOff } from 'react-icons/fa';

// --- 1. DỮ LIỆU MỚI: CALLER/THIẾT BỊ ---
const initialCallers = [
  { id: 101, deviceName: "Caller-A01", ipAddress: "192.168.1.10", factoryArea: "Area X", status: "Online", lastActive: "2025-11-26 10:00:00" },
  { id: 102, deviceName: "Caller-B05", ipAddress: "192.168.1.15", factoryArea: "Area Y", status: "Offline", lastActive: "2025-11-25 15:30:00" },
  { id: 103, deviceName: "Server-C", ipAddress: "10.0.0.1", factoryArea: "Central", status: "Online", lastActive: "2025-11-26 10:05:00" },
  { id: 104, deviceName: "Device-D10", ipAddress: "192.168.1.22", factoryArea: "Area X", status: "Offline", lastActive: "2025-11-26 08:00:00" },
  { id: 105, deviceName: "Device-E11", ipAddress: "192.168.1.23", factoryArea: "Area Z", status: "Online", lastActive: "2025-11-26 09:15:00" },
];

// --- 2. ĐỊNH NGHĨA CỘT MỚI ---
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'deviceName', headerName: 'Tên Thiết Bị', width: 150 },
  { 
    field: 'ipAddress', 
    headerName: 'Địa Chỉ IP', 
    flex: 1, 
    minWidth: 180 
  },
  { field: 'factoryArea', headerName: 'Khu Vực Nhà Máy', width: 150 },
  { 
    field: 'status', 
    headerName: 'Tình Trạng', 
    width: 120,
    // Thêm render cell để hiển thị màu/icon theo trạng thái
    renderCell: (params) => (
        <span 
            style={{ 
                color: params.value === 'Online' ? 'green' : 'red', 
                fontWeight: 'bold' 
            }}
        >
            {params.value}
        </span>
    )
  },
  { field: 'lastActive', headerName: 'Lần Cuối Hoạt Động', width: 220 },
];

const paginationModel = { page: 0, pageSize: 5 };


const UsersPage = () => {
  const [callers] = useState(initialCallers);

  // Sử dụng useMemo để tính toán các chỉ số dựa trên dữ liệu Caller
  const stats = useMemo(() => {
    const total = callers.length;
    const online = callers.filter(c => c.status === 'Online').length;
    const offline = total - online;
    const areas = new Set(callers.map(c => c.factoryArea)).size;

    return [
      { value: total, title: 'Tổng Thiết Bị', bgColor: 'bg-blue-50', icon: FaLaptop, iconColor: 'text-blue-500' },
      { value: online, title: 'Đang Hoạt Động (Online)', bgColor: 'bg-cyan-50', icon: FaWifi, iconColor: 'text-cyan-500' },
      { value: offline, title: 'Ngoại Tuyến (Offline)', bgColor: 'bg-red-50', icon: FaPowerOff, iconColor: 'text-red-500' },
      { value: areas, title: 'Tổng Khu Vực', bgColor: 'bg-yellow-50', icon: FaMapMarkerAlt, iconColor: 'text-yellow-500' },
    ];
  }, [callers]);
  
  return (
    <div className="p-8 bg-gray-50 flex-grow w-full"> 
      {/* 1. Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((data, index) => (
          // Thay thế cardData bằng stats mới
          // Bạn phải đảm bảo component InfoCard chấp nhận các props này
          <InfoCard key={index} {...data} /> 
        ))}
      </div>
      
      {/* 2. Data Grid */}
      <Paper elevation={3} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          // SỬ DỤNG DỮ LIỆU CALLER MỚI
          rows={callers} 
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default UsersPage;