import { authActions } from './auth-slice';

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
                throw new Error('Deleting user data failed.');
            }
        };

        try {

            await sendRequest();

            // This update local state and also modify remote
            dispatch(
                authActions.logout({
                    id: user.id
                }));
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

// //Thunk Life
// export const updateUserData = (user) => {

//     //recieves dispatch as an argrument
//     return async (dispatch) => {
//         const token = localStorage.getItem('token');
//         const sendRequest = async () => {
//             const response = await fetch(
//                 API_URL + user.id,
//                 {
//                     method: 'PUT',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(user),
//                 }
//             );

//             if (!response.ok) {

//                 throw new Error('Updating user data failed.' + response.message);
//             }
//         };

//         try {
//             await sendRequest();

//             dispatch(
//                 userActions.updateUser({
//                     ...user
//                 })
//             );


//         } catch (error) {

//             console.log(error.message)
//         }
//     };
// }

// export const deleteUserData = (user) => {

//     //recieves dispatch as an argrument
//     return async (dispatch) => {

//         const token = localStorage.getItem('token');

//         const sendRequest = async () => {
//             const response = await fetch(
//                 API_URL + user.id,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },

//                 }
//             );

//             if (!response.ok) {
//                 throw new Error('Deleting user data failed.');
//             }
//         };

//         try {
//             await sendRequest();

//             // This update local state and also modify remote
//             dispatch(
//                 userActions.deleteUser({
//                     id: user.id
//                 }));



//         } catch (error) {

//             console.log("error", error.message)
//         }
//     };

// }