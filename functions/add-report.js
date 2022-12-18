import { collection, addDoc } from 'firebase/firestore';

import { db } from './config/firebase_config';

const reportsRef = collection(db, 'reports');

export async function handler(event, context) {
  const {
    userId = '',
    uploaderName = '',
    type = '',
    coordinate = {
      lat: 0,
      lng: 0,
    },
    title = '',
    description = '',
    image = {
      url: '',
      delete_url: '',
    },
    createdDate = new Date(),
    rating = {
      voteUp: 0,
      voteDown: 0,
    },
  } = JSON.parse(event.body);

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

  const newReportData = {
    userId,
    uploaderName,
    type,
    coordinate,
    title,
    description,
    image,
    createdDate,
    rating,
  };

  // Add a new document with a generated id.

  try {
    const docRef = await addDoc(reportsRef, newReportData);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Add report success!',
      }),
    };
  } catch (error) {
    return {
      statusCode: 408,
      body: JSON.stringify({
        error: true,
        errorType: 'add-report-failed',
        message: error.message,
      }),
    };
  }
}
