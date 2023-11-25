import { SafeCols } from "@/types";
import getTasksbyCol from "@/app/actions/getTasks";
import { TaskCard } from "./TaskCard";

type TProps = {
  column: SafeCols | null;
};
export const ColCard = async ({ column }: TProps) => {
  const tasks = await getTasksbyCol({
    colId: column?.id,
  });


  return (
    <div
      className={`flex
    } flex-col items-start gap-3`}
    >
      <h3 className="font-bold tracking-wider z-10 uppercase text-textdark dark:text-textwhite">
        {column?.name} ({tasks?.length})
      </h3>
      <div
        className={`flex flex-col items-start gap-3 bg-[linear-gradient(180deg,_#E9EFFA_0%,_#e9effa80_100%)]
        dark:bg-[linear-gradient(180deg,_#2b2c3740_0%,_#2b2c3720_100%)] rounded-lg h-[87vh] min-w-[400px] p-4 `}
      >
        {tasks?.map( (task) => {
          return (
            <TaskCard key={task.id} task={task} boardId={column?.boardId}/>
          );
        })}
      </div>
    </div>
  );
};
