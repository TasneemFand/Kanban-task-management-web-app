import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(request.url);

  const boardId = searchParams.get("boardId");

  if (!boardId) {
    return new NextResponse("board ID missing", { status: 400 });
  }

  const body = await request.json();
  const { title, status, subtasks, description } = body;

  const col = await db.column.findFirst({
    where: {
      id: status,
    },
  });

  const board = await db.board.update({
    where: {
      id: boardId,
      userId: currentUser.id,
    },
    data: {
      columns: {
        update: {
          where: {
            id: status,
          },
          data: {
            tasks: {
              create: {
                title,
                status: col?.name!,
                description,
                subtasks: {
                  createMany: {
                    data: subtasks.map((sub: any) => {
                      return {
                        title: sub.value,
                        isCompleted: false,
                      };
                    }),
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return NextResponse.json(board);
}
