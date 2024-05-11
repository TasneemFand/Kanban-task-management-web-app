/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";


export const EditTask = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [subtasks, setSubtasks] = useState(data.subTasks);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (vals) => {
    try {
      await axios.patch(`/api/tasks/${data?.task?.id}`, {
        status: vals.status,
        subtasks: vals.subtasks,
      });
      onClose();
      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.subTasks) {
      setSubtasks(data.subTasks);
    }
  }, [data.subTasks]);

  useEffect(() => {
    if (subtasks) {
      setValue("subtasks", subtasks);
    }
  }, [subtasks]);

   useEffect(() => {
    if (data.task) {
      setValue("status", data.task.columnId);
    }
  }, [data.task]);

  const handleChangeInput = (id: string, value: string) => {
    const updatedSubtasks = subtasks?.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: value,
        };
      }
      return task;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const newId = subtasks?.length ?  subtasks?.length + 1 : 0;
    const newSubtask = { id: String(newId), title: "" };
    if(subtasks)
    setSubtasks([...subtasks, {...newSubtask, taskId: data?.task?.id!, isCompleted: false, createdAt: "", updatedAt: "" }]);
  else 
  setSubtasks([{...newSubtask, taskId: data?.task?.id!, isCompleted: false, createdAt: "", updatedAt: ""}])
  };

  const handleRemoveSubtask = (id: string) => {
    const newSubtasks = subtasks?.filter((task) => task.id !== id);
    setSubtasks(newSubtasks);
  };

  return (
    <Dialog open={isOpen && type === "editTask"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-textdark dark:text-textwhite">
            Edit Task
          </DialogTitle>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="title"
                className="font-bold text-xs text-textgray dark:text-textwhite"
              >
                Title
              </Label>
              <Input
                {...register("title", { required: true })}
                id="title"
                name="title"
                type="text"
                defaultValue={data.task?.title}
                className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="description"
                className="font-bold text-xs text-textgray dark:text-textwhite"
              >
                Description
              </Label>
              <Textarea
                {...register("description")}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                id="description"
                name="description"
                rows={4}
                defaultValue={data.task?.description || ""}
                className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <fieldset>
                <legend className="font-bold text-xs text-textgray dark:text-textwhite mb-2">
                  SubTasks
                </legend>
                {subtasks?.map((subTask) => (
                  <div
                    key={subTask.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Controller
                      name="subtasks"
                      control={control}
                      render={({ field }) => {
                        const task = field.value?.filter((value: { id: string; }) => value.id === subTask.id)?.[0];
                        return (
                          <Input
                            key={task.id}
                            type="text"
                            name={task.id}
                            id={task.id}
                            value={task.title}
                            placeholder="e.g. Make coffee"
                            onChange={(ev) => {
                              setValue(
                                `subtasks.${subTask.id}`,
                                ev.currentTarget.value
                              );
                              field.onChange([
                                ...field.value,
                                {
                                  ...task,
                                },
                              ]);
                              handleChangeInput(
                                task.id,
                                ev.currentTarget.value
                              );
                            }}
                            className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
                          />
                        );
                      }}
                      rules={{ required: true }}
                    />
                    <Button
                      className="flex items-center bg-transparent hover:bg-transparent dark:text-textgray text-textdark"
                      onClick={() => handleRemoveSubtask(subTask.id)}
                    >
                      <AiOutlineClose size={20} />
                    </Button>
                  </div>
                ))}
              </fieldset>
            </div>
            <Button
              onClick={handleAddSubtask}
              className="text-[#635FC7] bg-[#635fc719] dark:bg-[#FFF]"
            >
              + Add New Subtask
            </Button>
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
                render={({ field }) => (
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
                        {data.cols?.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                rules={{ required: true }}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="bg-[#635FC7] text-[#FFF] w-full transition hover:opacity-80 hover:bg-[#635FC7]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
