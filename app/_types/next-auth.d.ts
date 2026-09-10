import type { DefaultSession } from "next-auth";
import type { Guest } from "./data";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      guestId?: Guest["id"];
    };
  }
}
