const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
var SpotifyWebApi = require("spotify-web-api-node");

app.post("/login", (req, res) => {
  const code = req.body.reqContent;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3000/",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) =>
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    )
    .catch((err) => res.json({ err }));
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.reqContent;
  console.log(refreshToken);
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3000/",
    refresh_token: refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
    });
});

app.listen(3001);
