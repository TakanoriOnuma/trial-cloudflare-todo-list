import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { getFetchTodosQueryKey, type Todo } from "./fetchTodos";

export type UpdateTodoParams = Omit<Partial<Todo>, "created_at">;

export const editTodo = (todoId: string, newTodo: UpdateTodoParams) => {
  return fetch(`/api/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("更新に失敗しました");
    }
  });
};

export const useMutationEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      todoId,
      newTodo,
    }: {
      todoId: string;
      newTodo: UpdateTodoParams;
    }) => editTodo(todoId, newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFetchTodosQueryKey() });
    },
  });
};
