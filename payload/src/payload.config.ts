import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Teasers from "./collections/Teasers";
import Media from "./collections/Media";
import Compositions from "./collections/Composition";
import Links from "./collections/Links";
import Websites from "./collections/Websites";
import Graphics from "./collections/Graphics";
import Posts from "./collections/Post";
import Tags from "./collections/Tags";
import Roles from "./collections/Roles";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  cors: ["http://localhost:8000/"],
  // prettier-ignore
  collections: [
    Websites,
    Posts,
    Compositions,
    Teasers,
    Media, 
    Graphics,
    Links, 
    Tags, 
    Roles, 
    Users, 
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
