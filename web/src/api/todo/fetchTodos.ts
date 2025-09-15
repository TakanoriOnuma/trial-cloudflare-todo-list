import { keepPreviousData, useQuery } from "@tanstack/vue-query";

export type Todo = {
  /** ID */
  id: string;
  /** TODO件名 */
  title: string;
  /** 完了したか */
  completed: boolean;
  /** 締切 */
  deadline?: string;
  /** 作成日 */
  created_at: string;
};

export const fetchTodos = () => {
  return fetch("/api/todos").then((res): Promise<Todo[]> => res.json());
};

export const getFetchTodosQueryKey = () => ["todos"];

export const useQueryTodos = () => {
  return useQuery({
    queryKey: getFetchTodosQueryKey(),
    queryFn: () => fetchTodos(),
    placeholderData: keepPreviousData,
  });
};
