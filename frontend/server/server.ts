import * as Eta from "https://deno.land/x/eta/mod.ts";
import { serve } from "https://deno.land/std/http/mod.ts";
import ContentTypes from "./ContentTypes.ts";

Eta.configure({ views: "./templates" });

const reqHandler = async (req: Request) => {
  try {
    const baseUrl = `http://127.0.0.1:3000/api/websites/628f570763386d1c7a61da6c?depth=2`;
    const site = await fetch(baseUrl).then((res) => res.json());

    const u = new URL(req.url);
    switch (u.pathname) {
      case "/": {
        return new Response(
          (await Eta.renderFile("root.html", { site })) as string,
          {
            headers: {
              "content-type": "text/html",
            },
          }
        );
      }
      case "/post": {
        const baseUrl = `http://localhost:3000/api/posts/628f9c1335e76afb4f0e08d5?depth=2`;
        const post = await fetch(baseUrl).then((res) => res.json());
        return new Response(
          (await Eta.renderFile("root.html", { site, post })) as string,
          {
            headers: {
              "content-type": "text/html",
            },
          }
        );
      }
    }

    // server static files
    if (u.pathname.endsWith("/style.css")) {
    }

    try {
      const file = await Deno.readFile(`static/${u.pathname}`);
      const parts = u.pathname.split(".");
      const extension = parts[parts.length - 1];

      const contentTypes: Record<string, string> = ContentTypes;

      return new Response(file, {
        headers: {
          "content-type": contentTypes[extension],
        },
      });
    } catch (err) {
      return new Response(null, { status: 404 });
    }
  } catch (e) {
    console.log(e);
  }
  return new Response(null, { status: 500 });
};

serve(reqHandler, { port: 8000 });
