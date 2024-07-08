'use client';

import * as React from 'react';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { cn } from '@/lib/utils';
import Slide from '@/components/ui/slide';
import { IArticle } from '../../../../types';

type IArticleProps = React.PropsWithChildren &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    article: IArticle;
  };

type ICoverProps = React.PropsWithChildren & {
  withShadow?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ArticleContext = React.createContext<IArticle | undefined>(undefined);

export function useArticleContext() {
  const context = React.useContext(ArticleContext);
  if (!context) throw new Error('No post context found');
  return context;
}

export default function Article(props: IArticleProps) {
  return (
    <ArticleContext.Provider value={props.article}>
      <article {...props}>{props.children}</article>
    </ArticleContext.Provider>
  );
}

Article.cover = function cover(props: ICoverProps) {
  const { thumbnail } = useArticleContext();
  return (
    <div
      style={{
        backgroundImage: `url(${thumbnail})`,
        boxShadow: props.withShadow
          ? '-3px -125px 78px 13px rgba(0,0,0,1) inset'
          : undefined,
      }}
      id="thumbnail"
      className={cn('bg-cover bg-center bg-no-repeat rounded-lg', props.className)}
    >
      {props.children}
    </div>
  );
};

Article.title = function (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  const { title } = useArticleContext();
  return <h1 {...props}>{title}</h1>;
};

Article.description = function (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  const { description } = useArticleContext();
  return <p {...props}>{description}</p>;
};

Article.categories = function (props: React.PropsWithChildren) {
  return;
};

Article.author = function author(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  const { author } = useArticleContext();
  return <p {...props}>{author}</p>;
};

Article.content = function content() {
  const { title, content } = useArticleContext();
  const paragraphs = content.match(/[^]{1,300}/g);

  if (paragraphs)
    return paragraphs.map((paragraph, index) => (
      <SwiperSlide key={index} className="h-full w-full">
        <Slide title={title} body={paragraph} />
      </SwiperSlide>
    ));

  return null;
};

Article.button = function (props: React.PropsWithChildren) {};
