import { Listing, User } from "@prisma/client";
export type SafeListing = Omit<Listing, "createAt"> & {
    createAt: string;
  };
export type SafeUser = Omit<User, "createAt" | "updateAt" | "emailVerified"> & {
    createdAt: String;
    updatedAt: String;
    emailVerified: String | null;
};
