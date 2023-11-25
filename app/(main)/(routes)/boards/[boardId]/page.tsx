import { redirect } from "next/navigation";

import getColumns from "@/app/actions/getColumns";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ColCard } from "@/components/ColCard";
import { NewColCard } from "@/components/NewCol";
import getCurrentBoard from "@/app/actions/getCurrentBoard";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/sign-in");
  }
  const cols = await getColumns({ boardId: params.boardId });
  const board = await getCurrentBoard({ boardId: params.boardId });

  return (
    <section className="flex overflow-auto dark:bg-almost_Dark bg-[#f4f7fd] p-6 gap-4 h-full">
      {cols?.map((col) => (
        <ColCard key={col.id} column={col} />
      ))}
      <NewColCard cols={cols} board={board} />
    </section>
  );
};

export default BoardIdPage;
