import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Article } from "../../types";
import BasicModal from "./SportsArticleModal";
import { useState } from "react";

export function HorizontalCard(props: { article: Article }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full m-2 p-1 max-w-[75rem] max-h-41 flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <div className="w-full shrink-0 sm:w-50 ">
          <img
            src={props.article.thumbnail}
            alt="card-image"
            className="sm:rounded-l-md h-full max-h-64 rounded-t-md object-cover w-full "
          />
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {props.article.sport.name}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {props.article.title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {props.article.summary}
        </Typography>
        <a href="#" className="inline-block">
          <Button
            variant="text"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardBody>
      <BasicModal open={open} setOpen={setOpen} article={props.article} />
    </Card>
  );
}
