import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import FormRowSelect from "../components/FormRowSelect";
const Dashboard = ({ code }) => {
  const token = useAuth(code);
  const [search, setSearch] = useState({playlistOneId: "", playlistTwoId: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [allPlaylists, setAllPlaylists] = useState([]);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
  });
  spotifyApi.setAccessToken(token);

  //   const getUser = async () => {
  //       const res = await spotifyApi.getMe();
  //       const user = res.body.id
  //       getAllPlaylists(user);
  //   }
  //   const getAllPlaylists =  async (user) => {
  //       const res = await spotifyApi.getUserPlaylists(user)
  //       const playlists = res.body.items;
  //       setAllPlaylists([...allPlaylists, playlists])
  //       console.log(allPlaylists)

  //   }

  const getTracks = async () => {
    const resOne = await spotifyApi.getPlaylistTracks(search.playlistOneId);
    const resTwo = await spotifyApi.getPlaylistTracks(search.playlistTwoId);
    const formattedTracksOne = resOne.body.items.map((curr) => {
        return `spotify:track:${curr.track.id}`
    })
    const formattedTracksTwo = resTwo.body.items.map((curr) => {
        return `spotify:track:${curr.track.id}`
    })
    formattedTracksOne.concat(formattedTracksTwo)
    const data = await spotifyApi.createPlaylist('merged', {description: ""})
    await spotifyApi.addTracksToPlaylist(data.body.id, formattedTracksOne);
  }

  

  useEffect(() => {
    if (!token) return;
    //If token is present, gets a user's id and fetches all their playlists
    spotifyApi.getMe().then((res) => {
      const user = res.body.id;
      spotifyApi.getUserPlaylists(user).then((res) => {
        console.log(res.body.items)
        setAllPlaylists(res.body.items);
        setSearch({...search, playlistOneId: res.body.items[0].id, playlistTwoId: res.body.items[0].id})
      });
    });
    setIsLoading(false)
  }, [token]);

  const change = (e) => {
    if (!token) return;
    const name = e.target.name;
    const value = e.target.value;
    const key = allPlaylists.find((item)=>item.name===value)
    setSearch({ ...search, [name+"Id"]: key.id });
  };


  
  //Generates a new playlist and id, and takes in an array of tracks from each individual playlist
  const handleClick = () => {
    console.log(search)
    if (!token) {
      console.log("no token");
      return;
    }
    getTracks()
   
  };

  if (isLoading) {
    return (
      <div class="d-flex justify-content-center pt-5">
        <div
          class="spinner-border"
          style={{width: "10rem", height: "10rem"}}
          role="status"
        >
          <span class="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-5 p-5">
        <div className="mb-5">
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
          <FormRowSelect
            name="playlistOne"
            label="First playlist"
            placeholder="Lofi beats"
            list={allPlaylists}
            handleChange={change}
          />
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
          <FormRowSelect
            label="Second playlist"
            name="playlistTwo"
            list={allPlaylists}
            handleChange={change}
          />
        </div>
        <button className= "btn btn-success"onClick={handleClick}>Merge playlists</button>
      </div>
    );
  }
};

export default Dashboard;
