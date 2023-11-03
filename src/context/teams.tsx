import { createContext, useEffect, useState } from "react";
import { fetchAllTeams } from "../utils/apiCallUtils";
import { Team } from "../types";

type prop = {
  team: Team | null;
  setTeam: (user: Team | null) => void;
};

const TeamContext = createContext<prop>({
  team: null,
  setTeam: () => void 0,
});

export { TeamContext, TeamProvider };

const TeamProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllTeams();
        setTeam(res);
      } catch (error) {
        console.error("Error fetching Team:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
