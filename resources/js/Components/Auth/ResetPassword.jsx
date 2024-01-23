import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { login, register } from "../../store/auth-actions";
import StatusHandler from "../Layout/StatusHandler";
import { resetPassword } from "../../store/auth-actions";
const ResetPassword = () => {
    const dispatch = useDispatch();
    // const [isFormVisible, setFormVisible] = useState(false);
    // const [isLogin, setIsLogin] = useState(true); // Add this line

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
        } else {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");
            dispatch(resetPassword( token, formData.get("email"), password));
        }

        form.reset();
    };

    return (
        <>
            <StatusHandler />

            <div className="row m-4">
                <div className="d-flex align-items-end justify-content-between "></div>
                <form
                    onSubmit={handleSubmit}
                    className="body-bg opacity-75 h-100 border-0"
                    style={{ height: "100%" }}
                >
                    {" "}
                    <h1>Reset Your password</h1>
                    <span onClick={() => setIsLogin(!isLogin)}>
                       
                    </span>
                    
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
                    <button type="submit">Reset</button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
