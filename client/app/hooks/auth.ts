"use client";

import api from "@/lib/api";
import { ReactNode, useLayoutEffect, useState } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<null | string | undefined>();

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use((response) => {
      const authorization = response.headers["authorization"];
      authorization ? setToken(authorization.split(" ")[1]) : setToken(null);
      return response;
    });

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  });

  return children;
};

export default AuthProvider;
