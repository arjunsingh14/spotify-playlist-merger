import React from "react";
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const auth_url =`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectUri}scope=user-read-email%20user-read-private%20playlist-read-private`
const Login = () => {
  return (
    <div>
      <a
        className="btn btn-success btn-lg"
        href={auth_url}
      >
        Login
      </a>
    </div>
  );
};

export default Login;
