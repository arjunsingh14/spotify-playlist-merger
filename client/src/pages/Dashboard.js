import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import FormRowSelect from "../components/FormRowSelect"
const Dashboard = ({ code }) => {
  const token = useAuth(code);
  const [search, setSearch] = useState({playlistOne: "", playlistTwo: "",})
  const [allPlaylists, setAllPlaylists] = useState()
  const [tracks, setTracks] = useState({
    tracklistOne: { tracks: [], id: "" },
    tracklistTwo: { tracks: [], id: "" },
  });
  
  const spotifyApi = new SpotifyWebApi( {
      clientId: process.env.CLIENT_ID
  })

  const getUser = async () => {
      const res = await spotifyApi.getMe();
      const userId = res.body.id
      getAllPlaylists(userId);
  }
  const getAllPlaylists =  async (user) => {
      const res = await spotifyApi.getUserPlaylists(user)
      const playlists = res.body.items;
      setAllPlaylists(playlists)
      console.log(allPlaylists)
  }

  useEffect(()=> {
    spotifyApi.setAccessToken(token)
    
  }, [token])

  useEffect(()=> {
    if (!token) return
    console.log(token);
    getUser();
    
    
      
  }, [token])
  const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setSearch({...search, [name]: value})
  }
  return (
    <div className="container">
      <div className="mb-3">
        {/* <label htmlFor="playlistOne" className="form-label">
          Playlist 1
        </label>
        <input
          type="text"
          value={search.playlistOne}
          name="playlistOne"
          className="form-control"
          id="playlistOne"
          placeholder="Lofi beats"
          onChange={handleChange}
        /> */}
        {/* <FormRowSelect
          value={search.playlistOne}
          name="playlistOne"
          placeholder="Lofi beats"
          list={list}
          handleChange={handleChange}/> */}
      </div>
      <div className="mb-3">
        {/* <label htmlFor="playlist2" className="form-label">
          Playlist 2
        </label>
        <input
          type="text"
          value={search.playlistTwo}
          className="form-control"
          name="playlistTwo"
          id="playlistTwo"
          placeholder="trap bangers"
          onChange={handleChange} */}
        </div>
  
    </div>
  );
};

export default Dashboard;
