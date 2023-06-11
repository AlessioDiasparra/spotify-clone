import React from "react";

interface CompProps {
  children: React.ReactNode;
}

const Comp: React.FC<CompProps> = ({ children }) => {
  return <div>{children}</div>;
};
export default Comp;
