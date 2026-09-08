import { IProps } from "@/src/types/props.type";
import React from "react";

const ProtectedLayout = ({ children }: IProps) => {
  return <div>{children}</div>;
};

export default ProtectedLayout;
