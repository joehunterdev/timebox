import { getCsrfToken } from '../../utils/http-utils';
import { boxActions } from './box-slice';
import { uiActions } from './ui-slice';
const API_URL = '/api/timeboxes/';

//Thunk Life
export const readBoxData = (date) => {

    const token = localStorage.getItem('token');

    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch(API_URL + date, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status !== 200) {
                const responseBody = await response.json();
                throw new Error(responseBody.message || 'Could not fetch box data!');
            }          
             const data = await response.json();
             return data;
        };

        try {

            const boxData = await fetchData();
             dispatch(boxActions.adjustStartTimes());

            //Merge fresh data where time is the same
            dispatch(
                boxActions.mergeBoxesByStartTime({
                    boxes: boxData || []
                })
            );


            dispatch(   
                boxActions.managePlaceholders({
                    boxes: boxData 
                }));
            
 
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message || 'Couldnt fetch boxes !',
                })
            );


        }
    };
};

//outside of slice
export const createBoxData = (box) => {

    const token = localStorage.getItem('token');

    //recieves dispatch as an argrument
    return async (dispatch) => {


        const sendRequest = async () => {
            const response = await fetch(
                API_URL.slice(0, -1),
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(box),
                }
            );

            if (!response.ok) {
                const responseBody = await response.json();
                throw new Error(responseBody.message || 'Could not create box data!');
            }
            
            const data = await response.json();
            return data.id; // Return the id
        };

        try {
            const id = await sendRequest();
            dispatch(
                boxActions.addBox({
                    ...box, id: id
                }));
            dispatch(boxActions.managePlaceholders());
            dispatch(boxActions.adjustStartTimes());
            
        } catch (error) {

            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message || 'Couldnt fetch boxes !',
                })
            );
        }
    };
}
export const updateBoxData = (box) => {


    //recieves dispatch as an argrument
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        const sendRequest = async () => {
            const response = await fetch(
                API_URL + box.id,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(box),
                }
            );

            if (!response.ok) {

                const responseBody = await response.json();
                throw new Error(responseBody.message || 'Could not update box data!');
            }
        };

        try {
            await sendRequest();

            dispatch(
                boxActions.updateBox({
                    ...box
                })
            );
            dispatch(boxActions.adjustStartTimes());
            dispatch(boxActions.addLastUpdatedIndex(box.order));
            dispatch(boxActions.managePlaceholders());


        } catch (error) {

            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message || 'Couldnt fetch boxes !',
                })
            );
        }
    };
}

export const deleteBoxData = (box) => {

    //recieves dispatch as an argrument
    return async (dispatch) => {

        const token = localStorage.getItem('token');

        const sendRequest = async () => {
            const response = await fetch(
                API_URL + box.id,
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
                throw new Error(responseBody.message || 'Could not delete box data!');
            }
        };

        try {
            await sendRequest();

            // This update local state and also modify remote
            dispatch(
                boxActions.deleteBox({
                    id: box.id
                }));



        } catch (error) {

            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message || 'Couldnt delete boxes !',
                })
            );
        }
    };
}