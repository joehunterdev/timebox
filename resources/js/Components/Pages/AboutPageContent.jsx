import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const AboutPageContent = () => {

    const [show, setShow] = React.useState(true);
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch(uiActions.clearNotification());
    };

    return (
        <div>
            <div className="alert alert-warning text-center "> 
                 <span>Demo uses mock data and does not store anything.</span>
            </div>
            <div className="text-center">Alteratively you can <Link to="/auth" onClick={handleClose}>Click here to register</Link></div>
            <hr />
            <h2>
                <i className="fas opacity-75 fa-layer-group"></i>Stack
            </h2>
            <ul className="d-flex flex-row list-unstyled align-items-center justify-content-between mx-2">
                <li>
                    <i
                        className="fab fa-react fa-2x"
                        style={{ color: "#61DBFB" }}
                    ></i>
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

export default AboutPageContent;