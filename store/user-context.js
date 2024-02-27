import { createContext, useEffect, useState } from "react";
import { UserStore } from "../utils/user";

export const UserContext = createContext({
  user: null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //TODO: set user from store
  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserStore.getToken();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
