import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const StatusHandler = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');

        if (status) {
            let message;
            switch (status) {
                case 'invalid_verification_link':
                    message = 'Invalid verification link';
                    break;
                case 'email_already_verified':
                    message = 'Email already verified';
                    break;
                case 'email_verified_successfully':
                    message = 'Email verified successfully';
                    break;
                default:
                    message = '';
            }

            if (message) {
                dispatch(uiActions.showNotification({
                    status: 'info',
                    title: 'Info',
                    message: message,
                }));
            }
        }
    }, [location, dispatch]);

    return null; // This component doesn't render anything
};

export default StatusHandler;