import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({

    providers: [
        // OAuth authentication providers...

        GoogleProvider({
            clientId: "883079271292-rspg4hf9f2fph5ra0hkqkhsd39n5t6n8.apps.googleusercontent.com",
            clientSecret: "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"

            // clientId: process.env.GOOGLE_ID,
            //clientSecret: process.env.GOOGLE_SECRET

        }),
        // Passwordless / email sign in

    ]
})