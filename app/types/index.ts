import { User } from "@prisma/client";

export type SafeUser = Omit<User, "createAt" | "updateAt" | "emailVerified"> & {
    createdAt: String;
    updatedAt: String;
    emailVerified: String | null;
};
