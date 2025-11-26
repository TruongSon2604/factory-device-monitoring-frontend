import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const DeviceCard = ({ device }) => {
  const { name, ip, status, icon: TypeIcon } = device;
  const isOnline = status === 'Online';
  const statusColor = isOnline ? '#27AE60' : '#E74C3C'; 
  const statusBg = isOnline ? '#E8F6F3' : '#FADBD8';

  return (
    <Card sx={{ 
        minWidth: 275, 
        boxShadow: 3, 
        transition: '0.3s', 
        borderLeft: `5px solid ${statusColor}`,
        '&:hover': { boxShadow: 6 } 
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div" fontWeight="bold">
            {name}
          </Typography>
          {TypeIcon && <TypeIcon color="action" sx={{ fontSize: 30 }} />}
        </Box>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          **IP:** {ip}
        </Typography>
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ 
            backgroundColor: statusBg, 
            borderRadius: 1, 
            p: 1, 
            mt: 2 
          }}
        >
          {isOnline ? 
            <CheckCircleIcon sx={{ color: statusColor, mr: 1 }} /> : 
            <CancelIcon sx={{ color: statusColor, mr: 1 }} />
          }
          <Typography variant="body1" sx={{ color: statusColor, fontWeight: 'bold' }}>
            {status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;