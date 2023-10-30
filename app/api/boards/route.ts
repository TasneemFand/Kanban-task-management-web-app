import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { name, columns } = body;


  const board = await db.board.create({
    data: {
      name,
      userId: currentUser.id,
    },
  });

  await db.column.createMany({
    data: columns.map((col: string) => ({
        name: col,
        boardId: board.id,
    }))
  })

  return NextResponse.json(board);
}
