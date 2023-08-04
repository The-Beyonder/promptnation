import NextAuth from "next-auth/next";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      if(!session.user){
        throw new Error("No Session")
      }
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user = sessionUser;      
      // console.log(session.user)
      return session;
    },

    async signIn({ profile }) {
      // console.log(profile)
      let _profile = profile as GoogleProfile;
      try {
        await connectToDB();
        if(!_profile || !_profile.name || !_profile.picture){
          throw new Error("No Profile Found")
        }
        const userExists = await User.findOne({ email: _profile.email });
        if (!userExists) {
          await User.create({
            email: _profile.email,
            username: _profile.name.replace(" ", "").toLowerCase(),
            image: _profile.picture,
          });
        }
        return true
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
