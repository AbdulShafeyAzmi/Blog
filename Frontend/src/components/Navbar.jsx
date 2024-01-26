import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  function showMenu() {
    setMenu(!menu);
  }
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
      <div className="hidden md:flex items-centre justify-center space-x-2 md:space-x-4">
        {user ? (
          <div>
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          </div>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <p onClick={showMenu} className="cursor-pointer relative">
            {menu && <Menu />}
            <FaBars />
          </p>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
