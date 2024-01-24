import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserData } from "../../store/auth-actions";
import { uiActions } from "../../store/ui-slice";
const DeleteBox = ({ user }) => {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
        dispatch(
            uiActions.showNotification({
                status: "warning",
                title: "Warning!",
                message: "You're about to delete your account. Are you sure?",
            })
        );
    };

    const handleConfirm = () => {
        dispatch(deleteUserData(user));
        setShowConfirm(false);
    };

    return (
        <>
            {showConfirm ? (
                <button
                    className="btn rounded-0 bg-transparent border-0 col-1  opacity-75 "
                    onClick={handleConfirm}
                >
                    <i className="fas fa-trash text-danger"></i>
                </button>
            ) : (
                <button
                    className="btn rounded-0 bg-transparent border-0 col-1  opacity-75 "
                    onClick={handleDelete}
                >
                    <i className="fas fa-trash "></i>
                </button>
            )}
        </>
    );
};

export default DeleteBox;
