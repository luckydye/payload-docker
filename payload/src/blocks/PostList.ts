import { Block } from "payload/types";

export const PostList: Block = {
  slug: "postlist",
  fields: [
    {
      name: "posts",
      type: "relationship",
      relationTo: ["posts"],
      hasMany: true,
    },
  ],
};
