import React from "react";
import spotify from "../assets/spotify.svg";
const client_id = "3a43d5933a8d45e9bb2387ae7c86a4bb";
const redirectUri = "http://localhost:3000/";
const auth_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email%20user-read-private%20playlist-read-private%20playlist-modify-public%20playlist-modify-private`;
const Login = () => {
  return (
    <div className="container-fluid">
      <div className="p-5 pb-1">
        <div className="text-center">
          <img className="img img-fluid mb-4"  src={spotify} alt="spotify logo" />
          <p className="text-light fw-bolder font-main fs-1 text-center">
            Merge your playlists
          </p>
        </div>
      </div>
      <div className="text-center">
        <a className="btn btn-custom btn-lg" href={auth_url}>
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
