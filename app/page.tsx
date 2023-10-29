import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import getCurrentUser from "./actions/getCurrentUser";
import { InitialModal } from "@/components/modals/InitialModal";
import ClientOnly from "@/components/ClientOnly";

const SetupPage = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    const board = await db.board.findFirst({
      where: {
        userId: currentUser.id,
      },
    });
    if (!board) {
      return (
        <ClientOnly>
          <InitialModal />
        </ClientOnly>
      );
    }
    return redirect(`/boards/${board.id}`);
  }

  return redirect("/sign-in");
};

export default SetupPage;
