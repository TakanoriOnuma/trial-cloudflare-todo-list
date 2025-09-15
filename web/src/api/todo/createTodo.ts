import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { getFetchTodosQueryKey, type Todo } from "./fetchTodos";

export type CreateTodoParams = Omit<Todo, "id" | "completed" | "created_at">;

export const createTodo = (todo: CreateTodoParams) => {
  return fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res): Promise<Todo> => {
    if (!res.ok) {
      throw new Error("作成に失敗しました");
    }
    return res.json();
  });
};

export const useMutationCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateTodoParams) => createTodo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFetchTodosQueryKey() });
    },
  });
};
