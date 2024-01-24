import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const StatusHandler = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    let varaity = 'info';

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        if (status) {
            let message;
            switch (status) {
                case 'invalid_verification_link':
                    message = 'Invalid verification link';
                    varaity = 'error';
                    break;
                case 'email_already_verified':
                    message = 'Email already verified';
                    varaity = 'info';

                    break;
                case 'email_verified_successfully':
                    message = 'Email verified successfully';
                    varaity = 'success';

                    break;
                default:
                    varaity = 'default';
                    message = 'info';
            }

            if (message) {
                dispatch(uiActions.showNotification({
                    status: varaity,
                    title: varaity.charAt(0).toUpperCase() + varaity.slice(1),
                    message: message,
                }));
            }
        }
    }, [location, dispatch]);

    return null; // This component doesn't render anything
};

export default StatusHandler;