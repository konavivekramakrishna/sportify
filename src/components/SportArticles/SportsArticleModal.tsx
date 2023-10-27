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

const style = {
  Position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  overflow: "auto", // Add overflow property to enable scrolling
  maxHeight: "85vh", // Set a maximum height for the modal
};

export default function ArticleModal() {
  const [open, setOpen] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();

  const getArticleDetailsFunction = async (articleId: string) => {
    try {
      const data = await fetchArticle(Number(articleId));
      setArticle(data);
    } catch (error) {
      // Handle errors, e.g., show an error message
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
        <div>
          <Card style={style} className="mt-6">
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
        </div>
      </Modal>
    </div>
  );
}
