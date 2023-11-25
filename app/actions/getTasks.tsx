import { db } from "@/lib/db";
import { safeTasks } from "@/types";

export interface Props {
  colId?: string;
}
export default async function getTasksbyCol(params: Props) {
  try {
    if (!params.colId) {
      return null;
    }

    const tasks = await db.task.findMany({
      where: {
        columnId: params.colId,
      },
      include: {
        column: {
          include: {
            board: true
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const safeTasks = tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));
    return safeTasks as unknown as safeTasks[];
  } catch (error: any) {
    throw new Error(error);
  }
}
