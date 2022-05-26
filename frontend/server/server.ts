import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const baseUrl =
  `http://127.0.0.1:3000/api/compositions/628f67554f0dd79196c8f7ad`;

async function handler(req: Request): Promise<Response> {
  const content = await fetch(baseUrl, {
    credentials: "include",
  }).then((res) => {
    return res.text();
  }).catch((err) => {
    return `error: ${err}`;
  });

  if (content) {
    return new Response(content, {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(null, { status: 404 });
}

console.log("Listening on http://localhost:8000");
await serve(handler);
