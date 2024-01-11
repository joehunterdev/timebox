import { getCsrfToken } from '../../utils/http-utils';
import { boxActions } from './box-slice';
const API_URL = '/api/timeboxes/';

export const readBoxData = (date) => {


    return async (dispatch) => {

        const fetchData = async () => {
             const response = await fetch(API_URL + date, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });
        
            if (response.status !== 200) {
                throw new Error('Could not fetch box data!');
            }
        
            const data = await response.json();
        
            return data;
        };
        // const fetchData = async () => {
        //      const response = await fetch(API_URL + date);
        //     if (response.status !== 200) {

        //         throw new Error('Could not fetch box data!');
        //     }

        //     const data = await response.json();

        //     return data;
        // };

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
                    boxes: boxData || []
                }));



        } catch (error) {
            console.log("error", error);

        }
    };
};

//Thunk
//outside of slice
export const createBoxData = (box) => {

    //recieves dispatch as an argrument
    return async (dispatch) => {


        const sendRequest = async () => {
            const response = await fetch(
                API_URL.slice(0, -1),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken(),

                        
                    },
                    body: JSON.stringify(box),
                }
            );

            if (!response.ok) {
                throw new Error('Sending box data failed.'+ response.message);
            }

            // const data =  response.json();
            // return data.id;
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

            console.log(error)
        }
    };
}
export const updateBoxData = (box) => {


    //recieves dispatch as an argrument
    return async (dispatch) => {

        const sendRequest = async () => {
            const response = await fetch(
                API_URL + box.id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken(),

                    },
                    body: JSON.stringify(box),
                }
            );

            if (!response.ok) {

                throw new Error('Updating box data failed.' + response.message );
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
  
            console.log(error.message)
        }
    };
}

export const deleteBoxData = (box) => {

    //recieves dispatch as an argrument
    return async (dispatch) => {


        const sendRequest = async () => {
            const response = await fetch(
                API_URL + box.id,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCsrfToken(),

                    },
                }
            );

            if (!response.ok) {
                throw new Error('Deleting box data failed.');
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
        
            console.log("error", error.message)
        }
    };
}