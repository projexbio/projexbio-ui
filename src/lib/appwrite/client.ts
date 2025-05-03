import { Client } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6814819a000f5b7d2be7");

export { client };
