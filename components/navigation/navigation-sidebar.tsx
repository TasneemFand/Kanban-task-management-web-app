import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getBoards from "@/app/actions/getBoards";
import { Logo } from "./logo";
import { NavigationItem } from "./navigation-item";
import { NavigationAction } from "./navigation-action";
import InputToggle from "./InputToggle";
import { LogOutButton } from "./logOutButton";

export const NavigationSidebar = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const boards = await getBoards({ userId: currentUser.id });

  return (
    <div
      className=" min-h-full
      dark:bg-dark_Gray border-r dark:border-border_mediumGray
      space-y-4 flex flex-col items-start w-full py-3
      bg-white border-border_lightBlue 
      "
    >
      <Logo />
      <p className={`pl-8 text-textgray font-bold text-xs`}>
        ALL BOARDS ( {boards?.length} )
      </p>
      <NavigationAction/>
        
      <ScrollArea className="flex-1 w-full">
        <div className="flex items-start flex-col mt-5 font-bold text-sm/5 text-textgray">
          {boards?.map((board) => (
            <NavigationItem key={board.id} id={board.id} name={board.name} />
          ))}
        </div>
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 w-full">
        <InputToggle />
        <LogOutButton/>
      </div>
    </div>
  );
};
