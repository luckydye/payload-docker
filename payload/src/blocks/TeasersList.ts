import { Block } from "payload/types";

export const TeaserList: Block = {
  slug: "teaserlist",
  fields: [
    {
      name: "teasers",
      type: "relationship",
      relationTo: ["teasers"],
      hasMany: true,
    },
  ],
};
