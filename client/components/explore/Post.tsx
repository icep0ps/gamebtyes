import React from 'react';
import { Article } from '@/libs/types/types';

type Props = {
  post: Article;
};

const Post = (props: Props) => {
  const { title, author, thumbnail } = props.post;
  return (
    <div className="flex flex-col justify-between p-3 rounded-lg bg-zinc-900 w-48 h-56 relative items-center">
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
  );
};

export default Post;
