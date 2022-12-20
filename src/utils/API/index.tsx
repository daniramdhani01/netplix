import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const ImgAPI = process.env.REACT_APP_IMG_URL;

export const ApiGet = (url: string = "", params: any = {}, fetchOnMounted = true) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const res = await API.get(url, { params });
      setData(res?.data);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        text: err?.response?.data?.status_message || "something wrong",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if(fetchOnMounted){
      getData();
    }
  }, []);

  return {
    data,
    isLoading: isLoading,
    fetch : ()=>getData()
  };
};
