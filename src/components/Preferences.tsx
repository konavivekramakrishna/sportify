import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Card, Button } from "@material-tailwind/react";
import { Sport, Team } from "../types";
import {
  fetchAllTeams,
  me,
  setPreference as setPreferenceAPI,
} from "../utils/apiCallUtils";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
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
  width: "90%",
};

export default function Preference() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const { user, setUser } = React.useContext(UserContext);
  const { sport } = React.useContext(sportContext);

  const [selectedSports, setSelectedSports] = useState<Sport[]>(
    user?.preferences?.sports || []
  );

  const [selectedTeams, setSelectedTeams] = useState<Team[]>(
    user?.preferences?.teams || []
  );

  console.log(selectedTeams);

  const navigate = useNavigate();

  const getAllTeams = async (setTeamsCB: (teams: Team[]) => void) => {
    const data = await fetchAllTeams();
    setTeamsCB(data);
  };

  useEffect(() => {
    if (user) {
      getAllTeams(setTeams);
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate("/home");
  };

  const handleSave = async () => {
    if (user) {
      const body = {
        sports: selectedSports,
        teams: selectedTeams,
      };
      await setPreferenceAPI({ preferences: body });
      const userDetails = await me();
      setUser(userDetails);
    }
    navigate("/home");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="border-none">
        <div
          style={style}
          className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg"
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
              <div className="grid grid-cols-1 mx-auto  gap-4">
                <div>
                  <Typography variant="h5" className="mb-2">
                    Sports
                  </Typography>
                  <div className="grid grid-cols-5 gap-4 m-1 p-1">
                    {sport &&
                      sport.map((s: any) => (
                        <div key={s.id} className="mb-2">
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedSports.includes(s.id)}
                              onChange={() =>
                                setSelectedSports((prev) => {
                                  if (prev.includes(s.id)) {
                                    return prev.filter((id) => id !== s.id);
                                  } else {
                                    return [...prev, s.id];
                                  }
                                })
                              }
                            />
                            {s.name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <Typography variant="h5" className="mb-2">
                    Teams
                  </Typography>
                  <div className="grid grid-cols-5 gap-4 m-1 p-1">
                    {teams &&
                      teams.map((team) => (
                        <div key={team.id} className="mb-2">
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedTeams.some(
                                (selectedTeam) => selectedTeam.id === team.id
                              )}
                              onChange={() =>
                                setSelectedTeams((prevTeams) => {
                                  if (
                                    prevTeams.some(
                                      (selectedTeam) =>
                                        selectedTeam.id === team.id
                                    )
                                  ) {
                                    return prevTeams.filter(
                                      (selectedTeam) =>
                                        selectedTeam.id !== team.id
                                    );
                                  } else {
                                    return [...prevTeams, team];
                                  }
                                })
                              }
                            />
                            {team.name}
                          </label>
                        </div>
                      ))}
                  </div>
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
