

import React, { useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
import InfoCard from '../components/InfoCard'; 

import { FaWifi, FaLaptop, FaMapMarkerAlt, FaPowerOff, FaServer, FaCar } from 'react-icons/fa';

const initialAccessPoints = [
  { id: 'AP001', name: "AP-A-North", ipAddress: "192.168.10.1", factoryArea: "Area A", status: "Online", clients: 5, frequency: "5 GHz" },
  { id: 'AP002', name: "AP-B-South", ipAddress: "192.168.10.2", factoryArea: "Area B", status: "Online", clients: 8, frequency: "5 GHz" },
  { id: 'AP003', name: "AP-C-Central", ipAddress: "192.168.10.3", factoryArea: "Central", status: "Offline", clients: 0, frequency: "2.4 GHz" },
  { id: 'AP004', name: "AP-D-Line1", ipAddress: "192.168.10.4", factoryArea: "Line 1", status: "Online", clients: 2, frequency: "5 GHz" },
  { id: 'AP005', name: "AP-E-Line2", ipAddress: "192.168.10.5", factoryArea: "Line 2", status: "Online", clients: 1, frequency: "2.4 GHz" },
  { id: 'AP006', name: "AP-F-Line2", ipAddress: "192.168.10.6", factoryArea: "Line 2", status: "Offline", clients: 0, frequency: "5 GHz" },
  { id: 'AP007', name: "AP-G-Line1", ipAddress: "192.168.10.7", factoryArea: "Line 1", status: "Online", clients: 3, frequency: "5 GHz" },
  { id: 'AP008', name: "AP-H-North", ipAddress: "192.168.10.8", factoryArea: "Area A", status: "Online", clients: 4, frequency: "2.4 GHz" },
  { id: 'AP009', name: "AP-I-Central", ipAddress: "192.168.10.9", factoryArea: "Central", status: "Online", clients: 6, frequency: "5 GHz" },
  { id: 'AP010', name: "AP-J-South", ipAddress: "192.168.10.10", factoryArea: "Area B", status: "Offline", clients: 0, frequency: "5 GHz" },
  { id: 'AP011', name: "AP-K-Line1", ipAddress: "192.168.10.11", factoryArea: "Line 1", status: "Online", clients: 1, frequency: "2.4 GHz" },
];


// --- 2. ĐỊNH NGHĨA CỘT CẬP NHẬT ---
const columns = [
  { field: 'id', headerName: 'ID AP', width: 100 },
  { field: 'name', headerName: 'Tên Access Point', width: 180 },
  { 
    field: 'ipAddress', 
    headerName: 'Địa Chỉ IP', 
 
    flex: 1,
  },
  { field: 'factoryArea', headerName: 'Khu Vực', width: 130 },
  { 
    field: 'status', 
    headerName: 'Tình Trạng', 
    width: 120,
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
  { 
    field: 'clients', 
    headerName: 'Client AGV', 
    type: 'number',
    width: 120,
  },
  { 
    field: 'frequency', 
    headerName: 'Tần Số', 
       width: 150,
    minWidth: 100, 
  },
];

const paginationModel = { page: 0, pageSize: 10 };

// --- ĐỔI TÊN COMPONENT ---
const AccessPoint = () => {
  // Đổi tên biến state thành 'accessPoints'
  const [accessPoints] = useState(initialAccessPoints); 

  const stats = useMemo(() => {
    const total = accessPoints.length;
    const online = accessPoints.filter(ap => ap.status === 'Online').length;
    const offline = total - online;
    const areas = new Set(accessPoints.map(ap => ap.factoryArea)).size;
    const totalClients = accessPoints.reduce((sum, ap) => sum + ap.clients, 0);

    return [
      { value: total, title: 'Tổng AP', bgColor: 'bg-blue-50', icon: FaServer, iconColor: 'text-blue-500' },
      { value: online, title: 'AP Đang Online', bgColor: 'bg-cyan-50', icon: FaWifi, iconColor: 'text-cyan-500' },
      { value: totalClients, title: 'Tổng AGV Đang Kết Nối', bgColor: 'bg-yellow-50', icon: FaCar, iconColor: 'text-yellow-500' },
      { value: areas, title: 'Tổng Khu Vực', bgColor: 'bg-red-50', icon: FaMapMarkerAlt, iconColor: 'text-red-500' },
    ];
  }, [accessPoints]);
  
  return (
    <div className="p-8 bg-gray-50 flex-grow w-full"> 
      {/* 1. Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((data, index) => (
          <InfoCard key={index} {...data} /> 
        ))}
      </div>
      
      {/* 2. Data Grid */}
      <Paper elevation={3} sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={accessPoints} // SỬ DỤNG DỮ LIỆU AP MỚI
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default AccessPoint;