import NextAuth, { Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    })
  ],
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'light',
    logo: 'https://i.imgur.com/ChOg4HV.png'
  },
  callbacks: {
    async session({ session, user }) {
      session.user ? session.user.id = user.id : null;
      return Promise.resolve(session);
    }
  }
})