import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle } from "../../utils/apiCallUtils";
import { Article } from "../../types";
import { UserContext } from "../../context/user";
import {
  me,
  setPreference as setPreferenceAPI,
} from "../../utils/apiCallUtils";

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  const { user, setUser } = useContext(UserContext);

  // const navigator=  useNavigate()

  const [isSelcted, setisSelected] = useState(false);
  const [showFavButton, setShowFavButton] = useState(false);

  const getArticleDetailsFunction = async (articleId: string) => {
    try {
      const data = await fetchArticle(Number(articleId));
      setArticle(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      navigator("/home");
    }
  };

  useEffect(() => {
    if (id) {
      getArticleDetailsFunction(id);
      if (user) {
        let favArray = user.preferences?.favArray || [];
        console.log("favarr", favArray);
        // console.log("sis", true ? favArray.includes(id) : false);
        setisSelected(true ? favArray.includes(id) : false);
        setShowFavButton(true);
      }
    }
  }, [id, user]);

  const handleClose = () => {
    setIsOpen(false);
    navigator("/home");
  };

  const handleSave = async () => {
    let favArray = user?.preferences?.favArray
      ? user?.preferences?.favArray
      : [];
    console.log("1", favArray);

    if (isSelcted == true) {
      favArray = favArray.filter((saved: any) => saved != id);
    } else {
      favArray.push(id);
    }
    // console.log(object);
    console.log("2", favArray);
    const body = {
      sports: user?.preferences?.sports || [],
      teams: user?.preferences?.teams || [],
      favArray: favArray,
    };

    await setPreferenceAPI({ preferences: body });
    const userDetails = await me();
    setUser(userDetails);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
        <div className="fixed inset-0  overflow-y-auto">
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
              <div className="bg-white w-full max-w-xl rounded-lg shadow-xl p-6 text-left">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  {loading ? "Loading..." : article?.title}
                </Dialog.Title>
                {!loading && (
                  <img
                    src={article?.thumbnail}
                    alt="card-image"
                    className="mt-4 mx-auto"
                  />
                )}
                <span className="text-gray-600 text-sm">
                  {!loading && article
                    ? new Date(article.date).toUTCString()
                    : ""}
                </span>
                {!loading && <p className="mt-2">{article?.content}</p>}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  {showFavButton && (
                    <button
                      type="button"
                      className={`inline-flex ml-10 justify-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isSelcted === false
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-400 hover:bg-red-600"
                      }`}
                      onClick={handleSave}
                    >
                      {isSelcted === false
                        ? "Save to Favorites"
                        : "Remove from Favorites"}
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
