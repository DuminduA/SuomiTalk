import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDLjTYY4FyKdxicEuwRx7lxMueGeQuW0uo",
    authDomain: "suomitalk.firebaseapp.com",
    projectId: "suomitalk",
    storageBucket: "suomitalk.appspot.com",
    messagingSenderId: "120200195162",
    appId: "1:120200195162:web:afe791d6e4cee053e47c63",
    measurementId: "G-ETCGT69R03"
  };

const app = initializeApp(firebaseConfig);

export default app;
