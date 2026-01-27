import axiosClient from "./axiosClient";

const DashboardApi = {
  getAllCaller: () => {
    return axiosClient.get("/ping-all-db"); 
  },

//   getDeviceById: (id) => {
//     return axiosClient.get(`/devices/${id}`);
//   },

//   createDevice: (data) => {
//     return axiosClient.post("/devices", data);
//   },

//   updateDevice: (id, data) => {
//     return axiosClient.put(`/devices/${id}`, data);
//   },

//   deleteDevice: (id) => {
//     return axiosClient.delete(`/devices/${id}`);
//   }
};

export default DashboardApi;
