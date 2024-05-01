// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/cloudflare" // or cloudflare/deno

type SessionData = {
  userName: string
}

type SessionFlashData = {
  error: string
}

const {
  commitSession: rawCommitSession,
  destroySession,
  getSession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    httpOnly: true,
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    name: "__session",
    path: "/",
    sameSite: "lax",
    secrets: ["hello!", "This is sample secret key"],
    secure: true,
  },
})

type CommitSessionFunction = typeof rawCommitSession

const FOUR_WEEKS_IN_MS = 1000 * 60 * 60 * 24 * 7 * 4

const commitSession: CommitSessionFunction = (session, options) => {
  return rawCommitSession(session, {
    expires: new Date(Date.now() + FOUR_WEEKS_IN_MS), // 1 week
    ...options,
  })
}

export { commitSession, destroySession, getSession }
