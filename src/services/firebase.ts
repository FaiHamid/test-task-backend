import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: applicationDefault(),
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
});

const db = getFirestore();
const storage = getStorage();

export { db, storage };
