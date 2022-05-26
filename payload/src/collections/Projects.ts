import { CollectionConfig } from "payload/types";

const Projects: CollectionConfig = {
  slug: "projects",
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
      name: "link",
      type: "text",
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "teaser",
      type: "text",
    },
    {
      name: "copy",
      type: "richText",
    },
    {
      name: "date",
      type: "date",
    },
  ],
};

export default Projects;
