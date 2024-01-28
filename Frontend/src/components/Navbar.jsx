import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const navigate = useNavigate();
  // console.log(prompt);
  function showMenu() {
    setMenu(!menu);
  }
  const { user } = useContext(UserContext);
  // console.log(user);
  return (
    <div className="flex items-centre justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg qmd:text-xl font-extrabold ">
        <Link to="/">Blog</Link>
      </h1>
      <div className="flex justify-center items-centre space-x-0">
        <p
          onClick={() => navigate(prompt ? `?search=${prompt}` : navigate("/"))}
          className="my-2 cursor-pointer"
        >
          <BsSearch />
        </p>
        <input
          onChange={(e) => setPrompt(e.target.value)}
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
          <div onClick={showMenu} className="cursor-pointer relative">
            {menu && <Menu />}
            <FaBars />
          </div>
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
