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
import Link from 'next/link';

type Props = {
  post: Article;
};

const Post = (props: Props) => {
  const { title, content, author, url } = props.post;
  const paragraphs = content.match(/[^]{1,300}/g);

  return (
    <div className="min-h-[400px] rounded-3xl flex flex-col justify-between w-full gap-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="bg-white rounded-full h-12 w-12"></span>
          <span>{author}</span>
        </div>

        <span>
          <Link href={url}>Read article</Link>
        </span>
      </div>

      <Swiper
        slidesPerView={1}
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
