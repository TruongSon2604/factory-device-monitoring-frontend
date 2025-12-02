import axiosClient from "./axiosClient";

const CallerApi = {
  getAllCaller: () => {
    return axiosClient.get("/ping-all"); 
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

export default CallerApi;
