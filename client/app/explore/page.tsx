'use client';

import Error from '@/components/common/Error';
import Post from '@/components/explore/Post';
import { Article } from '@/libs/types/types';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const getPosts = async () => {
  const res = await fetch('http://localhost:3001/explore');
  return res.json();
};

const Explore = () => {
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  });

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Explore</h1>
        <input type="text" value="search" className="bg-zinc-800 p-2 w-full rounded-xl" />
      </div>
      <div className="flex flex-wrap justify-between gap-4 overflow-y-scroll">
        <ErrorBoundary FallbackComponent={Error}>
          {posts.map((post) => (
            <Post key={post.title} post={post} />
          ))}
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Explore;
