import React from 'react';
import { NextPage } from 'next';

import Post from '@/components/explore/Post';
import { Article } from '@/libs/types/types';

const getProfile = async () => {};

type Props = {};

const Profile: NextPage<Props> = (props) => {
  const posts: Article[] = [];

  return (
    <div className="h-full">
      <h1 className="text-2xl mb-5">Your Profile</h1>

      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-sky-600" />
        <div>
          <h3>Username</h3>
          <p>username@gmail.com</p>
        </div>
      </div>

      <h3 className="text-xl my-5">Saved articles</h3>
      <div id="saves">
        {posts?.map((post) => (
          <Post key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
