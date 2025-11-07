import TodoItem from "@/components/TodoItem.tsx";
import Empty from "@/components/Empty.tsx";
import type { Task } from "@/types.ts";

type TodoListProps = {
  title: string;
  tasks: Task[];
  callback: (task: Task) => boolean;
};

export default function TodoList(props: TodoListProps) {
  const taskList = props.tasks.filter(props.callback).reverse();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">{props.title}</p>
        <div className="bg-muted/50 grid size-8 place-content-center rounded-full">
          <p className="text-sm">{taskList.length}</p>
        </div>
      </div>

      {taskList.length > 0 ? (
        taskList.map((task) => <TodoItem key={task.id} task={task} />)
      ) : (
        <Empty>
          <p className="text-muted-foreground">No task pending.</p>
        </Empty>
      )}
    </section>
  );
}
