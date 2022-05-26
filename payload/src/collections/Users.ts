import { CollectionConfig } from "payload/types";
import { isAdmin } from "./../utils";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "Role",
      type: "relationship",
      relationTo: "roles",
    },
  ],
};

export default Users;
