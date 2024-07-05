import * as React from 'react';

import Article from './article';
import { IArticle } from '../../../../types';

type IExploreArticleProps = { article: IArticle };

export default function ExploreArticle(props: IExploreArticleProps) {
  return (
    <Article article={props.article} className="max-h-32 flex gap-5 w-full justify-start">
      <Article.cover className="min-w-[80px]  h-10/12" />
      <div>
        <Article.title className="font-bold text-sm line-clamp-2 mb-2 text-primary" />
        <Article.description className="text-xs mb-2 line-clamp-2" />
        <Article.author className="text-xs font-bold " />
      </div>
    </Article>
  );
}
