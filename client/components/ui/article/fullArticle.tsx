"use client";

import * as React from "react";

import Article from "./article";
import { Button } from "../button";
import { IArticle } from "../../../../types";

type IFullArticleProps = { article: IArticle };

export default function FullArticle(props: IFullArticleProps) {
  return (
    <Article
      article={props.article}
      className="gap-5  relative  w-full h-full max-w-[520px]"
    >
      <Article.cover className="w-full h-60" />
      <div className="mt-3 flex flex-col gap-4 pb-5">
        <div className="font-bold text-xs flex gap-2">
          <p>{new Date().toDateString()}</p> • <p>3 min read</p>
        </div>
        <Article.title className="font-bold text-sm text-primary" />
        <Article.content />
        <div className="flex gap-2">
          <Button className="rounded-lg text-sm w-full">
            Read Full Article
          </Button>
          <Article.SaveBtn />
        </div>
      </div>
    </Article>
  );
}
