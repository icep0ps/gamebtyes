import * as React from 'react';
import { User, Gamepad } from 'lucide-react';

import Article from './article';
import { Button } from '../button';
import { IArticle } from '../../../../types';

type ITrendingArticleProps = { article: IArticle };

export default function TrendingArticle(props: ITrendingArticleProps) {
  const metadata = [
    { title: props.article.author, icon: <User size={15} /> },
    { title: 'Gaming', icon: <Gamepad size={15} /> },
  ];

  return (
    <Article article={props.article} className="h-56 flex gap-5 w-full justify-start">
      <Article.cover
        withShadow
        className="h-full flex justify-end flex-col p-3  gap-3 pb-8 relative"
      >
        <Button className="rounded-full text-sm self-start bottom-[-15px] right-5 absolute">
          Read article
        </Button>
        <Article.title className="text-sm font-bold line-clamp-2" />
        <div className="flex gap-3">
          {metadata.map((data) => (
            <li className="flex gap-2 font-bold text-xs">
              {data.icon} {data.title}
            </li>
          ))}
        </div>
        <Article.description className="text-xs" />
      </Article.cover>
    </Article>
  );
}
