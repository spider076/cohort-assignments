import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

type TodoArray = Partial<Todo[]>;

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<TodoArray>();

  useEffect(() => {
    const getTodo = async () => {
      const response = await fetch("http://localhost:3000/todo/todos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Todo: Create a type for the response that you get back from the server
      const data: Todo[] = await response.json();
      setTodos(data);
    };
    getTodo();
  }, []);
  return todos;
};
