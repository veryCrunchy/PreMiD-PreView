export default defineOAuthDiscordEventHandler({
    config: {
    profileRequired: true,

    },
    async onSuccess(event, { user, tokens }) {
      await setUserSession(event, {
        user: {
          ...user
        }
      })
      return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Discord OAuth error:', error)
      return sendRedirect(event, '/')
    },
  })