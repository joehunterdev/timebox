import React from "react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
 
    return (
        <Link to="/profile">
             <i className="fas fa-user text-secondary"></i>
        </Link>
    );
};

export default ProfileIcon;
