const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
var SpotifyWebApi = require("spotify-web-api-node");
const { StatusCodes } = require("http-status-codes");


const client = {
  id: "3a43d5933a8d45e9bb2387ae7c86a4bb",
  secret: "ab77f511f86d48928a13280c01ac6478",
};

app.post("/login", async (req, res) => {
  const code = req.body.reqContent;
  const spotifyApi = new SpotifyWebApi({
    clientId: client.id,
    clientSecret: client.secret,
    redirectUri: "http://localhost:3000/",
  });
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    res
      .status(StatusCodes.OK)
      .json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg: error})
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.body.reqContent;
  const spotifyApi = new SpotifyWebApi({
    clientId: client.id,
    clientSecret: client.secret,
    redirectUri: "http://localhost:3000/",
    refresh_token: refreshToken,
  });

 
});

app.listen(8080);
