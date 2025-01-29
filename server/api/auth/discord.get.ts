import a from "~/types/auth";
import { DiscordUser } from "~/types/discord";
export default defineOAuthDiscordEventHandler({
  config: {
    profileRequired: true,
  },
  async onSuccess(
    event,
    { user: { id, avatar, global_name, username } }: { user: DiscordUser }
  ) {
    await db
      .insert(t.users)
      .values({ id, avatar, global_name, username })
      .onConflictDoUpdate({
        target: t.users.id,
        set: { avatar, global_name, username },
      });
    await setUserSession(event, {
      user: {
        id,
        avatar,
        global_name,
        username,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Discord OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
