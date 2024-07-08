import axios from "axios";

export const axiosInstance=axios.create({
    baseURL: "http://ec2-15-165-138-56.ap-northeast-2.compute.amazonaws.com",
});