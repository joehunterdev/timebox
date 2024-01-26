import React, { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { logout } from "../../store/auth-actions";
import {useNavigate, Link } from "react-router-dom";

const AccessIcon = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.stack.selectedDate);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const handleClick = () => {
        
        dispatch(logout());
        navigate('/auth')
        // useEffect(() => {
        //     dispatch(
        //         boxActions.initPlaceholders({
        //             nHours: 8,
        //             startDateTime: selectedDate,
        //         })
        //     );

        //     dispatch(readBoxData(selectedDate));
        // }, [selectedDate]);
    };

    return (
        <button type="button" className="btn  bg-none text-secondary">
            {isAuthenticated ? (
                <i className="fas fa-sign-out-alt" onClick={handleClick}></i>
            ) : (
                <Link to="/auth">
                    <i className="fas fa-user-circle"></i>
                </Link>
            )}
        </button>
    );
};

export default AccessIcon;
