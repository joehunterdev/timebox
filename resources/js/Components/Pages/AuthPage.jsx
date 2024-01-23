import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { login, register } from "../../store/auth-actions";
import StatusHandler from "../Layout/StatusHandler";
import { forgotPassword } from "../../store/auth-actions";
import { useLocation } from "react-router-dom";
import ResetPassword from "../Auth/ResetPassword";
const AuthPage = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Add this line
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const handleSubmit = async (e) => {
        const form = e.target;

        const formData = new FormData(e.target);
        e.preventDefault();
        if (isLogin) {
            dispatch(login(formData.get("email"), formData.get("password")));
        } else {
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
            } else {
                dispatch(
                    register(
                        formData.get("name"),
                        formData.get("email"),
                        password
                    )
                );
            }
        }
        form.reset();
    };
    const forgotPasswordHandler = () => {
        const emailInput = document.getElementById('email');
        const email = emailInput.value;
        dispatch(forgotPassword({ email }));
         dispatch(forgotPassword(email));
    };
    if (status === "reset_password_link_sent") {
        return <ResetPassword />;
    }
    return (
        <>
            <StatusHandler />

            <div className="row m-4">
                <div className="d-flex align-items-end justify-content-between ">
                    <h1>{!isLogin ? "Register" : "Login"}</h1>
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin
                            ? "New around here ? Register"
                            : "Already a user ? Login"}
                    </span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="body-bg opacity-75 h-100 border-0"
                    style={{ height: "100%" }}
                >
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input
                                id="name"
                                className="form-control  rounded-0"
                                type="text"
                                name="name"
                                required
                                minLength="2"
                                maxLength="50"
                                autoComplete="name"
                            />
                        </div>
                    )}
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
                    {!isLogin && (
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
                    )}

                    <button
                        className="btn btn-primary opacity-75   rounded-0 mt-2"
                        type="submit"
                    >
                        Submit
                    </button>

                </form>
                {isLogin && (
                    <button type="button" onClick={forgotPasswordHandler}>
                        Forgot Password
                    </button>
                )}
            </div>
        </>
    );
};

export default AuthPage;
