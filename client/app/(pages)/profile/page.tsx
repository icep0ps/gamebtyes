import React from 'react';
import { NextPage } from 'next';

import api from '@/utils/api';
import { IArticle, IUser } from '../../../../types';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ExploreArticle from '@/components/ui/article/exploreArticle';

type Props = unknown;

const getPosts = async () => {
  return api.get<IArticle[]>('users/1/saves').then((data) => data.data);
};

const getUser = async () => api.get<IUser>('users/1').then((res) => res.data);

const Profile: NextPage<Props> = async (props) => {
  const user = await getUser();
  const posts = await getPosts();

  return (
    <div className="h-full self-start">
      <div className="flex items-center gap-5">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div>
            <h3>{user.username}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-lg">Edit Profile</Button>
            <Button className="rounded-lg">Logout</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-base mb-2  mt-5 font-bold">Favorites</h3>
        {posts.length ? (
          posts.map((post) => <ExploreArticle key={post.title} article={post} />)
        ) : (
          <p>No Saved articles yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
