import {
  doc,
  deleteDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { db } from './config/firebase_config';

export async function handler(event, context) {
  const { id = '' } = event.queryStringParameters;

  const incomingHttpMethod = event.httpMethod;

  if (incomingHttpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: true,
        message: 'Method Not Allowed!',
      }),
    };
  }

  try {
    const reportRef = doc(db, 'reports', id);
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

    const deletedReportImageData = {
      reportId: reportSnap.id,
      image_delete_url: reportSnap.data().image.delete_url,
      image_url: reportSnap.data().image.url,
    };

    const deletedReportImageRef = collection(db, 'deletedReportImage');
    const addDeletedReportImageRef = await addDoc(
      deletedReportImageRef,
      deletedReportImageData
    );

    const reportedInvalidsCollectionRef = collection(db, 'reportedInvalids');
    const getReportedInvalidsQuery = query(
      reportedInvalidsCollectionRef,
      where('reportId', '==', id)
    );

    const getReportedInvalidsQuerySnapshot = await getDocs(
      getReportedInvalidsQuery
    );

    getReportedInvalidsQuerySnapshot.forEach(async (reportInvalidDoc) => {
      const reportInvalidDocRef = doc(
        db,
        'reportedInvalids',
        reportInvalidDoc.id
      );
      // Hapus report reported invalid
      await deleteDoc(reportInvalidDocRef);
    });

    // Hapus report
    await deleteDoc(reportRef);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Delete report success!',
        data: {
          id,
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
