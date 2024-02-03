import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/index";
import Header from "./Components/Layout/Header";
import BoxApp from "./Components/BoxApp";
import AuthPage from "./Components/Pages/AuthPage";
import { useNavigate, Link } from "react-router-dom";
import ProfilePage from "./Components/Pages/ProfilePage";
import NotificationModal from "./Components/Layout/NotificationModal";
import { uiActions } from "./store/ui-slice";
import ResetPassword from "./Components/Auth/ResetPassword";
import AboutPageContent from "./Components/Pages/AboutPageContent";

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
    const notification = useSelector((state) => state.ui.notification);
    useEffect(() => {

        if (
            !isAuthenticated &&
            location.pathname === "/profile" && location.pathname !== "/about" 
            // || location.pathname === "/"
        ) {
            navigate("/auth");
        } else if (isAuthenticated && location.pathname === "/auth") {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated || location.pathname !== '/') return;
        // Dispatch a notification when the component is first mounted
        dispatch(
            uiActions.showNotification({
                status: "default",
                title: "Timeboxer",
             })
        );
    }, [navigate]);

    return (
        <>
            {notification && (
                <NotificationModal
                    status={notification.status}
                    title={notification.title}
                    message={notification.message || <AboutPageContent /> }
                />
            )}
            <Header />
            <main className="container-fluid bg-light-subtle">
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    {/* <Route path="/demo" element={<DemoPage />} /> */}
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
