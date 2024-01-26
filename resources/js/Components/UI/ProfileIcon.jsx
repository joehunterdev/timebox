import React from "react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
 
    return (
        <Link to="/profile" className="btn text-default">
             <i className="fas fa-user text-secondary opacity-75"></i>
        </Link>
    );
};

export default ProfileIcon;
