import { NextPage } from 'next';
import { Article } from '@/libs/types/types';
import { useSearchParams } from 'next/navigation';
import Post from '@/components/common/Post/Post';

const getPost = async (link: string) => {
  const res = await fetch(link);
  return res.json();
};

const PostPage: NextPage = async () => {
  let post: Article | null = null;
  const searchParams = useSearchParams();
  const link = searchParams.get('externalink');

  if (link) {
    post = await getPost(link);
    return <div>{post && <Post post={post} />}</div>;
  }

  return <div>no external link provided</div>;
};

export default PostPage;
