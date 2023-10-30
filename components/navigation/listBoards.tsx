'use client'
import { ScrollArea } from "../ui/scroll-area";
import InputToggle from "./InputToggle";
import { LogOutButton } from "./logOutButton";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { SafeBoard } from "@/types";


type TProps = {
    boards: SafeBoard[] | null;
}
export const ListBoards =  ({boards}: TProps) => {

 
  return (
    <div className="flex flex-col w-full h-full">
      <p className={`pl-8 text-textgray font-bold text-xs`}>
        ALL BOARDS ( {boards?.length} )
      </p>
      <NavigationAction />

      <ScrollArea className="flex-1 w-full">
        <div className="flex items-start flex-col mt-5 font-bold text-sm/5 text-textgray">
          {boards?.map((board) => (
            <NavigationItem key={board.id} id={board.id} name={board.name} />
          ))}
        </div>
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 w-full">
        <InputToggle />
        <LogOutButton />
      </div>
    </div>
  );
};
