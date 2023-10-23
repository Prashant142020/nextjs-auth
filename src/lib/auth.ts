import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/sign-in',
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'amit@mail.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied

                // You can also use the `req` object to obtain additional parameters
                // const user = {
                //     id: '1',
                //     name: 'J Smith',
                //     email: 'jsmith@example.com',
                // };

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user;
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null;

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }

                const exittingUser = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!exittingUser) {
                    return null;
                }
                if (exittingUser.password) {
                    const passwardMatch = await compare(
                        credentials.password,
                        exittingUser.password
                    );

                    if (!passwardMatch) {
                        return null;
                    }
                }

                return {
                    id: `${exittingUser.id}`,
                    username: exittingUser.username,
                    email: exittingUser.email,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user);

            if (user) {
                return {
                    ...token,
                    username: user.username,
                };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                },
            };
            return session;
        },
    },
};
