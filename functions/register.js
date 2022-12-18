import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';

import { db } from './config/firebase_config';

import { encryptTextWithAES } from './config/helper';

const usersRef = collection(db, 'users');

export async function handler(event, context) {
  const { email, name, password, phoneNumber } = JSON.parse(event.body);

  const incomingHttpMethod = event.httpMethod;

  if (incomingHttpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: true,
        message: 'Method Not Allowed!',
      }),
    };
  }

  // Check if email is already used
  const matchEmailQuery = query(
    usersRef,
    where('email', '==', email),
    limit(1)
  );

  const querySnapshot = await getDocs(matchEmailQuery);

  if (querySnapshot.size !== 0) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        error: true,
        errorType: 'email-already-used',
        message: 'Register failed! Email already in use!',
      }),
    };
  }

  const newUserData = {
    email,
    name,
    password: encryptTextWithAES(password),
    phoneNumber,
    ratedReport: [],
  };

  // Add a new document with a generated id.
  const docRef = await addDoc(usersRef, newUserData);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Register success!',
    }),
  };
}
