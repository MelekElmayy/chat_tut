import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '680fd027002ed3f72525';
export const DATABASE_ID = '680fd1f6001e8a0f628a'; 
export const COLLECTION_ID_MESSAGES = '680fd2140005a5820f3a';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client); // Make sure this is exported
export default client;