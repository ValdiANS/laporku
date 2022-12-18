import { doc, getDoc } from 'firebase/firestore';

import { db } from './config/firebase_config';

export async function handler(event, context) {
  const { id = '' } = event.queryStringParameters;

  const incomingHttpMethod = event.httpMethod;

  if (incomingHttpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed!',
      }),
    };
  }

  const docRef = doc(db, 'admins', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log('User not found!');

    return {
      statusCode: 404,
      body: JSON.stringify({
        error: true,
        errorType: 'invalid-account',
        message: 'User not found!',
      }),
    };
  }

  const adminData = docSnap.data();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get admin success!',
      data: {
        id,
        isAdmin: adminData.isAdmin,
        email: adminData.email,
        name: adminData.name,
        phoneNumber: adminData.phoneNumber,
        ratedReport: adminData.ratedReport,
      },
    }),
  };
}
