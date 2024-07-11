import { NextPage } from 'next';

import { IArticle, IUser } from '../../../../types';
import FullArticle from '@/components/ui/article/fullArticle';
import api from '@/utils/api';

type Props = { params: { id: string } };

const getPost = async (id: string) => {
  return api.get<IArticle>('articles/' + id).then((res) => res.data);
};

const PostPage: NextPage<Props> = async (props) => {
  const id = props.params.id;
  const article = await getPost(id);

  return (
    <>
      {article && (
        <div className="overflow-y-scroll h-full flex flex-col gap-5 items-center justify-center">
          <FullArticle article={article} />
        </div>
      )}
    </>
  );
};

export default PostPage;
