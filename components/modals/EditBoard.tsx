"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { SafeCols } from "@/types";
import qs from "query-string";
import axios from "axios";
import { isEmpty, isEqual, every, isNil, some } from "lodash";

type cols = {
  id: string;
  name: string;
};
export const EditBoard = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();
  const [columns, setColumns] = useState<cols[] | undefined>(
    data.cols?.map((col) => ({
      id: col.id,
      name: col.name,
    }))
  );
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<FieldValues>();
  const [Dirty, setIsDirty] = useState(isDirty);

  const handleRemoveCol = (id: string) => {
    const updatedColumns = columns?.filter((col) => col.id !== id);
    setColumns(updatedColumns);
    setIsDirty(true);
  };

  useEffect(() => {
    if (data.cols) {
      setColumns(data.cols);
    }
  }, [data.cols]);

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty]);

  useEffect(() => {
    setValue('name',data.board?.name)
  }, [data.board]);

  const handleAddColumn = () => {
    const newId = columns?.length! + 1;
    const newInput = {
      id: String(newId),
      name: "",
    };
    if (columns) {
      setColumns([...columns, newInput]);
    }
    setIsDirty(true);
  };

  const handleChangeInput = (id: string, value: string) => {
    const updatedColumns = columns?.map((col) => {
      if (col.id === id) {
        return {
          ...col,
          name: value,
        };
      }
      return col;
    });
    setColumns(updatedColumns);
    setIsDirty(true);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (vals) => {
    if(isEmpty(columns)) {
      return
    }
    const values = { name: vals.name, columns: [] };
    if (Dirty) {
      if (!isEqual(data.cols, columns)) {
        values.columns = values.columns.concat(columns);
      }
      if (some(values, isEmpty)) {
        return;
      }
      try {
        const url = qs.stringifyUrl({
          url: `/api/boards/${params?.boardId}`,
          query: {
            boardId: params?.boardId,
          },
        });
        await axios.patch(url, values);
        onClose();
        reset();
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog open={isOpen && type === "editBoard"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-almost_Dark  font-bold text-lg/6 p-8">
        <DialogHeader>
          <DialogTitle className="text-textdark dark:text-textwhite">
            Edit Board
          </DialogTitle>
        </DialogHeader>
        <form role="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="font-bold text-xs text-textgray dark:text-textwhite"
              >
                Board Name
              </Label>
              <Input
                {...register("name", { required: true })}
                id="name"
                name="name"
                type="text"
                defaultValue={data.board?.name}
                className="bg-transparent border-border_lightBlue text-textdark dark:border-border_mediumGray dark:text-textwhite"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <fieldset>
                <legend className="font-bold text-xs text-textgray dark:text-textwhite mb-2">
                  Columns
                </legend>
                {columns?.map((col) => (
                  <div key={col.id} className="flex items-center gap-2 mb-2">
                    <Input
                      {...register(`columns.${col.id}`, { required: true })}
                      key={col.id}
                      type="text"
                      name={`columns${col.id}`}
                      id={`columns${col.id}`}
                      value={col.name}
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
              disabled={isSubmitting || !Dirty}
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
