import { WorkerEntrypoint } from "cloudflare:workers";
import { Hono } from "hono";
import { todos } from "./todos/api";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => c.text("Hello from Hono on Cloudflare Workers!"));
app.route("/todos", todos);

class Worker extends WorkerEntrypoint<Cloudflare.Env> {
  async fetch(request: Request) {
    return new Response("Hello from Cloudflare Workers!");
  }
}

export default app;
