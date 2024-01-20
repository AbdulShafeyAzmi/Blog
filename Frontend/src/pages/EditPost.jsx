import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";

const EditPost = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

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
            type="text"
            placeholder="Enter your post title"
            className="px-4 py-2 outline-none"
          />
          <input type="file" className="px-4 " />
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
          />
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 text-lg md:text-xl">
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
