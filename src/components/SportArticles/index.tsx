import React, { useEffect, useState } from "react";
import { Article, Team } from "../../types";
import { HorizontalCard } from "./SportArticleCard";
import { sportContext } from "../../context/sports";
import { UserContext } from "../../context/user";
import { fetchAllArticles } from "../../utils/apiCallUtils";
import { teamData } from "../../utils/helperFunctions";
import ErrorBoundary from "../ErrorBoundary";

export function Articles() {
  const { sport } = React.useContext(sportContext);
  const { user } = React.useContext(UserContext);

  const [articles, setArticles] = useState<Article[]>([]);
  const [filterSportId, setFilterSportId] = useState<string | null>("all");
  const [selectedSports, setSelectedSports] = useState<number[]>(
    user?.preferences?.sports || [],
  );

  const selectedTeams: Team[] = user?.preferences?.teams || [];

  const sportThasTeamsSelected =
    (selectedSports?.length > 0 &&
      selectedSports?.filter((sportId) => {
        return selectedTeams.some(
          (team) => teamData[sportId]?.includes(team.name),
        );
      })) ||
    [];

  useEffect(() => {
    if (user) {
      setSelectedSports(user?.preferences?.sports || []);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const articlesData = await fetchAllArticles();
      setArticles(articlesData);
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
      if (selectedSports?.length > 0) {
        return selectedSports?.includes(article.sport.id);
      }
      return article;
    }
    if (
      filterSportId !== "all" &&
      !sportThasTeamsSelected?.includes(Number(filterSportId))
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

  const sportsToDisplay =
    user && selectedSports?.length > 0
      ? sport.filter((s) => selectedSports?.includes(s.id))
      : sport;

  return (
    <div className="p-1 m-1 mt-5">
      <ErrorBoundary>
        <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-2  ">
          <button
            className={`
              p-2 px-4 rounded-lg
              ${
                filterSportId === "all"
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "text-blue-500 border border-blue-500"
              }
            `}
            onClick={() => setFilterSportId("all")}
          >
            All
          </button>
          {sportsToDisplay.map((sportItem) => (
            <button
              key={sportItem.id}
              className={`
                p-2 px-4 rounded-lg
                ${
                  filterSportId === String(sportItem.id)
                    ? "bg-blue-500 text-white border border-blue-500"
                    : "text-blue-500 border border-blue-500"
                }
              `}
              onClick={() => setFilterSportId(String(sportItem.id))}
            >
              {sportItem.name}
            </button>
          ))}
        </div>
        {filteredArticles?.length > 0 ? (
          filteredArticles.map((article) => (
            <div className="flex justify-center" key={article.id}>
              <HorizontalCard article={article} />
            </div>
          ))
        ) : (
          <div className="mt-4 text-blue-500">
            No articles available for the selected sport.
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
