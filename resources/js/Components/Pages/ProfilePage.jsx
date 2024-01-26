import React from "react";
import { useSelector } from "react-redux";
import DeleteUser from "../User/DeleteUser";
import AccessIcon from "../UI/AccessIcon";
const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    if (user === null) {
        return false;
    }
    return (
        <div className="row mt-4 mb-4">
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-5">
                <h1>Profile Page</h1>
                <div className="d-flex flex-column align-items-start justify-content-evenly shadow-sm bg-body mt-2 p-2">
                    <p>
                        Hi <span className="text-default">{user.name}</span> ! 
                    </p>
                    <p>Email: {user.email} </p>
                    <span>
                        Delete User <DeleteUser user={user} />
                    </span>
                </div>
            </div>
            <div className="align-items-end ml-auto offset-9 ">
                <span>
                    Logout <AccessIcon />
                </span>
            </div>
        </div>
 
    );
};

export default ProfilePage;
