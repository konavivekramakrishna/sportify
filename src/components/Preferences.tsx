import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Card, Button } from "@material-tailwind/react";
import { Team } from "../types";
import { fetchAllTeams, setPreference } from "../utils/apiCallUtils";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import { sportContext } from "../context/sports";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 4,
  overflow: "auto",
  maxHeight: "85vh",
  width: "90%", // Increase the width
};

export default function Preference() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = React.useContext(UserContext);
  const { sport } = React.useContext(sportContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  const getAllTeams = async (setTeamsCB: (teams: Team[]) => void) => {
    const data = await fetchAllTeams();
    setTeamsCB(data);
  };

  useEffect(() => {
    if (user) {
      getAllTeams(setTeams);
      setLoading(false);
    } else {
      navigate("/home");
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };

  // Function to save user preferences
  const handleSave = async () => {
    console.log(user?.preferences);
    //await setPreference(user?.preferences);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="border-none">
        <div
          style={style}
          className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg" // Increase width
        >
          {loading && (
            <div className="flex justify-center">
              <Card className="mt-6">
                <Typography variant="h4" color="blue-gray">
                  Loading...
                </Typography>
              </Card>
            </div>
          )}
          {!loading && (
            <Card className="mt-6 p-4">
              <Typography variant="h4" color="blue-gray" className="mb-4">
                Set Preferences
              </Typography>
              <div className="grid grid-cols-6 gap-4">
                {" "}
                {/* Increase the number of columns to 8 */}
                <div className="col-span-8">
                  <Typography variant="h5" className="mb-2">
                    Sports
                  </Typography>
                  {sport &&
                    sport.map((s) => (
                      <Checkbox
                        color="blue"
                        checked={user?.preferences?.sports?.includes(s.id)}
                        crossOrigin={""}
                        onClick={() => {
                          if (user?.preferences?.sports?.includes(s.id)) {
                            user.preferences.sports =
                              user.preferences.sports.filter(
                                (sport: any) => sport !== s.id,
                              );
                          } else {
                            user?.preferences.sports.push(s.id);
                          }
                        }}
                        label={s.name}
                        key={s.id}
                        className="m-1"
                      />
                    ))}
                </div>
                <div className="col-span-8">
                  <Typography variant="h5" className="mb-2">
                    Teams
                  </Typography>
                  {teams &&
                    teams.map((team) => (
                      <Checkbox
                        color="blue"
                        checked={user?.preferences?.teams?.includes(team.id)}
                        onClick={() => {
                          if (user?.preferences?.teams?.includes(team.id)) {
                            user.preferences.teams =
                              user.preferences.teams.filter(
                                (t: any) => t !== team.id,
                              );
                          } else {
                            user?.preferences.teams.push(team.id);
                          }
                        }}
                        crossOrigin={""}
                        label={team.name}
                        key={team.id}
                        className="m-1"
                      />
                    ))}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={handleSave} color="indigo">
                  Save
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
}
