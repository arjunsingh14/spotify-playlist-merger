import { useState, useEffect } from "react";
import axios from "axios";
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const getToken = async (url, reqContent) => {
    try {
      const res = await axios.post(url, { reqContent });
      console.log(res)
      window.history.pushState({}, null, "/");
      setAccessToken(res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
      setRefreshToken(res.data.refreshToken);
    } catch (error) {
      console.log(error)
    }
  };

  const refresh = async (url, reqContent) => {
    try {
      const res = await axios.post(url, { reqContent });
      window.history.pushState({}, null, "/");
      setAccessToken(res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken("http://localhost:3001/login", code);
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return
    }
    const interval = setInterval(() => {
      refresh("http://localhost:3001/refresh", refreshToken);

    }, ((expiresIn - 60) * 100000))
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]);

  return accessToken;
}
