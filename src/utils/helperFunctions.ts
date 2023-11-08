// import { Team, Sport } from "../types";
// import { fetchAllSports, fetchAllTeams } from "./apiCallUtils";

// let teamData: { [sportId: number]: string[] } = {};

// const helperFunction = async () => {
//   try {
//     const sportsData = await fetchAllSports();
//     const sportsMap: { [sportName: string]: number } = {};

//     sportsData.sports.forEach((sport: Sport) => {
//       sportsMap[sport.name] = sport.id;
//     });

//     // Fetch teams data
//     const teamsData = await fetchAllTeams();

//     teamsData.forEach((team: Team) => {
//       const { name, plays } = team;
//       const sportId = sportsMap[plays];
//       if (!teamData[sportId]) {
//         teamData[sportId] = [];
//       }
//       teamData[sportId].push(name);
//     });

//     return teamData;
//   } catch (error) {
//     console.error("Error fetching team data:", error);
//     return teamData;
//   }
// };

// helperFunction().then((result) => {
//   teamData = result;
//   console.log(teamData);
// });

let teamData: { [sportId: number]: string[] } = {
  "1": ["Thunderbolts", "Dragonslayers", "Phoenix Rising", "Avalanche"],
  "2": ["Titans", "Vortex Vipers", "Spectral Shadows", "Blitzkrieg"],
  "3": [
    "Fury United",
    "Lightning Strikes",
    "Serpents of Fire",
    "Galaxy Warriors",
  ],
  "4": [
    "Stormbreakers",
    "Enigma Enforcers",
    "Blaze Squadron",
    "Phantom Phantoms",
  ],
  "5": [
    "Celestial Chargers",
    "Rebel Renegades",
    "Inferno Ignitors",
    "Stealth Strikers",
  ],
  "6": [
    "Nova Knights",
    "Crimson Crushers",
    "Rapid Raptors",
    "Shadow Assassins",
  ],
};

export { teamData };
