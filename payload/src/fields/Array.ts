import { Field } from "payload/types";

export const TagsField: Field = {
  name: "tags",
  type: "array",
  minRows: 0,
  fields: [
    {
      name: "tag",
      type: "relationship",
      relationTo: "tags",
      required: true,
    },
  ],
};
