import React from "react";
import { useSelector } from "react-redux";
const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    if(user === null) {return false}
    return (
        <div className="row">
            <div className="card card-default">
                <h1>Profile Page</h1>
                <p>Hi {user.name} welcome </p>
                <p>Email: {user.email} </p>
            </div>
        </div>
    );
};

export default ProfilePage;
