// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// انسخ بياناتك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD...", 
  authDomain: "barber-booking1.firebaseapp.com",
  projectId: "barber-booking1",
  storageBucket: "barber-booking1.appspot.com",
  messagingSenderId: "538759718095",
  appId: "1:538759718095:web:e6e77d0ac5df97fe7e83ba"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// تهيئة قاعدة البيانات مرة واحدة فقط
const db = getFirestore(app);

// تصدير قاعدة البيانات لاستخدامها في الملفات الأخرى
export { db };