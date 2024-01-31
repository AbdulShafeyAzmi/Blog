/* eslint-disable react/prop-types */
// import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);
  async function handleDeleteComment(id) {
    try {
      await axios.delete(`${URL}/api/comments/${id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log("Error in handleDeleteComment", error);
    }
  }
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg  my-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-sm text-gray-400">
            {c.updatedAt.slice(0, 10)} - {c.updatedAt.slice(11, 16)}
          </p>
          {user?._id === c.userId ? (
            <div className="flex items-center justify-center space-x-2">
              {/* <p className="cursor-pointer">
              <BiEdit />
            </p> */}

              <p
                onClick={() => handleDeleteComment(c._id)}
                className="cursor-pointer"
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-2 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
