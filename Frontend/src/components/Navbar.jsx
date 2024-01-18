import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const user = false;
  return (
    <div className="flex items-centre justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg qmd:text-xl font-extrabold ">
        <Link to="/">Blog</Link>
      </h1>
      <div className="flex justify-center items-centre space-x-0">
        <p className="my-2">
          <BsSearch />
        </p>
        <input
          className="outline-none px-3 py-1"
          placeholder="Search a post"
          type="text"
        ></input>
      </div>
      <div className="flex items-centre justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <h3>Profile</h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
