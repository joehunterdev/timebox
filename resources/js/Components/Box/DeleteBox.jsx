import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBoxData }  from '../../store/box-actions';

const DeleteBox = ({ item }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteBoxData(item));
    };

    return (
        <button className="btn rounded-0 bg-transparent border-0 col-1  opacity-75 " onClick={handleDelete}>
            <i className="fas fa-trash "></i>
        </button>
    );
};

export default DeleteBox;
