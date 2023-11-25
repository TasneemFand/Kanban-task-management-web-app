"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SafeCols, safeSubTasks, safeTasks } from "@/types";
import { Popover } from "@radix-ui/react-popover";

type TProps = {
  subTasks: safeSubTasks[] | null;
  task: safeTasks | null;
  cols: SafeCols[] | null;
};

export const TaskCardRender = ({subTasks, task, cols}: TProps) => {
  const { onOpen } = useModal();
  const completedTasks = subTasks?.filter((task) => task.isCompleted);

  return (
    <Card
      onClick={() => onOpen("viewTask", { subTasks, task, cols  })}
      className="w-[300px] cursor-pointer dark:bg-dark_Gray bg-textwhite p-4"
    >
      <CardHeader>
        <CardTitle className="dark:text-white transition duration-1000 dark:hover:text-purple_Dark hover:text-purple_Light  text-textdark overflow-hidden text-ellipsis max-w-[12rem] whitespace-nowrap">
          {task?.title}
        </CardTitle>
        <CardDescription className="dark:text-white text-sm text-textdark overflow-hidden text-ellipsis max-w-[12rem] whitespace-nowrap">
          {task?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-textgray">
          {completedTasks?.length} of {subTasks?.length}
        </p>
      </CardContent>
    </Card>
  );
};
