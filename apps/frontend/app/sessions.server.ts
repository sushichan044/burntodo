// app/sessions.ts
import type { SessionStorage } from "@remix-run/cloudflare"

import { createCookieSessionStorage as _createCookieSessionStorage } from "@remix-run/cloudflare" // or cloudflare/deno

type SessionData = {
  userName: string
}

type SessionFlashData = {
  error: string
}

const OLD_SESSION_SECRETS = ["hello!", "This is sample secret key"]

const FOUR_WEEKS_IN_MS = 1000 * 60 * 60 * 24 * 7 * 4

class SessionCookieHelper {
  private secrets: string[]
  private sessionStorage: SessionStorage<SessionData, SessionFlashData>

  constructor(secrets: string[]) {
    this.secrets = secrets
    this.sessionStorage = _createCookieSessionStorage<
      SessionData,
      SessionFlashData
    >({
      cookie: {
        httpOnly: true,
        name: "__session",
        path: "/",
        sameSite: "lax",
        secrets: this.secrets,
        secure: import.meta.env.PROD,
      },
    })
  }

  async commitSession(
    ...params: Parameters<typeof this.sessionStorage.commitSession>
  ) {
    const [session, options] = params
    return this.sessionStorage.commitSession(session, {
      expires: new Date(Date.now() + FOUR_WEEKS_IN_MS),
      ...options,
    })
  }

  async destroySession(
    ...params: Parameters<typeof this.sessionStorage.destroySession>
  ) {
    return this.sessionStorage.destroySession(...params)
  }

  async getSession(
    ...params: Parameters<typeof this.sessionStorage.getSession>
  ) {
    return this.sessionStorage.getSession(...params)
  }
}

export { OLD_SESSION_SECRETS, SessionCookieHelper }
