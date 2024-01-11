import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
 import moment from "moment-timezone";
import { boxActions } from "../../store/box-slice";
const SelectHour = ({ selectedDate }) => {
    const dispatch = useDispatch();

    const handleNextHour = () => {
        const nextHour = moment(selectedDate)
            .add(1, "hours")
            .format("YYYY-MM-DD HH:mm:ss");

        dispatch(boxActions.setSelectedDate(nextHour));
    };

    const handlePreviousHour = () => {
        const previousHour = moment(selectedDate)
            .subtract(1, "hours")
            .format("YYYY-MM-DD HH:mm:ss");
        dispatch(boxActions.setSelectedDate(previousHour));
    };
    return (
        <div className="d-flex align-items-center justify-content-evenly shadow-sm bg-body mt-2 p-2">
            <i
                className="fas fa-2x fa-chevron-left text-secondary opacity-25 btn"
                onClick={handlePreviousHour}
            ></i>
            <h3 className="mx-2">
                {selectedDate ? moment(selectedDate).format("HH:mm") : ""}
            </h3>
            <i
                className="fas fa-2x fa-chevron-right text-secondary opacity-25 btn"
                onClick={handleNextHour}
            ></i>
        </div>
    );
};

export default SelectHour;
