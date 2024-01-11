import React from "react";
import { getStatusClassName } from "../../../utils/box-utils";
import { useDispatch } from "react-redux";
import { updateBoxData } from "../../store/box-actions";
const BoxTab = ({ item, setFormVisible,nextFreePlaceholders }) => {
    const dispatch = useDispatch();
    const statusClass = getStatusClassName(item);

    // In BoxTab.jsx
    const handleStatusClick = () => {
        const statuses = ["todo",  "done"];
        //const statuses = ["todo", "doing", "done"];

        const currentIndex = statuses.indexOf(item.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

        const updatedBox = {
            ...item,
            status: nextStatus,
        };

        dispatch(updateBoxData(updatedBox));
    };

    const handleDurationClick = () => {
        const durations = [30, 60, 90, 120, 180, 240].slice(0, nextFreePlaceholders + 1);
        const currentIndex = durations.indexOf(item.duration);
        const nextIndex = (currentIndex + 1) % durations.length;
    
        const updatedBox = {
            ...item,
            duration: durations[nextIndex],
        };
        dispatch(updateBoxData(updatedBox));
    };

    return (
        <form
            className={`d-flex align-items-start justify-content-center shadow-sm  w-100  height-${item.duration} ${statusClass}`}
        >
            <h4 className="opacity-75 w-100 py-1 px-3 mb-1">
                {item.text.substring(0, 20)}
            </h4>
            <button
                onClick={() => setFormVisible(true)}
                type="button"
                className="btn btn-outline-secondary rounded-0  border-0"
            >
                <i className="fas fa-pencil-alt icon-hover"></i>
            </button>
            <button
                onClick={handleDurationClick}
                type="button"
                className="btn btn-outline-secondary rounded-0  border-0"
            >
                <i className="fas fa-clock icon-hover"></i>
            </button>
            <button
                onClick={handleStatusClick}
                type="button"
                className="btn btn-outline-secondary rounded-0  border-0"
            >
                <i
                    className={
                        item.status === "todo"
                            ? "fas fa-spinner icon-hover"
                            : item.status === "doing"
                            ? "fas fa-spinner icon-hover"
                            : "fas fa-check-square bg-primary-subtle icon-hover"
                    }
                ></i>
            </button>
        </form>
    );
};

export default BoxTab;
