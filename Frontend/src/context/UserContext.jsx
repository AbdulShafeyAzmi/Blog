import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});
// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/refetch`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
