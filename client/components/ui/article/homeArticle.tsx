"use client";

import Link from "next/link";
import * as React from "react";
import { User, Gamepad } from "lucide-react";

import { Button } from "../button";
import { IArticle } from "../../../../types";
import Article, { useArticleContext } from "./article";

type IHomeArticleProps = { article: IArticle };

function HomeArticleCover() {
  const { id, author } = useArticleContext();

  const metadata = [
    { title: author, icon: <User size={15} /> },
    { title: "Gaming", icon: <Gamepad size={15} /> },
  ];

  return (
    <Article.cover
      withShadow
      className="h-full flex justify-end flex-col p-3  gap-4 pb-11 relative"
    >
      <Link href={"/posts/" + id}>
        <Button className="rounded-full text-sm self-start top-5 right-5 absolute">
          Read article
        </Button>
      </Link>

      <Article.title className="text-xl font-bold line-clamp-3" />
      <div className="flex gap-3">
        {metadata.map((data) => (
          <li className="flex gap-2 font-bold text-xs">
            {data.icon} {data.title}
          </li>
        ))}
      </div>
      <Article.description className="text-xs" />
    </Article.cover>
  );
}

export default function HomeArticle(props: IHomeArticleProps) {
  return (
    <Article
      article={props.article}
      className="min-h-[420px] rounded-3xl flex flex-col justify-between w-full gap-3 relative max-w-[520px]"
    >
      <HomeArticleCover />
      {/* please make this more reusable */}
      <div className="flex gap-3 absolute bottom-[-0.80rem] ">
        <Article.SaveBtn className="rounded-lg text-sm" />
        <Button className="rounded-lg text-sm" variant={"secondary"}>
          Share
        </Button>
      </div>
    </Article>
  );
}
