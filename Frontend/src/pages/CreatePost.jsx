import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { URL } from "../url";
// import verifyToken from "../../../backend/verifyToken";

export default function CreatePost() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);

  function addCategory() {
    let trimmedCategory = category.trim();
    if (trimmedCategory === "") return;
    let updatedCategory = [...categories, trimmedCategory];
    //updatedCategory.push(category);
    setCategory("");
    setCategories(updatedCategory);
  }
  function deleteCategory(i) {
    let updatedCategory = [...categories];
    updatedCategory.splice(i);
    setCategories(updatedCategory);
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: categories,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      // console.log(newPost)
      try {
        //Image upload
        const imgUpload = await axios.post(URL + "/api/upload", data);
        //console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }
    // const headers = {
    //   Authorization: `Bearer ${verifyToken}`,
    // };
    try {
      const res = await axios.post(URL + "/api/posts/create", newPost, {
        withCredentials: true,
      });

      //console.log(res.data);
      //  setUpdated(true)
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:ps-[200px] mt-8">
        <h1 className="font bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter your post title"
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 "
          />
          <div className="flex flex-col ">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter post category"
                className="px-4 py-2 outline-none"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            <div className="flex px-4 mt-3">
              {categories?.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{cat}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="bg-black text-white cursor-pointer rounded-full p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}

              {/* Categories */}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={handleCreatePost}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
