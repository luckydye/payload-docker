import { CollectionConfig } from "payload/types";

const Links: CollectionConfig = {
  slug: "links",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "name",
      type: "text",
    },
  ],
};

export default Links;
