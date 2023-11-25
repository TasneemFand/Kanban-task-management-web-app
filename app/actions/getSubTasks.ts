import { db } from "@/lib/db";
import { safeSubTasks } from "@/types";

export interface Props {
  taskId?: string;
}
export default async function getSubTasks(params: Props) {
  try {
    if (!params.taskId) {
      return null;
    }

    const subtasks = await db.subTask.findMany({
      where: {
        taskId: params.taskId
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const safeSubtasks = subtasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));
    return safeSubtasks as unknown as safeSubTasks[];
  } catch (error: any) {
    throw new Error(error);
  }
}
