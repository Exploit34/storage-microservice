import * as admin from 'firebase-admin';
// import firebaseConfigservice from "./storage-microservice-a51cf-firebase-adminsdk-ywuzd-706e21704f.json" assert { type: 'json' };

var serviceAccount = require('./*.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
