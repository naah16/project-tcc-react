import TodoList from "@/components/todo/TodoList";

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-600">Lista de Tarefas</h1>
      <TodoList />
    </div>
  );
}