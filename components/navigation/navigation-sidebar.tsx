import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Logo } from "./logo";
import { ListBoards } from "./listBoards";
import getBoards from "@/app/actions/getBoards";

export const NavigationSidebar = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/sign-in");
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
      <ListBoards boards={boards}/>
    </div>
  );
};
