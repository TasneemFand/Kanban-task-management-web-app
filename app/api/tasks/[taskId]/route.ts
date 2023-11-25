import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.taskId) {
      return new NextResponse("task ID missing", { status: 400 });
    }
    const task = await db.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[BOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.taskId) {
      return new NextResponse("task ID missing", { status: 400 });
    }
    const { status, subtasks } = await req.json();

    const col = await db.column.findFirst({
      where: {
        id: status
      },
    });

    const Task = await db.task.update({
      where: {
        id: params.taskId,
      },
      include: {
        subtasks: true,
      },
      data: {
        status: col?.name,
        columnId: col?.id,
      },
    });

    subtasks?.forEach(async (task) => {
      await db.subTask.update({
        where: {
          id: task.id,
        },
        data: {
          ...task,
          isCompleted: task.isCompleted,
        },
      });
    });
    return NextResponse.json(Task);
  } catch (error) {
    console.log("[TASK_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
