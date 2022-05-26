import { Block } from "payload/types";

export const RichText: Block = {
  slug: "richtext",
  fields: [
    {
      name: "headline",
      type: "text",
    },
    {
      name: "copy",
      type: "richText",
    },
  ],
};
