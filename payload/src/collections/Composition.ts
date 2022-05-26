import { Block, CollectionConfig } from "payload/types";

const ProjectList: Block = {
  slug: "projectList",
  fields: [
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    },
  ],
};

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
      name: "layout",
      type: "blocks",
      minRows: 0,
      maxRows: 20,
      // prettier-ignore
      blocks: [
        ProjectList
      ],
    },
  ],
};

export default Compositions;
