import { collection, getDocs } from 'firebase/firestore';

import { db } from './config/firebase_config';

const reportsRef = collection(db, 'reports');

export async function handler(event, context) {
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
    const querySnapshot = await getDocs(reportsRef);
    const formattedReports = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Get all report success!',
        data: {
          reports: formattedReports,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 408,
      body: JSON.stringify({
        error: true,
        errorType: 'get-report-failed',
        message: error.message,
      }),
    };
  }
}
