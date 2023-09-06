import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const adminEmails = ['karangaleharshal8@gmail.com', 'karangalesangita@gmail.com'];

export const authOptions = {


    providers: [
        // OAuth authentication providers...

        GoogleProvider({
            // clientId: "883079271292-rspg4hf9f2fph5ra0hkqkhsd39n5t6n8.apps.googleusercontent.com",
            // clientSecret: "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"

            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        }),
        // Passwordless / email sign in

    ]
    , secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({ session, token, user }) => {
            if (adminEmails.includes(session?.user?.email)) {
                return session;
            }
            else {
                return false;
            }


        }
    }
}

export default NextAuth(authOptions);
export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!adminEmails.includes(session?.user?.email)) {
        res.status(401);
        res.end();
        throw 'not an admin';
    }
}