import { WorkerEntrypoint } from "cloudflare:workers";

class Worker extends WorkerEntrypoint<Cloudflare.Env> {
  async fetch(request: Request) {
    return new Response("Hello from Cloudflare Workers!");
  }
}

export default Worker;
