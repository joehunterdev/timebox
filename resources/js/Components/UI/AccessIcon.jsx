import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const AccessIcon = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const handleClick = () => {
        dispatch(logout());
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
