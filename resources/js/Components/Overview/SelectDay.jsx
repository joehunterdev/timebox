import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

import moment from "moment-timezone";
import { boxActions } from "../../store/box-slice";
import { readBoxData } from "../../store/box-actions";
import { calculateNewStartTime } from "../../../utils/time-utils";

const SelectDay = ({ selectedDate }) => {
    const dispatch = useDispatch();

    const handleNextDay = () => {
        const nextDay = moment(selectedDate)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss");

        dispatch(boxActions.setSelectedDate(nextDay));
    };

    const handlePreviousDay = () => {
        const previousDay = moment(selectedDate)
            .subtract(1, "days")
            .format("YYYY-MM-DD HH:mm:ss");

        dispatch(boxActions.setSelectedDate(previousDay));
    };

    return (
        <div className="d-flex align-items-center justify-content-evenly shadow-sm bg-body p-2">
            <i
                className="fas fa-2x fa-chevron-left text-secondary opacity-25 btn"
                onClick={handlePreviousDay}
            ></i>
            <h3 className="mx-2">
                {selectedDate ? moment(selectedDate).format("ddd Do") : ""}
            </h3>
            <i
                className="fas fa-2x fa-chevron-right text-secondary opacity-25 btn"
                onClick={handleNextDay}
            ></i>
        </div>
    );
};

export default SelectDay;
