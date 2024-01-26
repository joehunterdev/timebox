import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth-actions";
import { useNavigate, Link } from "react-router-dom";

const AccessIcon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.stack.selectedDate);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const handleClick = () => {
        dispatch(logout());
        navigate("/auth");
    };

    return (
        <button type="button" className="btn text-info opacity-75">
            {isAuthenticated ? (
                <i className="fas fa-sign-out-alt text-primary-subtle" onClick={handleClick}></i>
            ) : (
                <Link to="/auth">
                    <i className="fas fa-user-circle text-default"></i>
                </Link>
            )}
        </button>
    );
};

export default AccessIcon;
