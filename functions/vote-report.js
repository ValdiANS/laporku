import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { db } from './config/firebase_config';

export async function handler(event, context) {
  /*
    vote = 'up' || 'down'
    type = 'increment' || 'decrement'
  */

  const {
    userId = '',
    reportId = '',
    vote = '',
    type = '',
    isAdmin = false,
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

  try {
    const reportRef = doc(db, 'reports', reportId);
    const reportSnap = await getDoc(reportRef);

    if (!reportSnap.exists()) {
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

    let userRef;

    if (isAdmin) {
      userRef = doc(db, 'admins', userId);
    } else {
      userRef = doc(db, 'users', userId);
    }

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log('User not found!');

      return {
        statusCode: 404,
        body: JSON.stringify({
          error: true,
          errorType: 'invalid-user-id',
          message: 'User not found!',
        }),
      };
    }

    // Atomically increment the vote rating of the report by 1.
    if (type === 'increment') {
      if (vote === 'up') {
        await updateDoc(reportRef, {
          'rating.voteUp': increment(1),
        });
      }

      if (vote === 'down') {
        await updateDoc(reportRef, {
          'rating.voteDown': increment(1),
        });
      }

      await updateDoc(userRef, {
        ratedReport: arrayUnion({
          reportId,
          vote,
        }),
      });
    }

    // Atomically decrement the vote rating of the report by 1.
    if (type === 'decrement') {
      if (vote === 'up') {
        await updateDoc(reportRef, {
          'rating.voteUp': increment(-1),
        });
      }

      if (vote === 'down') {
        await updateDoc(reportRef, {
          'rating.voteDown': increment(-1),
        });
      }

      await updateDoc(userRef, {
        ratedReport: arrayRemove({
          reportId,
          vote,
        }),
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `${
          type === 'increment'
            ? `Vote ${vote}`
            : type === 'decrement'
            ? `Unvote ${vote}`
            : 'Rating'
        } report success!`,
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
