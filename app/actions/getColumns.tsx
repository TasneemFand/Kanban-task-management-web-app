import { db } from "@/lib/db";
import { SafeCols } from "@/types";

export interface Props {
  boardId?: string;
}
export default async function getColumns(params: Props) {
  try {
    if (!params.boardId) {
      return null;
    }

    const cols = await db.column.findMany({
      where: {
        boardId: params.boardId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeCols = cols.map((col) => ({
      ...col,
      createdAt: col.createdAt.toISOString(),
      updatedAt: col.updatedAt.toISOString(),
    }));
    return safeCols as unknown as SafeCols[];
  } catch (error: any) {
    throw new Error(error);
  }
}
