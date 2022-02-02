import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user,user:email'
        }
      }
    }),
    // ...add more providers here
  ],
})