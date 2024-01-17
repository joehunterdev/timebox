import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";
import AuthPage from "./Components/Pages/AuthPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./Components/Pages/ProfilePage";

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
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated && (location.pathname === "/auth" || location.pathname === "/profile")) {
            navigate("/auth");
        } else if (location.pathname === "/auth") {
            navigate("/");
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
