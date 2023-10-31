"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SafeBoard, SafeCols } from "@/types";

type TProps = {
    cols: SafeCols[] | null;
    board: SafeBoard | null | undefined;
}
export const HeaderActions = ({cols, board}: TProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <Button
        onClick={() => onOpen("createNewTask", {cols})}
        className="bg-purple_Dark hidden  md:flex text-textwhite w-40 h-12 rounded-3xl mr-1 text-sm font-bold hover:bg-purple_Light "
      >
        + Add new Task
      </Button>
      <Button
        onClick={() => onOpen("createNewTask", {cols})}
        className="md:hidden flex place-content-center bg-purple_Dark text-textwhite w-12 h-8 rounded-3xl mr-2  text-md font-bold hover:bg-purple_Light "
      >
        +
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent text-textgray  border-none p-0 focus-visible:ring-0">
            <HiDotsVertical size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46 p-4 bg-white dark:bg-almost_Dark">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onOpen("editBoard", {cols, board})}>
              <AiOutlineEdit className="mr-2 h-4 w-4 text-textgray" />
              <span className="text-textgray">Edit Board</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen("deleteBoard")}>
              <AiOutlineDelete className="mr-2 h-4 w-4 text-_red" />
              <span className="text-_red">Delete Board</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
