import { doc, getDoc } from 'firebase/firestore';

import { db } from './config/firebase_config';

export async function handler(event, context) {
  const { id = '' } = event.queryStringParameters;

  const incomingHttpMethod = event.httpMethod;

  if (incomingHttpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: true,
        message: 'Method Not Allowed!',
      }),
    };
  }

  try {
    const docRef = doc(db, 'reports', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('Report not found!');

      return {
        statusCode: 404,
        body: JSON.stringify({
          error: true,
          errorType: 'invalid-report-id',
          message: 'Report not found!',
        }),
      };
    }

    const reportData = docSnap.data();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Get report success!',
        data: {
          id,
          ...reportData,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        errorType: 'bad-request',
        message: error.message,
      }),
    };
  }
}
