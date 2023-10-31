"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import qs from "query-string";

export const DeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (vals) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/boards/${params?.boardId}`,
        query: {
          boardId: params?.boardId,
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
    <Dialog open={isOpen && type === "deleteBoard"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-_red">
            Delete this {data.board?.name} ?
          </DialogTitle>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-6">
            <p className="text-textgray">
            Are you sure you want to delete the ‘Marketing Plan’ board? This
            action will remove all columns and tasks and cannot be reversed.{" "}

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
