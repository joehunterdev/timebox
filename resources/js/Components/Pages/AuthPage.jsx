import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { login, register } from "../../store/auth-actions";
const AuthPage = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setFormVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Add this line

    const handleSubmit = async (e) => {
        const formData = new FormData(e.target);
        e.preventDefault();
        if (isLogin) {
            dispatch(login(formData.get("email"), formData.get("password")));
        } else {
            const password = formData.get("password");
            const passwordConfirmation = formData.get("password_confirmation");
            if (password !== passwordConfirmation) {
                alert("Passwords do not match");
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
    };

    return (
        <div className="row m-4">
            <div className="d-flex align-items-end justify-content-between ">
                <h1>
                    {!isLogin
                        ? "Register"
                        : "Login"}
                </h1>
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
                            className="form-control"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            className="form-control"
                            type="password"
                            name="password_confirmation"
                            required
                            autoComplete="new-password"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                        required
                        autoComplete="off"
                    />
                </div>

                <button className="btn btn-primary mt-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AuthPage;