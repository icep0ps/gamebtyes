"use client";

import { Button } from "./button";
import { IArticle, IUser, RedirectResponse } from "../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import ExploreArticle from "./article/exploreArticle";
import { useToast } from "./use-toast";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
  user: IUser;
  savedarticles: IArticle[];
};

export default function Profile(props: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const { username, email } = props.user;
  const { savedarticles } = props;

  const handleLogOut = async () => {
    return await api
      .post<RedirectResponse>("/auth/logout", null, { headers: {} })
      .then((res) => {
        const { msg, redirectURL } = res.data;

        toast({
          title: "Success",
          description: msg,
        });

        return router.push(redirectURL);
      });
  };

  return (
    <div className="h-full self-start">
      <div className="flex items-center gap-5">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div>
            <h3>{username}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button className="rounded-lg" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-base mb-2  mt-5 font-bold">Favorites</h3>
        {savedarticles.length ? (
          savedarticles.map((article) => (
            <ExploreArticle key={article.title} article={article} />
          ))
        ) : (
          <p>No Saved articles yet</p>
        )}
      </div>
    </div>
  );
}
