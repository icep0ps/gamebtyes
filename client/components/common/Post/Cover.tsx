import React from 'react';
import { Article } from '@/libs/types/types';

type Props = {
  post: Article;
};

const Cover = (props: Props) => {
  const { title, description, thumbnail } = props.post;
  return (
    <div
      style={{
        backgroundImage: `url(${thumbnail})`,
        boxShadow: '-3px -125px 78px 13px rgba(0,0,0,1) inset',
      }}
      id="thumbnail"
      className="bg-cover bg-center bg-no-repeat h-full flex justify-end flex-col  p-3 rounded-lg gap-2"
    >
      <h1 className="text-xl font-bold line-clamp-3">{title}</h1>
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default Cover;
