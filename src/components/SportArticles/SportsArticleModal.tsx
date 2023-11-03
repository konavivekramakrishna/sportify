import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@material-tailwind/react";
import { Article } from "../../types";
import { fetchArticle } from "../../utils/apiCallUtils";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "background.paper",
  padding: 4,
  overflow: "auto",
  maxHeight: "85vh",
};

export default function ArticleModal() {
  const [open, setOpen] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getArticleDetailsFunction = async (articleId: string) => {
    try {
      const data = await fetchArticle(Number(articleId));
      setArticle(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getArticleDetailsFunction(id);
    }
  }, [id]);

  const handleClose = () => {
    setOpen(false);
    navigator("../");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="border-none">
        <div style={style}>
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
            <Card className="mt-6">
              <CardHeader color="blue-gray" className="relative">
                <img
                  src={article?.thumbnail}
                  alt="card-image"
                  className="
                sm:rounded-l-md
                h-full
                max-h-64
                rounded-t-md
                object-cover
                w-full"
                />
              </CardHeader>
              <Chip
                className="m-2 w-1/4 ml-3 p-1"
                size="sm"
                variant="ghost"
                value={article ? new Date(article.date).toUTCString() : ""}
                color={"green"}
              />
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {article && article.title}
                </Typography>
                <Typography>{article && article.content}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={handleClose}>Close</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
}
