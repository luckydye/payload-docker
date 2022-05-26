import { CollectionConfig } from "payload/types";

const Websites: CollectionConfig = {
  slug: "websites",
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
