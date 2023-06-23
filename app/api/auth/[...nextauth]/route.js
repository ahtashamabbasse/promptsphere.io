import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from "@utils/database";


console.log({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ],
    async session({session}) {

    },
    async signIn({profile}) {
        try {
            await connectToDB()

            //check if user already exist

            // if not, create a new user
        } catch (err) {
            console.log(err)
            return false;
        }
    },
});
export {handler as GET, handler as POST}
