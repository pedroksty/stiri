import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"

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
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email } = user
      console.log(email)

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true

      } catch (error) {
        console.log(error)
        return false

      }
    },
  }
})