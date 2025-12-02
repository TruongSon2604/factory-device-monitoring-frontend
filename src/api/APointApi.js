import axiosClient from "./axiosClient";

const APointApi = {
  getAllCaller: () => {
    return axiosClient.get("/ping-all-ap"); 
  },

};

export default APointApi;
