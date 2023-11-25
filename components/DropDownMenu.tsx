"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type TProps = {
  children: React.ReactNode;
  triggerButton: React.ReactNode;
};
export const DropDownMenu = ({ children, triggerButton }: TProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerButton}
        {/* <Button className="bg-transparent hover:bg-transparent text-textgray  border-none p-0 focus-visible:ring-0">
          <HiDotsVertical size={24} />
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-46 p-4 bg-white dark:bg-almost_Dark">
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
