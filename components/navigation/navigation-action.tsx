"use client";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <button
      className={` pl-8 mr-3 text-purple_Dark rounded-r-3xl gap-4 h-12 w-full hover:text-textwhite hover:bg-purple_Dark rounded-br-3xl flex items-center`}
      onClick={() => onOpen("createNewBoard")}
    >
      <Image
        className="filter_purple"
        src="/assets/icon-board.svg"
        height="16"
        alt=""
        width="16"
      />
      + Create New Board
    </button>
  );
};
