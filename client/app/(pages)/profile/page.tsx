import React from "react";
import { NextPage } from "next";
import { cookies } from "next/headers";

import api from "@/lib/api";
import { IArticle, IUser } from "../../../../types";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ExploreArticle from "@/components/ui/article/exploreArticle";
import { AxiosError } from "axios";
import Link from "next/link";

type Props = unknown;

const cookie = cookies().get("token");

const getPosts = async () => {
  return api
    .get<IArticle[]>("users/b2c7ccf6-24fd-4305-998b-0da081b8a241/saves", {
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    })
    .then((data) => data.data);
};

const getUser = async () => {
  return api
    .get<IUser>("users/1", {
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    })
    .then((res) => res.data);
};

const Profile: NextPage<Props> = async (props) => {
  try {
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
            posts.map((post) => (
              <ExploreArticle key={post.title} article={post} />
            ))
          ) : (
            <p>No Saved articles yet</p>
          )}
        </div>
      </div>
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response)
      if (error.response.status === 403) {
        return (
          <div className="h-full flex flex-col items-center mt-52 gap-3">
            <p>Please login to view your profile</p>
            <Link href={"/auth/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        );
      }
  }
};

export default Profile;
