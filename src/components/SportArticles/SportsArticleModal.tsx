import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@material-tailwind/react";
import { Article } from "../../types";
import { fetchArticle } from "../../utils/apiCallUtils";
import { useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",

  p: 4,
};

export default function BasicModal(props: {
  article: Article;
  setOpen: (open: boolean) => void;
  open: boolean;
}) {
  const [article, setArticle] = useState<Article | null>(null);

  const getArticleDetailsFunction = async () => {
    const data = await fetchArticle(props.article.id);
    setArticle(data);
  };

  useEffect(() => {
    getArticleDetailsFunction();
  }, [props.article]);

  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal open={props.open} onClose={handleClose} className="border-none">
        <Card style={style} className="mt-6    ">
          <CardHeader color="blue-gray" className="relative">
            <img
              src={props.open ? props.article.thumbnail : ""}
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
            value={props.open ? new Date(props.article.date).toUTCString() : ""}
            color={"green"}
          />
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {props.open && props.article.title}
            </Typography>
            <Typography>{article && article.content}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={() => props.setOpen(false)}>Close</Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
}
