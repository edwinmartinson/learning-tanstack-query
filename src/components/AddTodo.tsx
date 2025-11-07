import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, PlusIcon } from "lucide-react";

import Todo from "@/modules/todo";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddTodo() {
  const [task, setTask] = useState<string>("");

  const queryClient = useQueryClient();
  const { isPending, isError, mutate } = useMutation({
    mutationFn: Todo.add,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Task added successfully.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  useEffect(() => {
    if (!isPending && !isError) {
      setTask("");
    }
  }, [isPending, isError]);

  return (
    <ButtonGroup className="w-full rounded-md">
      <ButtonGroup className="w-full">
        <Input
          value={task}
          type="text"
          placeholder="What's on your mind."
          disabled={isPending}
          onChange={(e) => setTask(e.target.value)}
        />
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          disabled={isPending || task.length < 3}
          onClick={() => mutate(task)}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <PlusIcon />}
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
