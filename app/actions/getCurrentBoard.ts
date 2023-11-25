import { db } from "@/lib/db";
import { SafeBoard } from "@/types";
import { Board } from "@prisma/client";

export interface Props {
  boardId?: string;
}
export default async function getCurrentBoard(params: Props) {
  try {
    if (!params.boardId) {
      return null;
    }

    const board = await db.board.findFirst({
      where: {
        id: params.boardId,
      },
    });

    return {
      ...board,
      createdAt: board?.createdAt.toISOString(),
      updatedAt: board?.updatedAt.toISOString(),
    } as SafeBoard;
  } catch (error: any) {
    throw new Error(error);
  }
}
