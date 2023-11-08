import { useState, useEffect, useContext } from "react";
import { fetchAllMatches } from "../../utils/apiCallUtils";
import LiveMatchCard from "./LiveMatchCard";
import { Typography } from "@material-tailwind/react";
import { UserContext } from "../../context/user";
import { sportnamewithID } from "../../utils/helperFunctions";
import { Match } from "../../types";

export default function LiveMatches() {
  const { user } = useContext(UserContext);
  const [selectedSports, setSelectedSports] = useState<number[]>(
    user?.preferences?.sports || []
  );
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

    

  useEffect(() => {
    const fetchAllMatchesFunction = async () => {
      const data = await fetchAllMatches();
      const allMatches = data.matches;

      if (user && user.preferences.sports && selectedSports.length > 0) {
        const selectedSportNames = sportnamewithID
          .filter((s) => selectedSports.includes(s.id))
          .map((s) => s.name);

        const filteredMatches = allMatches.filter((m: any) =>
          selectedSportNames.includes(m.sportName)
        );

        setLiveMatches(filteredMatches);
      } else {
        setLiveMatches(allMatches);
      }
    };

    fetchAllMatchesFunction();
  }, [user, selectedSports]);

  useEffect(() => {
    if (user) {
      setSelectedSports(user.preferences.sports);
    }
  }, [user]);

  return (
    <div className="bg-blue-50 m-2 mt-5 rounded-lg p-3 overflow-x-auto">
      <Typography variant="h4" color="blue-gray">
        Live and Completed Matches
      </Typography>
      <div className="flex flex-row space-x-2">
        {liveMatches.length > 0 &&
          liveMatches.map((match) => (
            <LiveMatchCard id={match.id} key={match.id} />
          ))}
      </div>
    </div>
  );
}
