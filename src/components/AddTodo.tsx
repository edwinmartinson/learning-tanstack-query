import { useEffect, useState } from "react";
import { Loader2, PlusIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useAddTodoMutation } from "@/redux/todosApiSlice";

export default function AddTodo() {
  const [task, setTask] = useState<string>("");

  const [mutate, { isLoading, isError }] = useAddTodoMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      setTask("");
    }
  }, [isLoading, isError]);

  return (
    <ButtonGroup className="w-full rounded-md">
      <ButtonGroup className="w-full">
        <Input
          value={task}
          type="text"
          placeholder="What's on your mind."
          disabled={isLoading}
          onChange={(e) => setTask(e.target.value)}
        />
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          disabled={isLoading || task.length < 3}
          onClick={() => mutate(task)}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <PlusIcon />}
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
