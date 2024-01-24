import { checkAuthLoader } from '../../utils/http-utils';
import { boxActions } from './box-slice';
import { authActions } from './auth-slice';
import { uiActions } from './ui-slice';

import { getCsrfToken } from '../../utils/http-utils';
export const login = (email, password) => {

  return async (dispatch) => {

    const fetchData = async () => {

      //Set NEW cookie in the browser (SPA)
      await fetch('/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'same-origin',
      });

      // Then, attempt to log in
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ email, password }),
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin',
      });


      if (response.status !== 200) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Could not fetch auth data!');
      }

      const data = await response.json();
      return data;
    };


    try {

      const authData = await fetchData();
      dispatch(authActions.login(authData || []));

    } catch (error) {

      console.log("error", error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Authentication failed!',
        })
      );
    }
  };
};


export const logout = () => {

  return async (dispatch) => {

    const token = localStorage.getItem('token');
    // Then, attempt to log out
    const fetchData = async () => {
      const response = await fetch('/api/logout', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Could not fetch auth data!');
      }
    };


    try {

      const authData = await fetchData();
      dispatch(authActions.logout(authData || []));

    } catch (error) {

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Authentication failed!',
        })
      );

    }
  };
};



export const register = (name, email, password) => {

  return async (dispatch) => {

    const fetchData = async () => {


      // Then, attempt to log in
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        //body: JSON.stringify({ email, password }),
        body: JSON.stringify({ name, email, password, password_confirmation: password }),
        credentials: 'same-origin',
      });


      if (response.status !== 200) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Could not fetch auth data!');
      }

      const data = await response.json();
      return data;
    };


    try {

      const authData = await fetchData();
      //dispatch(authActions.login(authData || []));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'You have registered succesfully!',
          message: "Check your inbox for your verification link",
        })
      );

    } catch (error) {

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Authentication failed!',
        })
      );

    }
  };

};


export const forgotPassword = (email) => {

  return async (dispatch) => {

    const fetchData = async () => {

      //Set NEW cookie in the browser (SPA)
      await fetch('/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'same-origin',
      });

      // Then, attempt to log in
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ email, password }),
        body: JSON.stringify({ email }),
        credentials: 'same-origin',
      });


      if (response.status !== 200) {
        const responseBody = await response.json();
        if (responseBody.message) {

          throw new Error(responseBody.message + " Its likely you need to verfify your email");

        } else {
          throw new Error("Check your inbox and verify your email");

        }

      }

      const data = await response.json();
      return data;
    };


    try {

      const authData = await fetchData();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Reset Link Sent!',
          message: "Check your inbox for your reset link",
        })
      );
    } catch (error) {

      console.log("error", error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Authentication failed!',
        })
      );
    }
  };
};



export const resetPassword = (token, email, password) => {

  return async (dispatch) => {

    const fetchData = async () => {

      //Set NEW cookie in the browser (SPA)
      await fetch('/sanctum/csrf-cookie', {
        method: 'POST',
        credentials: 'same-origin',
      });

      // Then, attempt to log in
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ email, password }),
        body: JSON.stringify({ token, email, password, password_confirmation: password }),
        credentials: 'same-origin',
      });

      if (response.status !== 200) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Could not fetch auth data!');
      }

      const data = await response.json();
      return data;
    };


    try {

      const authData = await fetchData();
      //dispatch(authActions.login(authData || []));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Password Reset Successfully',
          message: "Please login with your new password!",
        })
      );

    } catch (error) {

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Reset failed!',
        })
      );
    }
  };
};


export const deleteUserData = (user) => {

  //recieves dispatch as an argrument
  return async (dispatch) => {

    const token = localStorage.getItem('token');

    const sendRequest = async () => {
      const response = await fetch(
        '/api/user/' + user.id,
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || 'Could not delete user data!');
      }
    };

    try {

      const autData = await sendRequest();

      dispatch(authActions.logout([]));

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: "User deleted!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message || 'Authentication failed!',
        })
      );
    }
  };


}