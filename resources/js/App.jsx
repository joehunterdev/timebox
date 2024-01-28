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
// import DemoPage from "./Components/Pages/DemoPage";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
};

const About = () => {
    return (
        <div>
            <div className="alert alert-warning text-center "> 
                 <span>Demo uses mock data and does not store anything.</span>
            </div>
            <div className="text-center">Alteratively you can <Link to="/auth">Click here to register</Link></div>
            <hr />
            <h2>
                <i className="fas opacity-75 fa-layer-group"></i>Stack
            </h2>
            <ul className="d-flex flex-row list-unstyled align-items-center justify-content-between mx-2">
                <li>
                    <i
                        className="fab fa-react fa-2x"
                        style={{ color: "#61DBFB" }}
                    ></i>{" "}
                    React
                </li>
                <li>
                    <i
                        className="fas fa-undo-alt fa-2x"
                        style={{ color: "#764ABC" }}
                    ></i>{" "}
                    Redux
                </li>
                <li>
                    <i
                        className="fab fa-laravel fa-2x"
                        style={{ color: "#FF2D20" }}
                    ></i>{" "}
                    Laravel
                </li>
            </ul>

            <hr />
            <h2>
                <i className="fas opacity-75 fa-tasks"></i> Features
            </h2>
            <ul className="list-unstyled">
                <li>
                    <i className="fas opacity-75 fa-pencil-alt"></i> Drag and Drop:
                    Easily organize your tasks with a user-friendly interface.
                </li>
                <li>
                    <i className="fas opacity-75 fa-sun"></i> Time Management: Set
                    specific time periods for tasks to improve productivity.
                </li>
                <li>
                    <i className="fas opacity-75 fa-puzzle-piece"></i> Task
                    Prioritization: Prioritize your tasks.
                </li>
                <li>
                    <i className="fas opacity-75 fa-paint-brush"></i> API: The
                    application includes an API with a well-defined data
                    structure.
                </li>
                <li>
                    <i className="fas opacity-75 fa-palette"></i> Color Tagging:
                    Assign colors to tasks for easy identification and
                    organization.
                </li>
                
                <i className="fas opacity-75 fa-user-alt"></i> User Features

                <li>
                    <ul className="list-unstyled m-2">
                        <li>
                            <i className="fas opacity-75 fa-user-plus"></i> Signup
                        </li>
                        <li>
                            <i className="fas opacity-75 fa-user-check"></i> 
                            Register
                        </li>
                        <li>
                            <i className="fas opacity-75 fa-sign-in-alt"></i> Login
                        </li>
                        <li>
                            <i className="fas opacity-75 fa-user-lock"></i> Forgot
                            password
                        </li>
                        <li>
                            <i className="fas opacity-75 fa-envelope"></i> Email
                            verification
                        </li>
                    </ul>
                </li>
            </ul>

            <hr />
            <h2>
                <i className="fas opacity-75  fa-flag-checkered"></i> Developers</h2>
            <pre>
                <code>
                    <div>
                        <ol>
                            <li>Clone the repository</li>
                            <li>
                                Install `package.json` and `composer.json`
                                dependencies
                            </li>
                            <li>
                                Create a MySQL database and update the `.env`
                                file with your database credentials
                            </li>
                            <li>
                                Run `php artisan migrate` to create the database
                            </li>
                            <li>
                                Run `php artisan db:seed` to seed the database
                            </li>
                            <li>
                                Refer to the `package.json` for available
                                commands and `webpack.mix.js` for build settings
                            </li>
                            <li>
                                Start the application by running `$ php artisan
                                serve`
                            </li>
                        </ol>
                    </div>
                </code>
            </pre>

            <a
                href="https://github.com/joehunterdev/timebox"
                target="_blank"
                rel="noopener noreferrer"
            >
                See GitHub Repository
            </a>
        </div>
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
        if (isAuthenticated) return;
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
                    message={notification.message || <About /> }
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
