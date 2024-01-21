import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Comment = () => {
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg  my-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-600">@Abdulshafey</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500">18/01/2024</p>
          <p className="text-gray-500">02:05</p>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              <BiEdit />
            </p>
            <p className="cursor-pointer">
              <MdDelete />
            </p>
          </div>
        </div>
      </div>
      <p className="px-2 mt-2">Bete</p>
    </div>
  );
};

export default Comment;
