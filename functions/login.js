import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import { db } from './config/firebase_config';

import { encryptTextWithAES } from './config/helper';

// require('dotenv').config();
import { config } from 'dotenv';

config();

const usersRef = collection(db, 'users');

export async function handler(event, context) {
  const { email, password } = JSON.parse(event.body);

  const incomingHttpMethod = event.httpMethod;

  if (incomingHttpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed!',
      }),
    };
  }

  const encryptedPassword = encryptTextWithAES(password);

  const matchEmailQuery = query(
    usersRef,
    where('email', '==', email),
    limit(1)
  );

  const querySnapshot = await getDocs(matchEmailQuery);

  if (querySnapshot.size === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: true,
        errorType: 'invalid-account',
        message: 'Login failed! Invalid account!',
      }),
    };
  }

  const userData = {
    userId: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };

  if (userData.password !== encryptedPassword) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: true,
        errorType: 'wrong-password',
        message: 'Login failed! Invalid password!',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Login success!',
      data: {
        id: userData.userId,
        email: userData.email,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        ratedReport: userData.ratedReport,
      },
    }),
  };
}
