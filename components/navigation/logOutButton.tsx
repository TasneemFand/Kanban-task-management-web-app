"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { AiOutlineLogout } from "react-icons/ai";

export const LogOutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="pl-16 mr-16 rounded-se-3xl justify-start  gap-3 bg-purple_Dark hover:bg-purple_Light
       dark:hover:text-purple_Dark h-12 w-full text-textwhite rounded-br-3xl flex items-center "
    >
      <AiOutlineLogout size={24} className="mr-2" />

      <span className="font-bold text-sm/5">Log Out</span>
    </Button>
  );
};
