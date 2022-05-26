import { Block } from "payload/types";

export const CompositionList: Block = {
  slug: "compositionlist",
  fields: [
    {
      name: "compositions",
      type: "relationship",
      relationTo: ["compositions"],
      hasMany: true,
    },
  ],
};
