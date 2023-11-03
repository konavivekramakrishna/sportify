import { createContext, useEffect, useState } from "react";
import { fetchAllSports } from "../utils/apiCallUtils";
import { Sport } from "../types";

type prop = {
  sport: Sport[];
  setsport: (user: Sport[]) => void;
};

const sportContext = createContext<prop>({
  sport: [],
  setsport: () => void 0,
});

export { sportContext, SportProvider };

const SportProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sport, setsport] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllSports();
        setsport(res.sports);
      } catch (error) {
        console.error("Error fetching sport:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <sportContext.Provider value={{ sport, setsport }}>
      {children}
    </sportContext.Provider>
  );
};
