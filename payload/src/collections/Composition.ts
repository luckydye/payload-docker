import { RichText } from "./../blocks/RichText";
import { MediaList } from "./../blocks/MediaList";
import { TeaserList } from "../blocks/TeasersList";
import { PostList } from "../blocks/PostList";
import { CompositionList } from "./../blocks/CompositionList";
import { CollectionConfig } from "payload/types";

const layoutBlocks = [
  RichText,
  PostList,
  MediaList,
  TeaserList,
  CompositionList,
];

const Compositions: CollectionConfig = {
  slug: "compositions",
  admin: {
    useAsTitle: "name",
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
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 0,
      blocks: layoutBlocks,
    },
  ],
};

export default Compositions;
