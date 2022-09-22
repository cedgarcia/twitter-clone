import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
    const router = useRouter()
  return (
    <div>
      <h1>Auth</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
