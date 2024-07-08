import axios from 'axios';
import React from 'react';
import { NextPage } from 'next';

import { IArticle } from '../../../types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ExploreArticle from '@/components/ui/article/exploreArticle';

type Props = {};

async function getPosts() {
  return axios.get<IArticle[]>('http://localhost:3001/latest').then((data) => data.data);
}

const Profile: NextPage<Props> = async (props) => {
  const posts = await getPosts();

  return (
    <div className="h-full">
      <h1 className="text-2xl mb-5">Profile</h1>

      <div className="flex items-center gap-5">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div>
            <h3>Tapiwa</h3>
            <p className="text-sm text-muted-foreground">tapiwa@gmail.com</p>
          </div>

          <Button className="rounded-full">Edit Profile</Button>
        </div>
      </div>

      <h3 className="text-base mb-2  mt-5 font-bold">Favorites</h3>
      <div className="flex flex-col gap-4">
        {posts ? (
          posts.map((post) => <ExploreArticle key={post.title} article={post} />)
        ) : (
          <p>No Saved articles yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
