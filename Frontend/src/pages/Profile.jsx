import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [updated, setUpdated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function fetchProfile() {
    try {
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (error) {
      console.log("Error in fetch profile", error);
    }
  }
  useEffect(
    function () {
      fetchProfile();
    },
    [param]
  );
  async function fetchUserPost() {
    const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
    setPosts(res.data);
  }
  useEffect(
    function () {
      fetchUserPost();
    },
    [param]
  );

  async function handleUserUpdate() {
    setUpdated(false);
    try {
      await axios.put(
        `${URL}/api/users/${user._id}`,
        {
          username,
          email,
        },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (error) {
      setUpdated(false);
      console.log("Error in handleUserUpdate ", error);
    }
  }
  async function handleUserDelete() {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Error in handleUserDelete ", error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" px-6 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse">
        <div className="flex flex-col md:w-[70%]">
          <h1 className="text-xl font-bold mt-16 md:mt-0 ">Your posts:</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="flex flex-col space-y-4 md:w-[30%] md:mb-16 md:items-end">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl mb-6">Your Profile</h1>

            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email "
              type="email"
            />
            {/* <input
              onChange={(e) => setPassword(e.target.value)}
              value=""
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                user updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
