import { RichText } from "./../blocks/RichText";
import { MediaList } from "../blocks/MediaList";
import { CollectionConfig } from "payload/types";

const layoutBlocks = [RichText, MediaList];

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
    retainDeleted: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "date",
      type: "date",
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 0,
      blocks: layoutBlocks,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
  ],
};

export default Posts;
