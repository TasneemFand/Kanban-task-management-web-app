"use client";

import { useModal } from "@/hooks/use-modal-store";
import { SafeBoard, SafeCols } from "@/types";

type TProps = {
  board: SafeBoard | null;
  cols: SafeCols[] | null;
};
export const NewColCard = ({ board, cols }: TProps) => {
  const { onOpen } = useModal();
  return (
    <div
      className={`flex dark:bg-[linear-gradient(180deg,_#2b2c3740_0%,_#2b2c3720_100%)]
        bg-[linear-gradient(180deg,_#E9EFFA_0%,_#e9effa80_100%)]
        rounded-lg  items-center min-h-[80vh] mt-9 min-w-[400px] cursor-pointer justify-center`}
      // onClick={() => onOpen("editBoard", { board, cols })}
    >
      <p className="font-bold text-2xl text-textgray">+ New Column</p>
    </div>
  );
};
