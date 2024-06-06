"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const PrivateLayout = ({ children }) => {
  const { currentUser } = useSelector((user) => user.user);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      router.replace("/login");
    }
  }, [currentUser]);

  return <div>{currentUser && children}</div>;
};

export default PrivateLayout;
