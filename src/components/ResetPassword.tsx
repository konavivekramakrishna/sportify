import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { resetPassword } from "../utils/apiCallUtils";
import { useNavigate } from "react-router-dom";

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigator = useNavigate();

  const updatePasswordFunction = async () => {
    setLoading(true);
    try {
      const data = await resetPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      if (data) {
        navigator("/home");
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      setError("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  function closeModal() {
    setIsOpen(false);
    navigator("/home");
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    className="absolute top-4 right-4 bg-red-100 px-2 py-1 text-sm text-red-900 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    onClick={closeModal}
                  >
                    ❌
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Password
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mb-4">
                      <Input
                        crossOrigin={""}
                        type="password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <Input
                        crossOrigin={""}
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 mt-1">
                      {error} Please try again.
                    </p>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={updatePasswordFunction}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
