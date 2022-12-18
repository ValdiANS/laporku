import { collection, getDocs } from 'firebase/firestore';

import { db } from './config/firebase_config';

const reportedInvalidsRef = collection(db, 'reportedInvalids');

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
    const querySnapshot = await getDocs(reportedInvalidsRef);
    const formattedReportedInvalids = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Get all invalid report success!',
        data: {
          invalidReports: formattedReportedInvalids,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 408,
      body: JSON.stringify({
        error: true,
        errorType: 'get-reported-invalids-failed',
        message: error.message,
      }),
    };
  }
}
