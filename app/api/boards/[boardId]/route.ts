import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getColumns from "@/app/actions/getColumns";
import { isEmpty } from "lodash";

export async function DELETE(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.boardId) {
      return new NextResponse("board ID missing", { status: 400 });
    }
    const board = await db.board.delete({
      where: {
        id: params.boardId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.log("[BOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.boardId) {
      return new NextResponse("board ID missing", { status: 400 });
    }
    const { name, columns } = await req.json();

    const cols = await getColumns({ boardId: params.boardId });

    const comparedCols = cols?.map((col) => ({
      id: col.id,
      name: col.name,
    }));

    const createdCols = columns.filter((col: { id: string; }) => {
      return !comparedCols?.some((col2) => {
        return col.id === col2.id;
      });
    });


    const deletedCols = comparedCols?.filter((col) => {
      return !columns?.some((col2: { id: string; }) => {
        return col.id === col2.id;
      });
    });

    const updatedCols = columns.filter((col: { id: any; }) => {
      return !createdCols?.some((col2: { id: any; }) => {
        return col.id === col2.id;
      });
    });


    if (!isEmpty(createdCols)) {
      await db.board.update({
        where: {
          id: params.boardId,
          userId: currentUser.id,
        },
        data: {
          name,
          columns: {
            createMany: {
              data: createdCols.map((col: any) => ({
                name: col.name,
              })),
            },
          },
        },
      });
    }

    deletedCols?.forEach(async (col) => {
      await db.column.delete({
        where: {
          id: col.id,
        },
      });
    });

    updatedCols?.forEach(async (col: { id: any; name: any; }) => {
      await db.column.update({
        where: {
          id: col.id,
        },
        data: {
          name: col.name,
        },
      });
    });
    
    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[BOARD_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
