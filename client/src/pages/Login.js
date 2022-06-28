import React from "react";
import spotify from "../assets/spotify.svg"
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirectUri = "http://localhost:3000/";
const auth_url =`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email%20user-read-private%20playlist-read-private`
const Login = () => {
  return (
    <div className="container-fluid">
        <div className="p-5 pb-1">
            <div>
                <img className="img img-fluid" src={spotify} alt="spotify logo" />
                <p className="text-light fw-bolder font-main fs-1 text-center">Playlist merger</p>
            </div>
        </div>
        <div className="text-center">
          <a className="btn btn-success btn-lg" href={auth_url}>
            Login
          </a>
        </div>
      </div>
  );
};

export default Login;
