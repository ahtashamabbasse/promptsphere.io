import NextAuth from "next-auth";
import User from '@models/user';
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {

            const sessionUser = await User.findOne({
                email: session.user.email
            }).exec();
            session.user.id = sessionUser?._id?.toString();
            return session;

        },
        async signIn({profile}) {
            console.log('signIn')
            try {
                await connectToDB()

                const isUserExist = await User.findOne({
                    email: profile.email
                }).exec();
                console.log(isUserExist)
                if (!isUserExist) {
                    console.log('going to create user')
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.image,
                    })
                }

                return true;

            } catch (err) {
                console.log('error :: ',err)
                return false;
            }
        },
    }
});
export {handler as GET, handler as POST}
