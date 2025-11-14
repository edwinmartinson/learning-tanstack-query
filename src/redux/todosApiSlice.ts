import { nanoid } from "nanoid";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Task } from "@/types";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const todosApiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:2025" }),
  reducerPath: "todos",
  tagTypes: ["todos"],
  endpoints: (build) => ({
    getTodos: build.query<Task[], void>({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
      providesTags: ["todos"],
    }),
    addTodo: build.mutation<Task, string>({
      query: (task: string) => ({
        url: "/todos",
        method: "POST",
        data: {
          id: nanoid(),
          description: task,
          isCompleted: false,
        },
      }),
      invalidatesTags: ["todos"],
    }),
    deleteTodo: build.mutation<Task, string>({
      query: (id: string) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    checkTodo: build.mutation<Task, Omit<Task, "description">>({
      query: ({ id, isCompleted }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        data: { isCompleted },
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useCheckTodoMutation,
} = todosApiSlice;
