import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Task } from "@/types.ts";
import Todo from "@/modules/todo";
import { cn } from "@/lib/utils.ts";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type TodoItemProps = {
  task: Task;
};

export default function TodoItem({ task }: TodoItemProps) {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: Todo.delete,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Task deleted successfully.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const checkTodo = useMutation({
    mutationFn: Todo.check,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Task updated successfully.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div
      className={cn(
        "bg-muted/50 flex w-full items-center gap-3 rounded-md p-3",
        checkTodo.isPending && "animate-pulse",
      )}
    >
      <Checkbox
        defaultChecked={task.isCompleted}
        onCheckedChange={(value) =>
          checkTodo.mutate({ id: task.id, isCompleted: value as boolean })
        }
      />

      <p
        className={cn(
          "w-full truncate",
          task.isCompleted && "text-muted-foreground line-through",
        )}
      >
        {task.description}
      </p>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo.mutate(task.id)}
      >
        {deleteTodo.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash className="stroke-destructive" />
        )}
      </Button>
    </div>
  );
}
