"use client";

import { useErrorBoundary } from "react-error-boundary";
import React, { useEffect, useState } from "react";

import api from "@/lib/api";
import { IArticle } from "../../../types";
import HomeArticle from "@/components/ui/article/homeArticle";
import { useRouter } from "next/navigation";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    (async () => {
      const posts = await api
        .get("/latest")
        .then((res) => res.data)
        .catch((error) => {
          showBoundary(error);
        });

      setPosts(posts);
    })();
  }, [showBoundary]);

  return (
    <div className="overflow-y-scroll h-full flex flex-col gap-10 items-center">
      {posts?.map((post: IArticle, index) => (
        <HomeArticle article={post} key={post.title + index} />
      ))}
    </div>
  );
};

export default Posts;
