import { useState, useEffect } from "react";
import axios from "axios";
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  /**
   * Triggers an axios request to the login route
   * which responds with an accessToken, expiresIn and
   * the refreshToken which are stored in state. The accessToken is also saved in
   * localStorage to prevent constant login prompts.
   *
   * @param {String} url
   * @param {Object} reqContent
   */
  const getToken = async (url, reqContent) => {
    try {
      const res = await axios.post(url, { reqContent });
      window.history.pushState({}, null, "/");
      localStorage.setItem("token", res.data.accessToken);
      setAccessToken(res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
      setRefreshToken(res.data.refreshToken);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Triggers axios to "/refresh" request to server.js
   * one minute before the accessToken expires which responds with
   * a refreshed token
   * @param {String} url
   * @param {Object} reqContent
   */
  const refresh = async (url, reqContent) => {
    try {
      const res = await axios.post(url, { reqContent });
      setAccessToken(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      getToken("http://localhost:8080/login", code);
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }
    const interval = setInterval(() => {
      refresh("http://localhost:8080/refresh", refreshToken);
    }, (expiresIn - 60) * 100000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
