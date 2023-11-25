import { safeTasks } from "@/types";
import getSubTasks from "@/app/actions/getSubTasks";
import { TaskCardRender } from "./TaskCardRender";
import getColumns from "@/app/actions/getColumns";

type TProps = {
  task: safeTasks | null;
  boardId: string | undefined
};
export const TaskCard = async ({ task, boardId }: TProps) => {
  const subTasks = await getSubTasks({
    taskId: task?.id,
  });

  const cols = await getColumns({boardId:  boardId});

  return <TaskCardRender subTasks={subTasks} task={task} cols={cols} />;
};
