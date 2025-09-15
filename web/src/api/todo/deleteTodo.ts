import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { getFetchTodosQueryKey } from "./fetchTodos";

export const deleteTodo = (todoId: string) => {
  return fetch(`/api/todos/${todoId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("削除に失敗しました");
    }
  });
};

export const useMutationDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getFetchTodosQueryKey() });
    },
  });
};
