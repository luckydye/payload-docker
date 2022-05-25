import { Block, CollectionConfig } from "payload/types";

const QuoteBlock: Block = {
  slug: "Quote", // required
  fields: [
    // required
    {
      name: "quoteHeader",
      type: "text",
      required: true,
    },
    {
      name: "quoteText",
      type: "text",
    },
  ],
};

const Compositions: CollectionConfig = {
  slug: "compositions",
  fields: [
    {
      name: "layout", // required
      type: "blocks", // required
      minRows: 1,
      maxRows: 20,
      blocks: [
        // required
        QuoteBlock,
      ],
    },
  ],
};

export default Compositions;
