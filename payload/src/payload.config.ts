import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Projects from "./collections/Projects";
import Media from "./collections/Media";
import Compositions from "./collections/Composition";
import Links from "./collections/Links";
import Websites from "./collections/Websites";
import Graphics from "./collections/Graphics";
import Articles from "./collections/Articles";
import Tags from "./collections/Tags";
import Roles from "./collections/Roles";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  // prettier-ignore
  collections: [
    Websites,
    Articles,
    Compositions,
    Projects,
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
