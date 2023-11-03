import { Tabs, TabsHeader, Tab, Typography } from "@material-tailwind/react";
import { fetchAllArticles } from "../../utils/apiCallUtils";
import React, { useEffect, useState } from "react";
import { Article } from "../../types";
import { HorizontalCard } from "./SportArticleCard";
import { sportContext } from "../../context/sports";
import { UserContext } from "../../context/user";

export function Articles() {
  const sports = React.useContext(sportContext);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterSportId, setFilterSportId] = useState<string | null>(null);

  const user = React.useContext(UserContext);

  console.log(user.user);

  useEffect(() => {
    const fetchData = async () => {
      const articlesData = await fetchAllArticles();

      setArticles(articlesData);
      setFilterSportId("all");
    };

    fetchData();
  }, []);

  const filteredArticles = filterSportId
    ? articles.filter(
        (article) =>
          filterSportId === "all" || article.sport.id === Number(filterSportId),
      )
    : [];

  return (
    <div className="p-1 m-1 mt-5">
      <Typography variant="h4" className="m-1 p-1" color="blue-gray">
        Articles
      </Typography>
      <Tabs id="custom-animation" value={filterSportId || "all"}>
        <TabsHeader>
          <Tab
            onClick={() => setFilterSportId("all")}
            value="all"
            className="text-blue-gray-500 h-10"
          >
            All
          </Tab>

          {sports.sport.length > 0 &&
            sports.sport.map((sport) => (
              <Tab
                onClick={() => setFilterSportId(String(sport.id))}
                key={sport.id}
                value={String(sport.id)}
                className="text-blue-gray-500 h-10"
              >
                {sport.name}
              </Tab>
            ))}
        </TabsHeader>
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
    </div>
  );
}
