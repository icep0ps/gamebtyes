'use client';

import React, { useEffect, useMemo, useState } from 'react';

import Post from '../Post/Post';
import { useErrorBoundary } from 'react-error-boundary';

import { Article } from '@/libs/types/types';
import useGlobalStore from '@/libs/stores/global';

async function getPosts(filter?: URLSearchParams) {
  if (filter) {
    const filters = filter.getAll('filters');

    const params = new URLSearchParams({
      articleType: 'news',
      sortBy: 'relevance',
    });

    filters.forEach((filter) => params.append('searchTerm', filter));

    const res = await fetch(`http://localhost:3001/platform/?${params}`);

    if (!res.ok) throw new Error('Failed to get filtered articles');
    return res.json();
  } else {
    const res = await fetch(`http://localhost:3001/latest/`);

    if (!res.ok) throw new Error('Failed to get latest articles');
    return res.json();
  }
}

const Posts = () => {
  const { filters } = useGlobalStore();
  const [posts, setPosts] = useState([]);
  const { showBoundary } = useErrorBoundary();

  const filtersParams = useMemo(
    () => (filters.length > 0 ? new URLSearchParams() : undefined),
    [filters.length]
  );

  filters.forEach((filter) => filtersParams?.append('filters', filter));

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts(filtersParams);
        setPosts(posts);
      } catch (error) {
        showBoundary(error);
      }
    })();
  }, [filters, filtersParams, showBoundary]);

  return (
    <div className="overflow-y-scroll h-full flex flex-col gap-5">
      {posts?.map((post: Article) => (
        <Post post={post} key={post.title} />
      ))}
    </div>
  );
};

export default Posts;
