"use client"
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

interface IProps {
  children: React.ReactNode;
}

const ToastContainerProvider = ({ children }: IProps) => {
  return (
    <div className="min-h-screen w-full max-w-7xl flex justify-center items-center bg-app-background text-app-foreground m-auto">
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
};

export default ToastContainerProvider;
