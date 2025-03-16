import type { AuthConfig } from '@auth/core'
import GitHub from '@auth/core/providers/github'

export const authConfig: AuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent"
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow specific GitHub users to sign in
      const allowedUsers = (process.env.ALLOWED_GITHUB_USERS || '').split(',')
      return allowedUsers.includes(profile?.login as string)
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    }
  }
}

export default authConfig
