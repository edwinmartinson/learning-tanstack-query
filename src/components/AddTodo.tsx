import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { Loader2, PlusIcon } from "lucide-react";

import Todo from "@/modules/todo";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function AddTodo() {
  const [task, setTask] = useState<string>("");

  const { isMutating, error, trigger } = useSWRMutation("/todos", Todo.add, {
    onSuccess: () => {
      toast.success("Todo created successfully.");
    },
    onError: () => {
      toast.error("Failed to created todo.");
    },
  });

  useEffect(() => {
    if (!isMutating && !error) {
      setTask("");
    }
  }, [isMutating, error]);

  return (
    <ButtonGroup className="w-full rounded-md">
      <ButtonGroup className="w-full">
        <Input
          value={task}
          type="text"
          placeholder="What's on your mind."
          disabled={isMutating}
          onChange={(e) => setTask(e.target.value)}
        />
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          disabled={isMutating || task.length < 3}
          onClick={() => trigger({ task })}
        >
          {isMutating ? <Loader2 className="animate-spin" /> : <PlusIcon />}
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
