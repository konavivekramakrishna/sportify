import { useState, useEffect, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import LiveMatchCard from "./LiveMatchCard";
import { UserContext } from "../../context/user";
import { sportnamewithID } from "../../utils/helperFunctions";
import { fetchAllMatches } from "../../utils/apiCallUtils";
import { Match, Team } from "../../types";

function teamsWithUnselectedSports(
  selectedTeams: any[],
  selectedSports: any[],
  sportnamewithID: any[],
): Team[] {
  const selectedSportNames = selectedSports
    .map((id) => sportnamewithID.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => s.name);

  const unselectedTeams = selectedTeams.filter((team) => {
    const teamSports = sportnamewithID
      .filter((sport) => sport.name === team.plays)
      .map((sport) => sport.name);

    return !teamSports.some((teamSport) =>
      selectedSportNames.includes(teamSport),
    );
  });

  return unselectedTeams;
}

export default function LiveMatches() {
  const { user } = useContext(UserContext);
  const [selectedSports, setSelectedSports] = useState<number[]>(
    user?.preferences?.sports || [],
  );
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(
    user?.preferences?.teams || [],
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

      let unselectedTeams = teamsWithUnselectedSports(
        selectedTeams,
        selectedSports,
        sportnamewithID,
      );

      let unselectedTeamsNames = unselectedTeams.map((s) => s.name);

      if (selectedSportNames.length > 0 || unselectedTeams.length > 0) {
        let filteredMatches = allMatches.filter((m) => {
          const teamNames = m.teams.map((team) => team.name);
          const matchIncludedBySport = selectedSportNames.includes(m.sportName);
          const matchIncludedByTeam = unselectedTeams.some((team: any) =>
            teamNames.includes(team.plays),
          );

          return matchIncludedBySport || matchIncludedByTeam;
        });

        const filterMatchesWIthTeams = allMatches.filter((m) => {
          let tempS = m.teams;
          return tempS.some((tm) => unselectedTeamsNames.includes(tm.name))
            ? true
            : false;
        });
        filteredMatches.push(...filterMatchesWIthTeams);

        setLiveMatches(filteredMatches);
      } else {
        setLiveMatches(allMatches);
      }
    } else {
      setLiveMatches(allMatches);
    }
  }, [user, selectedSports, selectedTeams, allMatches]);

  useEffect(() => {
    if (user) {
      setSelectedSports(user.preferences?.sports || []);
      setSelectedTeams(user?.preferences.teams || []);
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
