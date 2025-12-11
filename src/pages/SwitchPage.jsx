import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import InfoCard from '../components/InfoCard';
import { FaWifi, FaLaptop, FaMapMarkerAlt, FaPowerOff } from 'react-icons/fa';
import SwitchApi from "../api/SwitchApi";
import BasicModal from "../components/Modal";


const SwitchPage = () => {
  const [callers, setCallers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'deviceName', headerName: 'Tên Thiết Bị', width: 350 },
    { field: 'deviceType', headerName: 'Loại Thiết Bị', width: 350 },
    { field: 'image', headerName: 'Hình Ảnh', width: 150,
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt="device" 
          style={{ width:60, height:60, objectFit:"cover", borderRadius:8 }}
          onClick={() => {
            // setSelectedImage(params.value); 
            setSelectedDevice(params.row)
          }} 
        />
      )
    },
    { field: 'ipAddress', headerName: 'Địa Chỉ IP', flex: 1, minWidth: 180 },
    { field: 'factoryArea', headerName: 'Khu Vực Nhà Máy', width: 150 },
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
    { field: 'lastActive', headerName: 'Lần Cuối Hoạt Động', width: 220 },
  ];

  const paginationModel = { page: 0, pageSize: 10 };


  const loadDevices = async () => {
    try {
      setLoading(true);
      const res = await SwitchApi.getAllCaller();
      console.log("abc", res.data);

      const apiDevices = res.data.data.devices;

      const formatted = apiDevices.map((d) => ({
        id: d.device_id,
        deviceName: d.device_name,
        ipAddress: d.ip,
         deviceType: d.device_type,
        factoryArea: d.area,
        status: d.status === "online" ? "Online" : "Offline",
        lastActive: d.ping_time,
        image: "http://localhost:8000/storage/" + d.image
      }));

      setCallers(formatted);
    } catch (error) {
      console.error("Error loading devices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

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
        {selectedDevice && (
      <BasicModal 
        device={selectedDevice} 
        onClose={() => setSelectedDevice(null)}
      />
    )}
      {/* 1. Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((data, index) => (
          <InfoCard key={index} {...data} />
        ))}
      </div>

      {/* 2. Data Grid */}
      <Paper elevation={3} sx={{ height: 600, width: '100%', position: "relative" }}>
        {loading ? (
          <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <CircularProgress size={50} />
            <Typography sx={{ mt: 2, fontSize: 16, color: "gray" }}>
              Đang tải dữ liệu...
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={callers}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </div>
  );
};

export default SwitchPage;
