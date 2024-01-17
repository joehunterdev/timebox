import React from "react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
    // const handleClick = () => {
    //     history.push("/profile");
    // };

    return (
        <Link to="/profile">
            Hi 
            <i className="fas fa-user"></i>
        </Link>
    );
};

export default ProfileIcon;
