import React from "react";
import SelectDayCalendar from "../Overview/SelectDayCalendar";
import AccessIcon from "../UI/AccessIcon";
import ProfileIcon from "../UI/ProfileIcon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <header className="shadow-sm">
            <nav className="navbar bg-body-tertiary d-flex align-items-center  justify-content-between  p-1">
                <div className="d-flex justify-content-start">
                    <Link
                        to={isAuthenticated ? "/" : "/auth"}
                        className="link-body-emphasis text-decoration-none d-block"
                    >
                        <img
                            src="images/logo_75.png"
                            alt="Logo"
                            height="30px"
                        />
                    </Link>
                </div>
                <>
                    <div>
                        <SelectDayCalendar />
                    </div>
                    <div className="d-flex justify-content-end">
                        {isAuthenticated && user?.name ? (
                            <ProfileIcon />
                        ) : (
                            <AccessIcon />
                        )}
                    </div>
                </>
            </nav>
        </header>
    );
};

export default Header;

/*
            <nav className="navbar bg-body-tertiary border-bottom p-1 container-fluid">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div>
                            <a
                                href="/"
                                className="link-body-emphasis text-decoration-none d-block"
                            >
                                <img
                                    src="images/logo_75.png"
                                    alt="Logo"
                                    height="30px"
                                />
                            </a>
                        </div>
                        <div >
                            <SelectDayCalendar />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn  bg-none text-secondary"
                            >
                                <i className="fas fa-user"></i>
                            </button>
                        </div>
                    </div>
            </nav>
        </header>
*/
