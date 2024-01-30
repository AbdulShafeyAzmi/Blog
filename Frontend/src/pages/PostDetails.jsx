import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const postId = useParams().id;
  async function fetchPost() {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  }

  useEffect(
    function () {
      fetchPost();
    },
    [postId]
  );

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[40vh] flex justify-center items-centre ">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer">
                  <BiEdit />
                </p>
                <p className="cursor-pointer">
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              {post.updatedAt && (
                <p className="text-sm text-gray-400">
                  {post.updatedAt.slice(0, 10)} - {post.updatedAt.slice(11, 16)}
                </p>
              )}
            </div>
          </div>
          <img src={IF + post.photo} className="w-full  mx-auto mt-8" alt="" />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((category, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            <Comment />
            <Comment />
            <Comment />
          </div>
          {/* Write Comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
