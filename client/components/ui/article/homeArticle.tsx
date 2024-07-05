import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Article from './article';
import { Button } from '../button';
import { IArticle } from '../../../../types';

type IHomeArticleProps = { article: IArticle };

function HomeArticleCover() {
  return (
    <Article.cover withShadow>
      <Button className="rounded-full text-sm self-start top-5 right-5 absolute">
        Read article
      </Button>
      <Article.title className="text-xl font-bold line-clamp-3" />
      <Article.description className="text-xs" />
    </Article.cover>
  );
}

export default function HomeArticle(props: IHomeArticleProps) {
  return (
    <Article
      article={props.article}
      className="min-h-[420px] rounded-3xl flex flex-col justify-between w-full gap-3 relative"
    >
      <Swiper
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        className="h-full w-full flex flex-col relative"
      >
        <SwiperSlide className="h-full w-full ">
          <HomeArticleCover />
        </SwiperSlide>
        <Article.content />
      </Swiper>

      {/* please make this more reusable */}
      <div className="flex gap-3 absolute bottom-[-0.80rem] z-20">
        <Button className="rounded-full text-sm">Save</Button>
        <Button className="rounded-full text-sm">Share</Button>
      </div>
    </Article>
  );
}
