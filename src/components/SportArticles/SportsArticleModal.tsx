import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle } from "../../utils/apiCallUtils";
import { Article } from "../../types";

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  const getArticleDetailsFunction = async (articleId: string) => {
    try {
      const data = await fetchArticle(Number(articleId));
      setArticle(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getArticleDetailsFunction(id);
    }
  }, [id]);

  const handleClose = () => {
    setIsOpen(false);
    navigator("/home");
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
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
