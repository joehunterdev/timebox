import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { boxActions } from "../../store/box-slice";
import { calculateNewStartTime } from "../../../utils/time-utils";
import { useSelector } from "react-redux";

const SelectDayCalendar = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.stack.selectedDate);

    return (
        <div className="w-100 btn">
            <DatePicker
                wrapperClassName="timebox-date-picker"
                selected={new Date(selectedDate)}
                onChange={(date) =>
                    dispatch(boxActions.setSelectedDate(calculateNewStartTime(date)))
                }
                customInput={
                    <i className="fas fa-calendar-alt text-secondary pl-4"></i>
                }
            />
        </div>
    );
};

export default SelectDayCalendar;
