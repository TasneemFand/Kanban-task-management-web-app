import getCurrentUser from "@/app/actions/getCurrentUser";
import { BoardHeader } from "@/components/navigation/BoardHeader";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/sign-in");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      userId: currentUser.id,
    },
  });

  if (!board) {
    return redirect("/");
  }

  return (
    <>
      <header className="flex border-b z-20 sticky top-0 bg-white border-border_lightBlue dark:bg-dark_Gray dark:border-border_mediumGray">
        <BoardHeader boardName={board.name} />
      </header>
      <main>{children}</main>
    </>
  );
};

export default BoardIdLayout;
