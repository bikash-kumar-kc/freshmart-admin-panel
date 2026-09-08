"use client";
import { useAuthContext } from "@/src/providers/AuthContextProvider";
import { IProps } from "@/src/types/props.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: IProps) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading && user.role === "admin") {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>loading...</p>;
  return <>{children}</>;
};

export default Layout;
