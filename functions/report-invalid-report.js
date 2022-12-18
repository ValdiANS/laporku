import { collection, addDoc } from 'firebase/firestore';

import { db } from './config/firebase_config';

const reportedInvalidsRef = collection(db, 'reportedInvalids');

export async function handler(event, context) {
  const { reportId } = JSON.parse(event.body);

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

  // Add a new document with a generated id.

  const newInvalidReportData = {
    reportId,
    createdDate: new Date(),
  };

  try {
    const docRef = await addDoc(reportedInvalidsRef, newInvalidReportData);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Report invalid report success!',
      }),
    };
  } catch (error) {
    return {
      statusCode: 408,
      body: JSON.stringify({
        error: true,
        errorType: 'report-invalid-report-failed',
        message: error.message,
      }),
    };
  }
}
