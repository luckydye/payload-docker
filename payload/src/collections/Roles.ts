import { CollectionConfig } from "payload/types";
import { isAdmin } from "./../utils";

const Roles: CollectionConfig = {
  slug: "roles",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export default Roles;
