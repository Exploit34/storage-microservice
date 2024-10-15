import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHD,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
