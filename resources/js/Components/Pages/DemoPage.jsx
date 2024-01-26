import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthStatus } from '../actions/authActions';

const DemoPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthStatus('guest'));
    }, [dispatch]);

    return (
        <div>
            <h1>Welcome to the Demo Page</h1>
            <p>You are currently logged in as a guest.</p>
        </div>
    );
};

export default DemoPage;
