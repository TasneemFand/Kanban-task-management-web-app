"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { HiDotsVertical } from "react-icons/hi";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { safeSubTasks } from "@/types";
import { DropDownMenu } from "../DropDownMenu";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export const ViewTask = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { task, subTasks, cols } = data;
  const completedTasks = subTasks?.filter((task) => task.isCompleted);
  const [tasks, setTasks] = useState<safeSubTasks[] | null | undefined>(
    subTasks
  );
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty, dirtyFields, isSubmitting },
  } = useForm<FieldValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.patch(`/api/tasks/${task?.id}`, {
        status: data.status,
        subtasks: data.subtasks,
      });
      onClose();
      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (task) {
      setValue("status", task.columnId);
    }
  }, [task]);

  useEffect(() => {
    if (subTasks) {
      setTasks(subTasks);
    }
  }, [subTasks]);

  useEffect(() => {
    setValue("subtasks", tasks);
  }, [tasks]);

  const handleChangeSubTask = (id: string, value: boolean) => {
    const updatedTasks = tasks?.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: value,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Dialog open={isOpen && type === "viewTask"} onOpenChange={onClose}>
      <DialogContent className="sm:min-w-[425px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <div className="flex items-center">
            <DialogTitle className="text-textdark dark:text-textwhite text-lg">
              {task?.title}
            </DialogTitle>
            <DropDownMenu
              triggerButton={
                <Button className="bg-transparent ml-auto hover:bg-transparent text-textgray  border-none p-0 focus-visible:ring-0">
                  <HiDotsVertical size={24} />
                </Button>
              }
            >
              <DropdownMenuItem
                onClick={() => {
                  onClose();
                  onOpen("editTask", {task, subTasks, cols})                
                }}
              >
                <AiOutlineEdit className="mr-2 h-4 w-4 text-textgray" />
                <span className="text-textgray">Edit Task</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onClose();
                  onOpen("deleteTask", {task});
                }}
              >
                <AiOutlineDelete className="mr-2 h-4 w-4 text-_red" />
                <span className="text-_red">Delete Task</span>
              </DropdownMenuItem>
            </DropDownMenu>
          </div>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <fieldset>
                <legend className="font-bold text-sm text-textgray dark:text-textwhite mb-6">
                  Subtask ({completedTasks?.length} of {subTasks?.length})
                </legend>
                {tasks?.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 mb-3 dark:bg-dark_Gray p-3 rounded-md"
                  >
                    <Controller
                      name="subtasks"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            checked={
                              field.value?.find(
                                (some: safeSubTasks) => some.id === task.id
                              )?.isCompleted
                            }
                            onCheckedChange={(checked) => {
                              field.onChange([
                                ...field.value,
                                {
                                  ...task,
                                  isCompleted: checked ? true : false,
                                },
                              ]);
                              handleChangeSubTask(
                                task.id,
                                checked ? true : false
                              );
                            }}
                            id={`subtasks_${task.id}`}
                          />
                        );
                      }}
                    />
                    <Label
                      htmlFor={`subtasks_${task.id}`}
                      className="text-sm text-textgray dark:text-textwhite font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.title}
                    </Label>
                  </div>
                ))}
              </fieldset>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="status"
                className="font-bold text-xs text-textgray dark:text-textwhite"
              >
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-almost_Dark bg-white border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite">
                        <SelectGroup>
                          <SelectLabel>Select an option</SelectLabel>
                          {cols?.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                              {col.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
                rules={{ required: true }}
              />
            </div>
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="bg-[#635FC7] text-[#FFF] w-full transition hover:opacity-80 hover:bg-[#635FC7]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
