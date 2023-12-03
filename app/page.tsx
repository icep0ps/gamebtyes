import axios from 'axios';

import { Article } from '@/libs/types/types';
import Post from '@/components/common/Post/Post';
import Filter from '@/components/common/Filter/Filter';
import Navigation from '@/components/common/navigation/Navigation';
import summarize from '@/utils/summarize';

const options = {
  method: 'GET',
  url: 'http://www.gamespot.com/api/articles/',
  params: {
    limit: '10',
    format: 'json',
    api_key: process.env.NEWS_API_KEY as string,
  },
};

async function getPosts() {
  return axios
    .request(options)
    .then((response) => {
      return Promise.all(
        response.data.results.map(async (article: Article) => {
          return { ...article, body: await summarize(article.body) };
        })
      );
    })

    .catch((error) => {
      console.error('Error finishing: ' + error);
    });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col gap-10 h-full relative">
      <div className="flex gap-5">
        <Filter name="Latest" />
        <Filter name="PC Gaming" />
        <Filter name="Mobile Gaming" />
        <Filter name="Console Gaming" />
      </div>

      <div className="overflow-y-scroll h-full flex flex-col gap-5">
        {posts?.map((post: Article) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

      <Navigation />
    </main>
  );
}
