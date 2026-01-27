import axiosClient from "./axiosClient";

const AGVApi = {
  getAllAGV: () => {
    return axiosClient.get("/ping-all-agv");
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

export default AGVApi;
