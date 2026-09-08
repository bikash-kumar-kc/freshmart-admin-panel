"use client";
import { useAuthContext } from "@/src/providers/AuthContextProvider";
import { IProps } from "@/src/types/props.type";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "./protectedLayout";

const Layout = ({ children }: IProps) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }

    if (user && user.role !== "admin") router.push("/login");
  }, [user, isLoading, router]);

  if (!user || isLoading || user.role !== "admin") return <p>loading...</p>;
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;
