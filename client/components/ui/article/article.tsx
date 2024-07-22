"use client";

import * as React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { cn } from "@/lib/utils";
import { IArticle } from "../../../../types";
import { Button, ButtonProps } from "../button";
import api from "@/lib/api";
import { useToast } from "../use-toast";
import { AxiosError } from "axios";

type IArticleProps = React.PropsWithChildren &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    article: IArticle;
  };

type ICoverProps = React.PropsWithChildren & {
  withShadow?: boolean;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;

const ArticleContext = React.createContext<IArticle | undefined>(undefined);

export function useArticleContext() {
  const context = React.useContext(ArticleContext);
  if (!context) throw new Error("No post context found");
  return context;
}

export default function Article(props: IArticleProps) {
  return (
    <ArticleContext.Provider value={props.article}>
      <article {...props}>{props.children}</article>
    </ArticleContext.Provider>
  );
}

Article.cover = function cover(props: ICoverProps) {
  const { thumbnail } = useArticleContext();
  return (
    <div
      style={{
        backgroundImage: `url(${thumbnail})`,
        boxShadow: props.withShadow
          ? "-3px -125px 78px 13px rgba(0,0,0,1) inset"
          : undefined,
      }}
      id="thumbnail"
      className={cn(
        "bg-cover bg-center bg-no-repeat rounded-lg ",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Article.title = function (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
) {
  const { title } = useArticleContext();
  return <h1 {...props}>{title}</h1>;
};

Article.description = function (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  const { description } = useArticleContext();
  return <p {...props}>{description}</p>;
};

Article.categories = function (props: React.PropsWithChildren) {
  return;
};

Article.author = function author(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  const { author } = useArticleContext();
  return <p {...props}>{author}</p>;
};

Article.content = function content() {
  const { content } = useArticleContext();
  return <p className="w-full">{content}</p>;
};

Article.SaveBtn = function save(
  props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
) {
  const { id } = useArticleContext();
  const { toast } = useToast();

  const handleSaveArticle = async () => {
    return api
      .post(
        "/users/1/saves/",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 403)
          toast({
            title: "Login required",
            description: "Please login to save this article",
          });
      });
  };

  return (
    <Button onClick={handleSaveArticle} {...props}>
      Save
    </Button>
  );
};

Article.readArticle = function (
  props: ButtonProps & React.RefAttributes<HTMLButtonElement>,
) {
  const { id } = useArticleContext();

  return <Button {...props}>Read article</Button>;
};
