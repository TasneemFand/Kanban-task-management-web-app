"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Columns } from "@/types";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const CreateNewBoard = () => {
  const { isOpen, onClose, type } = useModal();
  const [columns, setColumns] = useState<Columns[]>([
    { id: 1, value: "Todo" },
    { id: 2, value: "Doing" },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/boards", {
        name: data.name,
        columns: columns.map((col) => col.value),
      });
      onClose();
      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCol = (id: number) => {
    const updatedColumns = columns.filter((col) => col.id !== id);
    setColumns(updatedColumns);
  };
  const handleAddColumn = () => {
    const newId = columns[columns.length - 1].id + 1;
    const newInput = { id: newId, value: "" };
    setColumns([...columns, newInput]);
  };

  const handleChangeInput = (id: number, value: string) => {
    const updatedColumns = columns.map((col) => {
      if (col.id === id) {
        return {
          ...col,
          value: value,
        };
      }
      return col;
    });
    setColumns(updatedColumns);
  };

  return (
    <Dialog open={isOpen && type === "createNewBoard"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-textdark dark:text-textwhite">
            Add new board
          </DialogTitle>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="font-bold text-xs text-textgray dark:text-textwhite"
              >
                Name
              </Label>
              <Input
                {...register("name", { required: true })}
                id="name"
                name="name"
                placeholder="e.g. Web Design"
                type="text"
                className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <fieldset>
                <legend className="font-bold text-xs text-textgray dark:text-textwhite mb-2">
                  Columns
                </legend>
                {columns.map((col) => (
                  <div key={col.id} className="flex items-center gap-2 mb-2">
                    <Input
                      {...register(`columns.${col.id}`, { required: true })}
                      key={col.id}
                      type="text"
                      name={`columns${col.id}`}
                      id={`columns${col.id}`}
                      value={col.value}
                      onChange={(ev) => {
                        setValue(`columns.${col.id}`, ev.currentTarget.value);
                        handleChangeInput(col.id, ev.currentTarget.value);
                      }}
                      className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
                    />
                    <Button
                      className="flex items-center bg-transparent hover:bg-transparent dark:text-textgray text-textdark"
                      onClick={() => handleRemoveCol(col.id)}
                    >
                      <AiOutlineClose size={20} />
                    </Button>
                  </div>
                ))}
              </fieldset>
            </div>
            <Button
              onClick={handleAddColumn}
              className="text-[#635FC7] bg-[#635fc719] dark:bg-[#FFF]"
            >
              + Add New Column
            </Button>
            <Button
              type="submit"
              className="bg-[#635FC7] text-[#FFF] w-full transition hover:opacity-80 hover:bg-[#635FC7]"
            >
              Create New Board
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
