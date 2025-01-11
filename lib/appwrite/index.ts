"use server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwite-session");
  if (!session || !session.value) throw new Error("no session");
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secrectKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
