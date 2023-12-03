'use client';

import 'swiper/css';
import Slide from './Slide';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Article } from '@/libs/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

type Props = {
  post: Article;
};

const Post = (props: Props) => {
  const { title, body } = props.post;
  const paragraphs = body.match(/[^]{1,500}/g);
  console.log(paragraphs);

  return (
    <div className="min-h-[400px] rounded-3xl flex flex-col justify-between w-full gap-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="bg-white rounded-full h-12 w-12"></span>
          <span>Epic Games</span>
        </div>

        <span>Read article</span>
      </div>

      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        className="h-full w-full flex flex-col "
      >
        {paragraphs?.map((paragraphs, index) => {
          return (
            <SwiperSlide key={index} className="h-full w-full">
              <Slide title={title} body={paragraphs} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div>
        <span>Like: 1k </span>
        <span>Comments: 12.5k</span>
      </div>
    </div>
  );
};

export default Post;
