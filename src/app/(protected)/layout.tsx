"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "./protectedLayout";
import { IProps } from "@/types/props.type";
import { useAuthContext } from "@/providers/AuthContextProvider";

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
  return (
    <div className="w-full bg-app-background text-app-foreground ">
      <ProtectedLayout>{children}</ProtectedLayout>
    </div>
  );
};

export default Layout;
