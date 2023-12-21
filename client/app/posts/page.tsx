import { NextPage } from 'next';
import { Article } from '@/libs/types/types';
import Post from '@/components/common/Post/Post';

const getPost = async (link: string) => {
  const searchParams = new URLSearchParams({
    sitelink: link,
  });
  const res = await fetch('http://localhost:3001/post/?' + searchParams);
  return res.json();
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const PostPage: NextPage<Props> = async (props) => {
  const { searchParams } = props;

  let post: Article | null = null;
  const link = searchParams.externalink as string | null;

  if (link) {
    post = await getPost(link);
    return (
      <div className="h-full flex items-center ">
        {post && (
          <div className="overflow-y-scroll h-full flex flex-col gap-5 items-center justify-center">
            <Post post={post} />
          </div>
        )}
      </div>
    );
  }

  return <div>no external link provided</div>;
};

export default PostPage;
