import React, { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import PanToolIcon from "@mui/icons-material/PanTool";
import CropFreeIcon from "@mui/icons-material/CropFree"; // Biểu tượng reset zoom

const BasicModal = ({ device, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  if (!device) return null;

  const zoomSpeed = 0.1;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;

  // Xử lý Zoom
  const handleZoom = useCallback(
    (delta) => {
      const newScale = scale + delta;
      if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
        setScale(newScale);
      }
    },
    [scale]
  );

  const handleWheel = (e) => {
    e.preventDefault(); // Ngăn cuộn trang
    const delta = e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
    handleZoom(delta);
  };

  // Bắt đầu kéo
  const handleMouseDown = (e) => {
    // Chỉ kéo bằng nút chuột trái
    if (e.button !== 0) return;
    setIsDragging(true);
    // Lưu lại vị trí bắt đầu kéo để tính toán offset
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // Kéo khi di chuyển chuột
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    // Cập nhật vị trí ảnh
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  // Ngừng kéo
  const handleMouseUp = () => setIsDragging(false);

  // Thiết lập lại (Reset)
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const statusColor = device.status === "Online" ? "#4caf50" : "#f44336"; // Xanh lá hoặc Đỏ

  return (
    <Dialog open={true} fullWidth maxWidth="xl" onClose={onClose}>
      <DialogTitle
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          <PanToolIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
          Sơ Đồ Thiết Bị & Vị Trí
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Box
          ref={imageContainerRef}
          sx={{
            width: "100%",
            height: "80vh",
            overflow: "hidden",
            position: "relative",
            background: "#f7f7f7",
            borderBottom: "1px solid #ddd",
            cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default",
            userSelect: "none",
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Hình ảnh */}
          <Box
            component="img"
            src={device.image}
            alt="device-large"
            sx={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "top left",
              maxWidth: "none",
              cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default",
              transition: isDragging ? "none" : "transform 0.1s ease-out", // Hiệu ứng chuyển động mượt
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />

          {/* Hộp Thông tin Thiết bị cố định */}
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: 2,
              minWidth: 250,
              zIndex: 10, // Đảm bảo nằm trên ảnh
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={1} color="primary">
              ⚙️ Thông Tin Thiết Bị
            </Typography>
            <Typography variant="body2">
              <b>ID:</b> {device.id}
            </Typography>
            <Typography variant="body2">
              <b>Tên thiết bị:</b> {device.deviceName}
            </Typography>
            <Typography variant="body2">
              <b>Loại thiết bị:</b> {device.deviceType}
            </Typography>
            <Typography variant="body2">
              <b>Địa chỉ IP:</b> {device.ipAddress}
            </Typography>
            <Typography variant="body2">
              <b>Khu vực:</b> {device.factoryArea}
            </Typography>
            <Typography variant="body2">
              <b>Tình trạng:</b>
              <Box component="span" sx={{ color: statusColor, fontWeight: "bold", ml: 0.5 }}>
                {device.status}
              </Box>
            </Typography>
            <Typography variant="body2">
              <b>Hoạt động cuối:</b> {device.lastActive}
            </Typography>
          </Paper>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 2,
              padding: "4px 8px",
            }}
          >
            <Tooltip title="Phóng to" arrow>
              <IconButton
                size="small"
                onClick={() => handleZoom(zoomSpeed)}
                disabled={scale >= MAX_SCALE}
                sx={{ color: "white" }}
              >
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
              {Math.round(scale * 100)}%
            </Typography>
            <Tooltip title="Thu nhỏ" arrow>
              <IconButton
                size="small"
                onClick={() => handleZoom(-zoomSpeed)}
                disabled={scale <= MIN_SCALE}
                sx={{ color: "white" }}
              >
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Thiết lập lại (Reset)" arrow>
              <IconButton size="small" onClick={handleReset} sx={{ color: "white" }}>
                <CropFreeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Hướng dẫn sử dụng */}
        <Box sx={{ padding: 2, textAlign: "center", backgroundColor: "#fafafa" }}>
          <Typography variant="caption" color="textSecondary">
            Tips: Dùng **scroll chuột để zoom**, giữ chuột trái **kéo để di chuyển ảnh**.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BasicModal;