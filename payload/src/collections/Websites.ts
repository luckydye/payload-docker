import { CollectionConfig } from "payload/types";

const Websites: CollectionConfig = {
  slug: "websites",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "graphics",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "navigation",
      type: "relationship",
      relationTo: "compositions",
      hasMany: true,
    },
    {
      name: "composition",
      type: "relationship",
      relationTo: "compositions",
    },
    {
      name: "copyright",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
  ],
};

export default Websites;
