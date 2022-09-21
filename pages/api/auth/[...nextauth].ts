import NextAuth, {User, Account, Profile, Session} from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { connectToDatabase } from "../../../libs/mongodb";
import {
  getUser,
  createUser,
  ReqUser,
  ResUser,
} from "../../../lib/users/users";

export default NextAuth({

  providers:[
    GithubProvider({
      
      clientId:process.env.GITHUB_ID,
      clientSecret:process.env.GITHUB_SECRET

    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_SECRET
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user;
      return Promise.resolve(session);
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (user !== null) {
          console.log("SEND TO DATABSAE");
          // get User if  not create one

          (await getUser(user.id)) ?? (await createUser(toReqUser(user, account)));
          const data = await getUser(user.id);
          setResUser(user, data as unknown as ResUser);
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
});

const toReqUser = (user: User, account: Account) => {
  const reqUser: ReqUser = {
    id: user.id,
    email: user.email,
    name: user.name.slice(0, 21),
    image: user.image,
    provider: account.provider,
  };
  return reqUser;
};

const setResUser = (user: User, resUser: ResUser) => {
  user.id = resUser.id;
  user.email = resUser.email;
  user.isAdmin = resUser.isAdmin;
  user.name = resUser.name;
  user.provider = resUser.provider;
  user.image = resUser.image;
};
