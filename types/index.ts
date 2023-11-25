import { Board, Column, SubTask, Task, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Columns = {
  id: number;
  value: string;
};

export type SafeBoard = Omit<Board, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeCols = Omit<Column, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type safeTasks = Omit<Task, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type safeSubTasks = Omit<SubTask, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

