import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function CreatePost() {
  return (
    <div>
      <Navbar />
      <div className="px-6 md:ps-[200px] mt-8">
        <h1 className="font bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 ">
          <input
            type="text"
            placeholder="Enter your post title"
            className="px-4 py-2 outline-none"
          />
          <input type="file" className="px-4 " />
          <div className="flex flex-col ">
            <div className="flex items-center space-x-4 md:space-x-8"></div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
