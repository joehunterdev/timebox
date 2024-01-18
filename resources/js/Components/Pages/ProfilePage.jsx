import React from "react";
import { useSelector } from "react-redux";
import DeleteUser from "../User/DeleteUser";
const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    if (user === null) {
        return false;
    }
    return (
        <div className="d-flex align-items-center justify-content-evenly shadow-sm bg-body mt-2 p-2">
            <h1>Profile Page</h1>
            <p>Hi {user.name} welcome </p>
            <p>Email: {user.email} </p>
            <DeleteUser user={user} />
        </div>
    );
};

export default ProfilePage;
