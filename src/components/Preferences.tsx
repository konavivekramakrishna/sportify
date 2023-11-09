import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { UserContext } from "../context/user";
import { sportContext } from "../context/sports";
import { Sport, Team } from "../types";
import {
  fetchAllTeams,
  me,
  setPreference as setPreferenceAPI,
} from "../utils/apiCallUtils";

export default function MyModal() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const { user, setUser } = useContext(UserContext);
  const { sport } = useContext(sportContext);

  const [selectedSports, setSelectedSports] = useState<Sport[]>(
    user?.preferences?.sports || [],
  );

  const [selectedTeams, setSelectedTeams] = useState<Team[]>(
    user?.preferences?.teams || [],
  );

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
    navigate("/home");
    setOpen(false);
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
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-4 text-left">
                <button
                  className="absolute top-4 right-4 bg-red-100 px-2 py-1 text-sm text-red-900 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  onClick={handleClose}
                >
                  ❌
                </button>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  <Typography variant="h4">
                    {loading ? "Loading..." : "Preferences"}
                  </Typography>
                </Dialog.Title>
                <div className="grid grid-cols-1 mx-auto gap-4 mt-4">
                  <div>
                    <Typography>
                      <span className="text-xl font-semibold">Sports</span>
                    </Typography>

                    <div className="grid grid-cols-5 gap-4 mt-2">
                      {sport &&
                        sport.map((s: any) => (
                          <div key={s.id}>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selectedSports.includes(s.id)}
                                onChange={() =>
                                  setSelectedSports((prev) =>
                                    prev.includes(s.id)
                                      ? prev.filter((id) => id !== s.id)
                                      : [...prev, s.id],
                                  )
                                }
                                className="text-blue-500"
                              />
                              <Typography>{s.name}</Typography>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <Typography>
                      <span className="text-xl font-semibold">Teams</span>
                    </Typography>

                    <div className="grid grid-cols-4 gap-3 mt-2">
                      {teams &&
                        teams.map((team) => (
                          <div key={team.id}>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selectedTeams.some(
                                  (selectedTeam) => selectedTeam.id === team.id,
                                )}
                                onChange={() =>
                                  setSelectedTeams((prevTeams) =>
                                    prevTeams.some(
                                      (selectedTeam) =>
                                        selectedTeam.id === team.id,
                                    )
                                      ? prevTeams.filter(
                                          (selectedTeam) =>
                                            selectedTeam.id !== team.id,
                                        )
                                      : [...prevTeams, team],
                                  )
                                }
                                className="text-blue-500"
                              />
                              <Typography>{team.name}</Typography>
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
