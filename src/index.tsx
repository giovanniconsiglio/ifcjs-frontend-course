import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyD9Ta92BiAK9BgxuTFQuwtRv-Vycimu6YQ",
  authDomain: "ifcjs-frontend-course.firebaseapp.com",
  projectId: "ifcjs-frontend-course",
  storageBucket: "ifcjs-frontend-course.appspot.com",
  messagingSenderId: "596897296141",
  appId: "1:596897296141:web:bbfade0332da49debd0a44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
