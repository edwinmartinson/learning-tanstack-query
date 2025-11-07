import Title from "@/components/Title.tsx";
import AddTodo from "@/components/AddTodo";
import TodoView from "@/components/TodoView.tsx";
// import TodoPending from "./components/TodoPending";
// import TodoCompleted from "./components/TodoCompleted";

export default function App() {
  return (
    <section className="mx-auto max-w-[504px] space-y-6 py-10">
      <Title />
      <AddTodo />
      <TodoView />
      {/*<TodoPending />
      <TodoCompleted />*/}
    </section>
  );
}
