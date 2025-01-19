import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
  });

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {signOutUser} = useAuth();

  // request interceptors
    instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  // response interceptors
  instance.interceptors.response.use(function(response) {
    return response;
  }, function(error) {
    const status = error.response.status;
    if(status === 401 || status === 403){
     signOutUser();
      navigate('/login');
    }


    return Promise.reject(error);
  })



    return instance
};

export default useAxiosSecure;