import { redirect } from "next/navigation";

import { db } from "@/lib/db";

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
};

const BoardIdPage = async ({
  params
}: BoardIdPageProps) => {
	<div>
		Board
	</div>
}
 
export default BoardIdPage;