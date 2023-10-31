import Image from "next/image";

import getBoards from "@/app/actions/getBoards";
import { PopoverMenu } from "./PopOverMenu";
import { HeaderActions } from "./HeaderActions";
import getColumns from "@/app/actions/getColumns";
import getCurrentUser from "@/app/actions/getCurrentUser";

type TProps = {
  boardName: string;
};

export const BoardHeader = async ({ boardName }: TProps) => {
  const currentUser = await getCurrentUser();
  const boards = await getBoards({ userId: currentUser?.id });
  const currentBoard = boards?.filter((board) => board.name === boardName)?.[0];
  const cols = await getColumns({ boardId: currentBoard?.id });

  return (
    <div className="flex items-center p-6 gap-4 w-full max-sm:py-6 max-sm:px-2 max-sm:gap-2 max-[360px]:flex-col">
      <Image
        src={"/assets/logo-mobile.svg"}
        className="hidden max-md:flex"
        alt="logo-mobile"
        width={32}
        height={32}
      />
      <div className="md:hidden flex">
        <PopoverMenu boardName={boardName} boards={boards} />
      </div>
      <p className=" whitespace-nowrap  max-w-[20rem] md:flex hidden">
        <span className="text-2xl font-bold text-textdark dark:text-white overflow-hidden text-ellipsis">
          {boardName}
        </span>
      </p>
      <div className="ml-auto flex items-center max-[360px]:ml-0">
        <HeaderActions cols={cols} board={currentBoard} />
      </div>
    </div>
  );
};
