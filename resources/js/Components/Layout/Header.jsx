import React from "react";
import SelectDayCalendar from "../Overview/SelectDayCalendar";

const Header = () => {
    return (
        <header className="shadow-sm">
            <nav className="navbar bg-body-tertiary d-flex align-items-center  justify-content-between  p-1">
                <div>
                    <a
                        href="https://joehunter.es"
                        className="link-body-emphasis text-decoration-none d-block"
                    >
                        <img
                            src="images/logo_75.png"
                            alt="Logo"
                            height="30px"
                        />
                    </a>
                </div>
                <div>
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
