import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { boxActions } from "../../store/box-slice";
import { getDateFromTime, getDateTime } from "../../../utils/time-utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectDayCalendar = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.stack.selectedDate);
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, [selectedDate]);
    return (
        <div className="w-100 btn">
            <DatePicker
                wrapperClassName="timebox-date-picker"
                selected={new Date(selectedDate)}
                onChange={(date) =>
                    dispatch(boxActions.setSelectedDate(getDateFromTime(date)))
                }
                customInput={
                    <i className="fas fa-calendar-alt text-secondary pl-4"></i>
                }
            />
        </div>
    );
};

export default SelectDayCalendar;
