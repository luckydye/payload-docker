import { CollectionConfig } from "payload/types";

const Graphics: CollectionConfig = {
  slug: "graphics",
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    staticURL: "/media",
    staticDir: "../media",
    mimeTypes: ["image/svg"],
  },
};

export default Graphics;
