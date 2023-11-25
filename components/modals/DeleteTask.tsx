"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import qs from "query-string";

export const DeleteTask = () => {
  const { isOpen, onClose, type, data } = useModal();
  const {task} = data;
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (vals) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/tasks/${task?.id}`,
        query: {
          taskId: task?.id,
        },
      });
      await axios.delete(url);
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen && type === "deleteTask"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-_red">
            Delete this Task?
          </DialogTitle>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-6">
            <p className="text-textgray">
            Are you sure you want to delete the ‘{task?.title}’ task? This
            action will remove all its subtasks and cannot be reversed.{" "}
            </p>
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-_red text-[#FFF] w-full transition hover:opacity-80 hover:bg-_red"
              >
                Delete
              </Button>
              <Button
                onClick={onClose}
                className="bg-white w-full transition hover:opacity-80 text-purple_Dark"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
