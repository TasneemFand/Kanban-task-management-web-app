import { db } from "@/lib/db";

export interface Props {
    userId?: string;
}
export default async function getBoards(params: Props) {
  try {
    if (!params.userId) {
      return null;
    }

    const boards = await db.board.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeBoards = boards.map((board) => ({
      ...board,
      createdAt: board.createdAt.toISOString(),
      updatedAt: board.updatedAt.toISOString(),
    }));
    return safeBoards;
  } catch (error: any) {
    throw new Error(error);
  }
}
