import GitHub from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core'

const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
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
} satisfies AuthConfig

export default authConfig
