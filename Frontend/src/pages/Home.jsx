import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);

  const { search } = useLocation();

  // console.log(search);

  async function fetchPost() {
    try {
      setLoader(true);
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
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
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] "></div>
      {loader ? (
        <div className="h-[40vh] flex justify-center items-centre ">
          <Loader />
        </div>
      ) : !noResult ? (
        posts.map((post) => <HomePost key={post._id} post={post} />)
      ) : (
        <h3 className="text-center font-bold mt-16 min-h-[80vh]">
          No posts is available
        </h3>
      )}
      <Footer />
    </>
  );
};

export default Home;
