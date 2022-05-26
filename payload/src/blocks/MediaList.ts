import { Block } from "payload/types";

export const MediaList: Block = {
  slug: "medialist",
  fields: [
    {
      name: "media",
      type: "relationship",
      relationTo: ["media"],
      hasMany: true,
    },
  ],
};
