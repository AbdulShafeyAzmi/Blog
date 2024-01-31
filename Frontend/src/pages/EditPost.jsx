import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const postId = useParams().id;

  async function fetchPost() {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCategories(res.data.categories);
    } catch (error) {
      console.log("Error in fetchPost inside a Edit.jsx", error);
    }
  }

  const handleUpdate = async (e) => {
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
        await axios.post(URL + "/api/upload", data);
        //console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(URL + "/api/posts/" + postId, newPost, {
        withCredentials: true,
      });

      //console.log(res.data);
      //  setUpdated(true)
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

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
  return (
    <div>
      <Navbar />
      <div className="px-6 md:ps-[200px] mt-8">
        <h1 className="font bold md:text-2xl text-xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter your post title"
            className="px-4 py-2 outline-none"
          />
          <input
            type="file"
            className="px-4 "
            onChange={(e) => setFile(e.target.files[0])}
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
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
