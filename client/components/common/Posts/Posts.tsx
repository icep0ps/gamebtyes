'use client';

import React, { useEffect, useState } from 'react';

import Post from '../Post/Post';
import useGlobalStore from '@/libs/stores/global';
import { Article, Filter } from '@/libs/types/types';

async function getPosts(filter?: Filter) {
  const controller = new AbortController();
  const options = {
    signal: controller.signal,
  };

  if (filter) {
    const params = new URLSearchParams({
      searchTerm: filter,
      articleType: 'news',
      sortBy: 'relevance',
    });
    const res = await fetch(`http://localhost:3001/platform/?${params}`, options);
    return res.json();
  } else {
    const res = await fetch(`http://localhost:3001/latest/`, options);
    return res.json();
  }
}

const Posts = () => {
  const { filters } = useGlobalStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    filters.length
      ? Promise.all(filters.map((filter) => getPosts(filter))).then((posts) => {
          setPosts(posts.map((post) => post)[0]);
        })
      : getPosts().then((post) => setPosts(post));
  }, [filters]);

  console.log(posts);

  return (
    <div className="overflow-y-scroll h-full flex flex-col gap-5">
      {posts?.map((post: Article) => (
        <Post post={post} key={post.title} />
      ))}
    </div>
  );
};

export default Posts;
