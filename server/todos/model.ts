import type { OverrideProperties } from "type-fest";

/** TODO項目 */
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

export type CreateTodoParams = Omit<Todo, "id" | "completed" | "created_at">;

export type UpdateTodoParams = Omit<Partial<Todo>, "created_at">;

export const TODO_PREFIX = "todo:";

/**
 * TODO一覧を取得する
 * @param KV - CloudflareのKVNamespace
 */
export const getTodos = async (KV: KVNamespace): Promise<Todo[]> => {
  const list = await KV.list({ prefix: TODO_PREFIX });
  const todos = await Promise.all(
    list.keys.map(async (key) => {
      const todo = await KV.get<Todo>(key.name, { type: "json" });
      if (todo == null) {
        throw new Error(`TODOの取得に失敗しました: ${key.name}`);
      }
      return todo;
    })
  );
  return todos;
};

/**
 * TODOを作成する
 * @param KV - CloudflareのKVNamespace
 * @param params - 作成するTODOの情報
 */
export const createTodo = async (
  KV: KVNamespace,
  params: CreateTodoParams
): Promise<Todo> => {
  const id = crypto.randomUUID();
  const newTodo: Todo = {
    id,
    title: params.title,
    completed: false,
    deadline: params.deadline,
    created_at: new Date().toISOString(),
  };

  await KV.put(`${TODO_PREFIX}${id}`, JSON.stringify(newTodo));
  return newTodo;
};

/**
 * TODOを更新する
 * @param KV - CloudflareのKVNamespace
 * @param id - 更新するTODOのID
 * @param params - 更新するTODOの情報
 */
export const updateTodo = async (
  KV: KVNamespace,
  id: string,
  params: UpdateTodoParams
): Promise<void> => {
  const key = `${TODO_PREFIX}${id}`;
  const raw = await KV.get<Todo>(key, { type: "json" });
  if (raw == null) {
    throw new Error(`TODOの取得に失敗しました: ${key}`);
  }

  await KV.put(
    key,
    JSON.stringify({
      ...raw,
      ...params,
    })
  );
};

/**
 * TODOを削除する
 * @param KV - CloudflareのKVNamespace
 * @param id - 削除するTODOのID
 */
export const deleteTodo = async (
  KV: KVNamespace,
  id: string
): Promise<void> => {
  const key = `${TODO_PREFIX}${id}`;
  await KV.delete(key);
};
