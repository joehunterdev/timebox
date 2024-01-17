import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";
import { tokenLoader } from "../utils/http-utils";
import AuthPage from "./Components/Pages/AuthPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./Components/Pages/ProfilePage";
// import checkAuth from "./store/auth-actions";
import { authActions } from "./store/auth-slice";

// import Authentication, {
//     action as authAction,
// } from "./Components/Auth/AuthenticationPage";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
};

const AppContent = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // useEffect(() => {
    //     dispatch(authActions.checkAuth());
    // }, [dispatch, location]);
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth");
        } else if (location.pathname === "/auth") {
            navigate("/"); // or wherever your home page is
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<BoxApp />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
};

export default App;
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
