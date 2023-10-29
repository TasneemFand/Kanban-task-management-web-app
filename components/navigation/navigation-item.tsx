"use client";

import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NavigationItemProps {
  id: string;
  name: string;
}

export const NavigationItem = ({ id, name }: NavigationItemProps) => {
  const params = useParams();
  const { resolvedTheme } = useTheme();

  return (
    <Link
      href={`/boards/${id}`}
      className={`
                  ${
                    params?.boardId === id
                      ? "bg-purple_Dark text-textwhite"
                      : ""
                  }
                  pl-8 w-full font-bold
                  ${
                    resolvedTheme === "light"
                      ? "hover:text-purple_Dark hover:bg-purple_superLight"
                      : "hover:text-purple_Dark hover:bg-white"
                  } rounded-r-3xl rounded-br-3xl flex items-center gap-4 h-12`}
    >
      <Image src="/assets/icon-board.svg" height="16" alt="" width="16" />
      <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-: 12.5rem">
        {name}
      </span>
    </Link>
  );
};
