/*
  This file contains the functions that interact with the API 

  Functions contained in this file:
    - Login
    - Register
    - GetReport
    - GetAllReports
    - AddReport
    - LoginAdmin
    - GetAllInvalidReports
    - DeleteReport
    - VoteReport
    - ReportInvalidReport
    - GetUser

    - SaveImageToImgBB

  ---

  Endpoint:
    - Login: $baseUrl/login
    - Register: $baseUrl/register
    - GetReport: $baseUrl/get-report
    - GetAllReports: $baseUrl/get-all-reports
    - AddReport: $baseUrl/add-report
    - LoginAdmin: $baseUrl/login-admin
    - GetAllInvalidReports: $baseUrl/get-all-invalid-reports
    - DeleteReport: $baseUrl/delete-report
    - VoteReport: $baseUrl/vote-report
    - ReportInvalidReport: $baseUrl/report-invalid-report
    - GetUser: $baseUrl/get-user
    
    - SaveImageToImgBB: https://api.imgbb.com/1/upload?key=YOUR_CLIENT_API_KEY
*/

const baseUrl = '/.netlify/functions';

const APIEndpoint = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  getReport: (reportId = '') => `${baseUrl}/get-report?id=${reportId}`,
  getAllReports: `${baseUrl}/get-all-reports`,
  addReport: `${baseUrl}/add-report`,
  loginAdmin: `${baseUrl}/login-admin`,
  getAllInvalidReports: `${baseUrl}/get-all-invalid-reports`,
  deleteReport: (reportId = '') => `${baseUrl}/delete-report?id=${reportId}`,
  voteReport: `${baseUrl}/vote-report`,
  reportInvalidReport: `${baseUrl}/report-invalid-report`,
  getUser: (userId = '') => `${baseUrl}/get-user?id=${userId}`,
  getAdmin: (adminId = '') => `${baseUrl}/get-admin?id=${adminId}`,
};

class API {
  static async Login({ email = '', password = '' }) {
    // do login

    try {
      const loginResponse = await fetch(APIEndpoint.login, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const loginResponseJson = await loginResponse.json();

      return loginResponseJson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async Register({
    email = '',
    name = '',
    password = '',
    phoneNumber = '',
  }) {
    // do register

    try {
      const registerResponse = await fetch(APIEndpoint.register, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          phoneNumber,
        }),
      });

      const registerResponseJson = await registerResponse.json();

      return {
        response: registerResponse,
        json: registerResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetReport(reportId = '') {
    // get specific report

    try {
      const getReportResponse = await fetch(APIEndpoint.getReport(reportId));
      const getReportResponseJson = await getReportResponse.json();

      return {
        response: getReportResponse,
        json: getReportResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetAllReports() {
    // get all reports

    try {
      const getAllReportsResponse = await fetch(APIEndpoint.getAllReports);
      const getAllReportsResponseJson = await getAllReportsResponse.json();

      return {
        response: getAllReportsResponse,
        json: getAllReportsResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async AddReport(
    reportData = {
      userId: '',
      uploaderName: '',
      type: '',
      coordinate: {
        lat: 0,
        lng: 0,
      },
      title: '',
      description: '',
      image: {
        url: '',
        delete_url: '',
      },
    }
  ) {
    // add report

    const newReportData = {
      ...reportData,
      createdDate: new Date(),
      rating: {
        voteUp: 0,
        voteDown: 0,
      },
    };

    try {
      const addReportResponse = await fetch(APIEndpoint.addReport, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newReportData),
      });

      const addReportResponseJson = await addReportResponse.json();

      return {
        response: addReportResponse,
        json: addReportResponseJson,
      };
    } catch (error) {
      console.log(error);
      console.log(error.message);

      throw new Error(error.message);
    }
  }

  static async LoginAdmin({ email = '', password = '' }) {
    // do login for admin

    try {
      const loginAdminResponse = await fetch(APIEndpoint.loginAdmin, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const loginAdminResponseJson = await loginAdminResponse.json();

      return {
        response: loginAdminResponse,
        json: loginAdminResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetAllInvalidReports() {
    // get all invalid reports

    try {
      const getAllInvalidReportsResponse = await fetch(
        APIEndpoint.getAllInvalidReports
      );
      const getAllInvalidReportsResponseJson =
        await getAllInvalidReportsResponse.json();

      return {
        response: getAllInvalidReportsResponse,
        json: getAllInvalidReportsResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async DeleteReport(reportId = '') {
    // delete specific report

    try {
      const deleteReportResponse = await fetch(
        APIEndpoint.deleteReport(reportId),
        {
          method: 'DELETE',
        }
      );

      const deleteReportResponseJson = await deleteReportResponse.json();

      return {
        response: deleteReportResponse,
        json: deleteReportResponseJson,
      };
    } catch (error) {
      console.log(error);
      console.log(error.message);

      throw new Error(error.message);
    }
  }

  static async VoteReport({
    userId = '',
    reportId = '',
    vote = '' || 'up' || 'down',
    type = '' || 'increment' || 'decrement',
    isAdmin = false,
  }) {
    // vote specific report

    try {
      const voteReportResponse = await fetch(APIEndpoint.voteReport, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          reportId,
          vote,
          type,
          isAdmin,
        }),
      });

      const voteReportResponseJson = await voteReportResponse.json();

      return {
        response: voteReportResponse,
        json: voteReportResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async ReportInvalidReport(reportId = '') {
    // report invalid report

    try {
      const reportInvalidReportResponse = await fetch(
        APIEndpoint.reportInvalidReport,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            reportId,
          }),
        }
      );

      const reportInvalidReportResponseJson =
        await reportInvalidReportResponse.json();

      return {
        response: reportInvalidReportResponse,
        json: reportInvalidReportResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetUser(userId = '') {
    // get user data

    try {
      const getUserResponse = await fetch(APIEndpoint.getUser(userId));
      const getUserResponseJson = await getUserResponse.json();

      return {
        response: getUserResponse,
        json: getUserResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async GetAdmin(adminId = '') {
    // get user data

    try {
      const getAdminResponse = await fetch(APIEndpoint.getAdmin(adminId));
      const getAdminResponseJson = await getAdminResponse.json();

      return {
        response: getAdminResponse,
        json: getAdminResponseJson,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async SaveImageToImgBB(base64String = '') {
    const imgBBApiUrl =
      'https://api.imgbb.com/1/upload?key=e3a607723fcf74208ba8ce6cebe4ff12';

    const form = new FormData();
    form.append('image', base64String);

    try {
      const imgBBResponse = await fetch(imgBBApiUrl, {
        method: 'POST',
        body: form,
      });

      const imgBBResponseJson = await imgBBResponse.json();

      return imgBBResponseJson;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { API };
