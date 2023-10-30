"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { AiOutlineClose } from "react-icons/ai";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CreateTask = () => {
  const { isOpen, onClose, type, data } = useModal();

  const [subtasks, setSubtasks] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();
  const params = useParams();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/tasks",
        query: {
            boardId: params?.boardId,
        },
      });
      await axios.post(url, data);
      onClose();
      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (id: number, value: string) => {
    const updatedSubtasks = subtasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          value: value,
        };
      }
      return task;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const newId = subtasks.length + 1;
    const newSubtask = { id: newId, value: "" };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleRemoveSubtask = (id: number) => {
    const newSubtasks = subtasks.filter((task) => task.id !== id);
    setSubtasks(newSubtasks);
  };
  return (
    <Dialog open={isOpen && type === "createNewTask"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-textdark dark:text-textwhite">
            Add New Task
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
                placeholder="e.g. Take coffee break"
                type="text"
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
                className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <fieldset>
                <legend className="font-bold text-xs text-textgray dark:text-textwhite mb-2">
                  Subtasks
                </legend>
                {subtasks.map((subTask) => (
                  <div
                    key={subTask.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Input
                      {...register(`subtasks.${subTask.id}`, {
                        required: true,
                      })}
                      key={subTask.id}
                      type="text"
                      name={`subtasks${subTask.id}`}
                      id={`subtasks${subTask.id}`}
                      value={subTask.value}
                      placeholder="e.g. Make coffee"
                      onChange={(ev) => {
                        setValue(
                          `subtasks.${subTask.id}`,
                          ev.currentTarget.value
                        );
                        handleChangeInput(subTask.id, ev.currentTarget.value);
                      }}
                      className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
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
              className="bg-[#635FC7] text-[#FFF] w-full transition hover:opacity-80 hover:bg-[#635FC7]"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
