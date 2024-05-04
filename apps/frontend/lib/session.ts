import type { AppLoadContext } from "@remix-run/cloudflare"

import { OLD_SESSION_SECRETS, SessionCookieHelper } from "@/app/sessions.server"

const getSessionCookieHelper = (context: AppLoadContext) => {
  const secret = context.cloudflare.env.COOKIE_SECRET
  // new secret should be added in the first element of the array
  const secrets = [secret, ...OLD_SESSION_SECRETS]
  return new SessionCookieHelper(secrets)
}

export { getSessionCookieHelper }
