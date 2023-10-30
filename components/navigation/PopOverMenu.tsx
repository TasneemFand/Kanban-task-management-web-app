"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { ListBoards } from "./listBoards";
import { SafeBoard } from "@/types";
import Image from "next/image";

type TProps = {
  boardName: string;
  boards: SafeBoard[] | null;
};
export const PopoverMenu = ({ boardName, boards }: TProps) => {
  const [open, setOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(boardName);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="text-2xl font-bold text-textdark dark:text-white bg-transparent hover:bg-transparent">
          <span className="whitespace-nowrap  max-w-[15rem] overflow-hidden text-ellipsis">
            {selectedBoard}
          </span>
          <Image
            className="mt-1 ml-2"
            src={
              open
                ? "/assets/icon-chevron-up.svg"
                : "/assets/icon-chevron-down.svg"
            }
            width={8}
            height={5.59}
            alt=""
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-md" side="bottom" align="start">
        <div className="p-6 pl-0 pr-0 min-h-[550px] flex rounded-md bg-white border-r border-border_lightBlue dark:bg-dark_Gray dark:border-border_mediumGray  ">
          <div className="flex w-full">
            <ListBoards boards={boards} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
