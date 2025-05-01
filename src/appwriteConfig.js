import { Client, Databases  } from 'appwrite';

export const PROJECT_ID  ='680fd027002ed3f72525';
export const DATABASE_ID = '680fd1f6001e8a0f628a'; 
export const COLLECTION_ID_MESSAGES = '680fd2140005a5820f3a'; 



const client = new Client();


client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680fd027002ed3f72525');

export const databases = new Databases(client)    

export default client

