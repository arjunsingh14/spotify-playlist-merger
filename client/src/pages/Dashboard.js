import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import FormRowSelect from "../components/FormRowSelect";
import FormRow from "../components/FormRow";


const Dashboard = ({ code }) => {
  const token = useAuth(code);
  const [search, setSearch] = useState({
    playlistOneId: "",
    playlistTwoId: "",
  });
  const [playlistName, setPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState(false);

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

  const createNewPlaylist = async () => {
    const resTwo = await spotifyApi.getPlaylistTracks(search.playlistTwoId, {
      limit: 50,
    });
    const formattedTracksTwo = resTwo.body.items.map((curr) => {
      return `spotify:track:${curr.track.id}`;
    });
    if (newPlaylist) {
      const resOne = await spotifyApi.getPlaylistTracks(search.playlistOneId, {
        limit: 50,
      });
      const formattedTracksOne = resOne.body.items.map((curr) => {
        return `spotify:track:${curr.track.id}`;
      });
      const mergedPlaylist = formattedTracksOne.concat(formattedTracksTwo);
      const data = await spotifyApi.createPlaylist(
        playlistName || "merged playlist",
        { description: "" }
      );
      await spotifyApi.addTracksToPlaylist(data.body.id, mergedPlaylist);
      
    }
    else {
        await spotifyApi.addTracksToPlaylist(
          search.playlistOneId,
          formattedTracksTwo
        );
    }
    setNewPlaylist(false)
  };

  useEffect(() => {
    if (!token) return;
    //If token is present, gets a user's id and fetches all their playlists
    spotifyApi.getMe().then((res) => {
      const user = res.body.id;
      spotifyApi.getUserPlaylists(user).then((res) => {
        console.log(res.body.items);
        setAllPlaylists(res.body.items);
        setSearch({
          ...search,
          playlistOneId: res.body.items[0].id,
          playlistTwoId: res.body.items[0].id,
        });
      });
    });
    setIsLoading(false);
  }, [token, newPlaylist]);

  const playlistChange = (e) => {
    if (!token) return;
    const name = e.target.name;
    const value = e.target.value;
    const key = allPlaylists.find((item) => item.name === value);
    setSearch({ ...search, [name]: key.id });
  };

  const nameChange = (e) => {
    if (!token) return;
    const value = e.target.value;
    setPlaylistName(value);
  };

  //Generates a new playlist and id, and takes in an array of tracks from each individual playlist
  const handleClick = () => {
    if (!token) {
      console.log("no token");
      return;
    }
    createNewPlaylist();
    setPlaylistName("");
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center pt-5">
        <div
          className="spinner-border primary-success"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-5 p-5">
        <div className="mb-3">
          <FormRowSelect
            name="playlistOneId"
            label="First playlist"
            placeholder="Lofi beats"
            list={allPlaylists}
            handleChange={playlistChange}
          />
        </div>
        <div className="mb-3">
          <FormRowSelect
            label="Second playlist"
            name="playlistTwoId"
            list={allPlaylists}
            handleChange={playlistChange}
          />
        </div>
        {newPlaylist && (
          <div className="mb-3">
            <FormRow
              label="Playlist name"
              name="playlistName"
              type="text"
              handleChange={nameChange}
            />
          </div>
        )}
        <div className="container-sm form-check d-flex justify-content-center mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            checked = {newPlaylist}
            onChange={() => setNewPlaylist(!newPlaylist)}
          />
          <label className="form-check-label px-2" htmlFor="flexCheckDefault">
            Create new playlist
          </label>
        </div>
        <div className="text-center">
          <button className="btn btn-custom btn-lg" onClick={handleClick}>
            Merge playlists
          </button>
        </div>
      </div>
    );
  }
};

export default Dashboard;
