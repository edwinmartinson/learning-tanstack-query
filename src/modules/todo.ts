import axios from "axios";
import { nanoid } from "nanoid";
import type { Task } from "@/types.ts";

const TodoAPI = axios.create({ baseURL: "http://localhost:2025" });

class Todo {
  public static async all(url: string) {
    const res = await TodoAPI.get<Task[]>(url);
    return res.data;
  }

  public static async add(url: string, { arg }: { arg: { task: string } }) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.post<Task>(url, {
      id: nanoid(),
      description: arg.task,
      isCompleted: false,
    });

    return res.data;
  }

  public static async delete(url: string, { arg }: { arg: { id: string } }) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.delete<Task>(`${url}/${arg.id}`);
    return res.data;
  }

  public static async check(
    url: string,
    { arg }: { arg: { id: string; isCompleted: boolean } },
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 3));

    const res = await TodoAPI.patch<Task>(`${url}/${arg.id}`, {
      isCompleted: arg.isCompleted,
    });

    return res.data;
  }
}

export default Todo;
