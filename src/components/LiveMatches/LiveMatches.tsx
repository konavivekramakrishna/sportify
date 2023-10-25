import { useState, useEffect } from "react";
import { fetchAllMatches } from "../../utils/apiCallUtils";
import LiveMatchCard from "./LiveMatchCard";
import { Match } from "../../types";
import { Typography } from "@material-tailwind/react";

export default function LiveMatches() {
  const fetchAllMatchesFunction = async () => {
    const data = await fetchAllMatches();
    setLiveMatches(data.matches);
  };

  const [liveMatches, setLiveMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchAllMatchesFunction();
  }, []);

  return (
    <div className="bg-blue-50 m-2 mt-5 rounded-lg p-3 overflow-x-auto">
      <Typography variant="h4" color="blue-gray">
        Live Matches
      </Typography>
      <div className="flex flex-row space-x-2">
        {liveMatches &&
          liveMatches.length > 0 &&
          liveMatches.map((match) => (
            <LiveMatchCard id={match.id} key={match.id} />
          ))}
      </div>
    </div>
  );
}
