"use client";

import React, { useEffect, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { type IArticle } from "../../../../types";
import ErrorComponent from "@/components/common/Error";
import Filter from "@/components/common/Filter/Filter";
import ExploreArticle from "@/components/ui/article/exploreArticle";
import TrendingArticle from "@/components/ui/article/trendingArticle";

const getPosts = async () => {
  const res = await fetch("http://localhost:3001/latest");
  return res.json();
};

const Explore = () => {
  const [posts, setPosts] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error("Failed to load post: " + error);
      }
    })();
  }, []);

  if (isLoading) return <div className="h-full">Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value="search"
          className="bg-zinc-800 p-2 w-full rounded-xl"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Filter name="PC Gaming" />
        <Filter name="Mobile Gaming" />
        <Filter name="Console Gaming" />
      </div>
      <div className="overflow-y-scroll max-h-screen">
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold text-xl">Trending</h1>
          <TrendingArticle article={posts[8]} />
        </div>

        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold text-xl">Popular</h1>
          <ErrorBoundary FallbackComponent={ErrorComponent}>
            {posts?.map((post) => (
              <ExploreArticle key={post.title} article={post} />
            ))}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Explore;
