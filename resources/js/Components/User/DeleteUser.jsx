import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserData } from "../../store/auth-actions";
const DeleteBox = ({ user }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteUserData(user));
    };

    return (
        <button
            className="btn rounded-0 bg-transparent border-0 col-1  opacity-75 "
            onClick={handleDelete}
        >
            <i className="fas fa-trash "></i>
        </button>
    );
};

export default DeleteBox;
