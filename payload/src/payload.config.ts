import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Projects from "./collections/Projects";
import Media from "./collections/Media";
import Compositions from "./collections/Composition";
import Links from "./collections/Links";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  // prettier-ignore
  collections: [
    Compositions,
    Projects,
    Media, 
    Links, 
    Users, 
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
