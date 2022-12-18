import { collection, query, where, limit, getDocs } from 'firebase/firestore';

import { db } from './config/firebase_config';

import { encryptTextWithAES } from './config/helper';

// require('dotenv').config();
import { config } from 'dotenv';

config();

const adminsRef = collection(db, 'admins');

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
    adminsRef,
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

  const adminData = {
    adminId: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };

  if (adminData.password !== encryptedPassword) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: true,
        errorType: 'invalid-account',
        message: 'Login failed! Invalid account!',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Login admin success!',
      data: {
        id: adminData.adminId,
        isAdmin: adminData.isAdmin,
        email: adminData.email,
        name: adminData.name,
        phoneNumber: adminData.phoneNumber,
        ratedReport: adminData.ratedReport,
      },
    }),
  };
}
