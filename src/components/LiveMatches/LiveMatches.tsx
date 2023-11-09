import { useState, useEffect, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import LiveMatchCard from "./LiveMatchCard";
import { UserContext } from "../../context/user";
import { sportnamewithID } from "../../utils/helperFunctions";
import { fetchAllMatches } from "../../utils/apiCallUtils";
import { Match } from "../../types";

export default function LiveMatches() {
  const { user } = useContext(UserContext);
  const [selectedSports, setSelectedSports] = useState<number[]>(
    user?.preferences?.sports || [],
  );
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const result = await fetchAllMatches();
      setAllMatches(result.matches);
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    if (user) {
      const selectedSportNames = selectedSports
        .map((id) => sportnamewithID.find((s) => s.id === id))
        .filter(Boolean)
        .map((s) => s?.name);

      if (selectedSportNames.length > 0) {
        const filteredMatches = allMatches.filter((m) =>
          selectedSportNames.includes(m.sportName),
        );
        setLiveMatches(filteredMatches);
      } else {
        setLiveMatches(allMatches);
      }
    } else {
      setLiveMatches(allMatches);
    }
  }, [user, selectedSports, allMatches]);

  useEffect(() => {
    if (user) {
      setSelectedSports(user.preferences?.sports || []);
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
