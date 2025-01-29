import { DiscordUser } from "./discord";
// auth.d.ts
declare module "#auth-utils" {
  interface User extends DiscordUser {}
  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}
