import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HomePost from "../components/HomePost";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const { search } = useLocation();

  async function fetchPost() {
    try {
      setLoader(true);
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      const sortedPosts = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      if (res.data.length === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [search]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] ">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-centre ">
            <Loader />
          </div>
        ) : !noResult ? (
          posts.map((post) => (
            <>
              <Link
                key={posts._id}
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePost post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16 min-h-[80vh]">
            No posts is available
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
