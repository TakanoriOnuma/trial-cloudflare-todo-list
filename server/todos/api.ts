import { Hono } from "hono";
import {
  createTodo,
  CreateTodoParams,
  deleteTodo,
  getTodos,
  updateTodo,
  UpdateTodoParams,
} from "./model";

const todos = new Hono<{ Bindings: Cloudflare.Env }>();

todos.get("/", async (c) => {
  const todos = await getTodos(c.env.HONO_TODO);
  return c.json(todos);
});

todos.post("/", async (c) => {
  const params = await c.req.json<CreateTodoParams>();
  const newTodo = await createTodo(c.env.HONO_TODO, params);
  return c.json(newTodo);
});

todos.put("/:id", async (c) => {
  const id = c.req.param("id");
  const params = await c.req.json<UpdateTodoParams>();
  await updateTodo(c.env.HONO_TODO, id, params);
  return new Response(null, { status: 204 });
});

todos.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await deleteTodo(c.env.HONO_TODO, id);
  return new Response(null, { status: 204 });
});

export { todos };
