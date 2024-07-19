"use client";

import api from "@/lib/api";
import { AxiosError } from "axios";
import { createContext, ReactNode, useLayoutEffect, useState } from "react";

const authContext = createContext(null);

const useAuthContext = () => {
  if (!authContext) throw new Error("Auth context is not set");
  return authContext;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<null | string | undefined>();

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization;
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