'use client';

import React, { useEffect, useState } from 'react';

import { Article } from '@/libs/types/types';
import { ErrorBoundary } from 'react-error-boundary';

import Post from '@/components/explore/Post';
import ErrorComponent from '@/components/common/Error';

const getPosts = async () => {
  const res = await fetch('http://localhost:3001/explore');
  return res.json();
};

const Explore = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error('Failed to load post: ' + error);
      }
    })();
  }, []);

  if (isLoading) return <div className="h-full">Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Explore</h1>
        <input type="text" value="search" className="bg-zinc-800 p-2 w-full rounded-xl" />
      </div>
      <div className="flex flex-wrap justify-between gap-4 overflow-y-scroll">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          {posts.map((post) => (
            <Post key={post.title} post={post} />
          ))}
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Explore;
