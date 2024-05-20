import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('664223e9000f28bc2a75');

export const account = new Account(client);
export { ID } from 'appwrite';
