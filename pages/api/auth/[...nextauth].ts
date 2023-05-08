import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth,{ AuthOptions }  from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user?.hashPassword) {
                    throw new Error("invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("invalid credentials");
                }
                return user;
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions)