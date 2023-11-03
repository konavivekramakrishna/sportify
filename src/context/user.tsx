import { createContext, useEffect, useState } from "react";
import { me } from "../utils/apiCallUtils";
import { User } from "../types";

type prop = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<prop>({
  user: null,
  setUser: () => void 0,
});

export { UserContext, UserProvider };

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await me();
        setUser(res);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user) {
      fetchData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
