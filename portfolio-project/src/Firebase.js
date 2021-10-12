import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5bzqf9EI4ep-kBmxWr7pCA836QmKdWsc",
  authDomain: "portfolio-oscarjco.firebaseapp.com",
  databaseURL: "https://portfolio-oscarjco-default-rtdb.firebaseio.com",
  projectId: "portfolio-oscarjco",
  storageBucket: "portfolio-oscarjco.appspot.com",
  messagingSenderId: "541528622649",
  appId: "1:541528622649:web:79e97d64d9149c75742fe8"
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
export default firebase;