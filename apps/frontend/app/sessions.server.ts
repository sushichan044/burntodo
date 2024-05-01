// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/cloudflare" // or cloudflare/deno

type SessionData = {
  userName: string
}

type SessionFlashData = {
  error: string
}

const { commitSession, destroySession, getSession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      name: "__session",
      path: "/",
      sameSite: "lax",
      secure: true,
    },
  })

export { commitSession, destroySession, getSession }
