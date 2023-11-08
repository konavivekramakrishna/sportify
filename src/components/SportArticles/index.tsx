import React, { useEffect, useState } from "react";
import { Article, Team } from "../../types";
import { HorizontalCard } from "./SportArticleCard";
import { sportContext } from "../../context/sports";
import { UserContext } from "../../context/user";
import { Tabs, TabsHeader, Tab, Typography } from "@material-tailwind/react";
import { fetchAllArticles } from "../../utils/apiCallUtils";
import { teamData } from "../../utils/helperFunctions";
import ErrorBoundary from "../ErrorBoundary";
export function Articles() {
  const { sport } = React.useContext(sportContext);
  const { user } = React.useContext(UserContext);

  const [articles, setArticles] = useState<Article[]>([]);
  const [filterSportId, setFilterSportId] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<number[]>(
    user?.preferences?.sports || [],
  );

  const selectedTeams: Team[] = user?.preferences?.teams || [];

  const sportThasTeamsSelected = selectedSports.filter((sportId) => {
    return selectedTeams.some((team) => teamData[sportId].includes(team.name));
  });

  useEffect(() => {
    if (user) {
      setSelectedSports(user.preferences.sports);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const articlesData = await fetchAllArticles();
      setArticles(articlesData);
      setFilterSportId("all");
    };

    fetchData();
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (!user && filterSportId === "all") {
      return article;
    }
    if (!user && filterSportId !== "all") {
      return article.sport.id === Number(filterSportId);
    }
    if (filterSportId == "all") {
      if (selectedSports.length > 0) {
        return selectedSports.includes(article.sport.id);
      }
      return article;
    }
    if (
      filterSportId !== "all" &&
      !sportThasTeamsSelected.includes(Number(filterSportId))
    ) {
      return article.sport.id === Number(filterSportId);
    }
    if (
      filterSportId !== "all" &&
      sportThasTeamsSelected.includes(Number(filterSportId))
    ) {
      return (
        article.sport.id === Number(filterSportId) &&
        article.teams.some((articleTeam) => {
          const articleTeamName = articleTeam.name;
          return selectedTeams.some((selectedTeam) => {
            const selectedTeamName = selectedTeam.name;
            return articleTeamName === selectedTeamName;
          });
        })
      );
    }
  });

  let sportsToDisplay =
    user && selectedSports.length > 0
      ? sport.filter((s) => selectedSports.includes(s.id))
      : sport;

  useEffect(() => {
    if (user && selectedSports.length > 0) {
      sportsToDisplay = user
        ? sport.filter((s) => selectedSports.includes(s.id))
        : sport;
    } else {
      sportsToDisplay = sport;
    }
  }, [selectedSports]);

  const sportsTabs = [
    <Tab
      onClick={() => setFilterSportId("all")}
      value="all"
      key="all"
      className="text-blue-gray-500 h-10"
    >
      All
    </Tab>,
    ...sportsToDisplay.map((sport) => (
      <Tab
        onClick={() => setFilterSportId(String(sport.id))}
        value={String(sport.id)}
        key={sport.id}
        className="text-blue-gray-500 h-10"
      >
        {sport.name}
      </Tab>
    )),
  ];

  return (
    <div className="p-1 m-1 mt-5">
      <ErrorBoundary>
        <Typography variant="h4" className="m-1 p-1" color="blue-gray">
          Articles
        </Typography>
        <Tabs id="custom-animation" value={filterSportId || "all"}>
          <TabsHeader>{sportsTabs}</TabsHeader>
        </Tabs>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div className="flex justify-center" key={article.id}>
              <HorizontalCard article={article} />
            </div>
          ))
        ) : (
          <div>No articles available for the selected sport.</div>
        )}
      </ErrorBoundary>
    </div>
  );
}
