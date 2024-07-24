"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";

import api from "@/lib/api";
import { userProfile } from "../../../../types";

import { Button } from "@/components/ui/button";
import Profile from "@/components/ui/profile";

const getUser = async () => {
  return api.get<userProfile>("users/1").then((res) => res.data);
};

const ProfilePage: NextPage = () => {
  const [user, setUser] = useState<userProfile | undefined>(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser()
      .then((userData) => setUser(userData))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="h-full flex flex-col items-center mt-52 gap-3">
        <p>Loading...</p>
      </div>
    );

  if (user)
    return <Profile savedarticles={user.savedArticles} user={user.user} />;

  if (error)
    return (
      <div className="h-full flex flex-col items-center mt-52 gap-3">
        <p>Please login to view your profile</p>
        <Link href={"/auth/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    );
};

export default ProfilePage;
