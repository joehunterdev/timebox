import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import StatusHandler from "../Layout/StatusHandler";
import { resetPassword, forgotPassword } from "../../store/auth-actions";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
const ResetPassword = () => {
    const location = useLocation();
    const notification = useSelector((state) => state.ui.notification);
    const token = new URLSearchParams(location.search).get("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [isFormVisible, setFormVisible] = useState(false);
    // const [isLogin, setIsLogin] = useState(true); // Add this line
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    useEffect(() => {
        if(notification?.status === "success") {
            navigate("/auth");
        }
    }, [notification]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(e.target);

        const password = formData.get("password");
        const passwordConfirmation = formData.get("password_confirmation");
        if (password !== passwordConfirmation) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Passwords don't match",
                })
            );
            return;
        }

        if (!token) {
            dispatch(forgotPassword(formData.get("email")));
            // setIsResettingPassword(true);
        } else {
            dispatch(resetPassword(token, formData.get("email"), password));
        }

        form.reset();
    };
    /*
        const forgotPasswordHandler = () => {
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        dispatch(forgotPassword({ email }));
        dispatch(forgotPassword(email));
    };
    if (status === "reset_password_link_sent") {
        return <ResetPassword />;
    }
    */
    return (
        <div className="row justify-content-center mt-4 mb-4">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <StatusHandler />

                <div className="row m-4">
                    <div className="d-flex align-items-end justify-content-between "></div>
                    <form
                        onSubmit={handleSubmit}
                        className="body-bg opacity-75 h-100 border-0"
                        style={{ height: "100%" }}
                    >
                        <h1>
                            {!token
                                ? "Confirm your email"
                                : "Reset Your Password"}
                        </h1>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="form-control  rounded-0"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                            />
                        </div>
                        {token && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        className="form-control rounded-0"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="off"
                                        // minLength="8"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_confirmation">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        className="form-control  rounded-0"
                                        type="password"
                                        name="password_confirmation"
                                        required
                                        minLength="8"
                                        autoComplete="current-password"
                                    />
                                </div>
                            </>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary opacity-75   rounded-0 mt-2"
                        >
                            Reset
                        </button>
                    </form>
                    {/* {notfication.status === 'success' && ( */}
                        <Link
                            type="button"
                            className="btn btn-link"
                            to="/auth"
                        >
                            Login
                        </Link>
                    {/* )} */}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
