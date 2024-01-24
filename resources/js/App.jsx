import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";
import AuthPage from "./Components/Pages/AuthPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./Components/Pages/ProfilePage";
import NotificationModal from "./Components/Layout/NotificationModal";
import StatusHandler from "./Components/Layout/StatusHandler";
import ResetPassword from "./Components/Auth/ResetPassword";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
};

// const PrivateRoute = ({ element, ...rest }) => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     <Route
//         path={path}
//         element={isAuthenticated ? props.element : <Navigate to="/auth" />}
//         {...props}
//     />;
// };

const AppContent = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        if (
            !isAuthenticated &&
            (location.pathname === "/profile" || location.pathname === "/")
        ) {
            navigate("/auth");
        } else if (isAuthenticated && location.pathname === "/auth") {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {notification && (
                <NotificationModal
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Header />
            <main className="container-fluid bg-light-subtle">
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/" element={<BoxApp />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
