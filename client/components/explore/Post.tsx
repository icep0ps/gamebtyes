import React from 'react';
import { Article } from '@/libs/types/types';
import Link from 'next/link';

type Props = {
  post: Article;
};

const Post = (props: Props) => {
  const { title, author, thumbnail, url } = props.post;
  const params = new URLSearchParams({
    externalink: url,
  });
  return (
    <Link href={`/posts/?${params}`}>
      <div className="flex flex-col gap-3 p-3 rounded-lg bg-zinc-900 w-48 h-56 relative items-center">
        <div
          id="post-imge"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
          className="bg-cover bg-center w-full h-2/3 rounded-lg"
        ></div>
        <div>
          <h3 className="text-sm line-clamp-3">{title}</h3>
          <p>{author}</p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
