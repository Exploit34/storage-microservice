import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

export const firebaseSdk = async () => {
    if(admin.apps.length === 0) {
        try {
            const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as ServiceAccount),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            });
        } catch (error) {
            console.log(`Error loading Firebase credentials: ${error}`);
        }
    }
};