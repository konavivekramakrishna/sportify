import { useEffect, useState } from "react";
import { fetchMatch } from "../../utils/apiCallUtils";
import { Match } from "../../types";
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
export default function LiveMatchCard(props: { id: number }) {
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);

  const fetchMatchDetails = async () => {
    const data = await fetchMatch(props.id);
    setMatchDetails(data);
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [props.id]);

  return (
    <>
      {matchDetails ? (
        <div>
          <Card
            className={`w-[17rem] h-[14rem] group hover:bg-gray-50 p-1   transition duration-300 m-2  `}
          >
            <CardBody className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-medium"
                >
                  {matchDetails.sportName}
                </Typography>
                <button onClick={() => fetchMatchDetails()}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
            </CardBody>
            <div className="p-1">
              <div className="flex items-center">
                <span className="text-black-400 m-1 text-sm mr-2">
                  {matchDetails?.name}
                </span>
              </div>
              {Object.keys(matchDetails.score || {}).map((key) => (
                <p key={key} className="flex w-full px-2 justify-between">
                  <b>{key}</b>

                  {matchDetails?.score[key as keyof Match]}
                </p>
              ))}

              {matchDetails?.isRunning ? (
                <Chip
                  className="mt-2 p-2 w-16 items-center justify-center"
                  size="sm"
                  variant="ghost"
                  value={"Live"}
                  color={"red"}
                />
              ) : (
                <></>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
