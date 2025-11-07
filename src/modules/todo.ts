import axios from "axios";
import { nanoid } from "nanoid";
import type { Task } from "@/types.ts";

const TodoAPI = axios.create({ baseURL: "http://localhost:2025" });

class Todo {
  public static async all() {
    const res = await TodoAPI.get<Task[]>("/todos");
    return res.data;
  }

  public static async add(task: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.post<Task>("/todos", {
      id: nanoid(),
      description: task,
      isCompleted: false,
    });

    return res.data;
  }

  public static async delete(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.delete<Task>(`/todos/${id}`);
    return res.data;
  }

  public static async check(args: { id: string; isCompleted: boolean }) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.patch<Task>(`/todos/${args.id}`, {
      isCompleted: args.isCompleted,
    });

    return res.data;
  }
}

export default Todo;
