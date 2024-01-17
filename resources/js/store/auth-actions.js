import { checkAuthLoader } from '../../utils/http-utils';
import { boxActions } from './box-slice';
import { authActions } from './auth-slice';
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

      console.log("error", error);

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
       dispatch(authActions.login(authData || []));

    } catch (error) {

      console.log("error", error);

    }
  };
};