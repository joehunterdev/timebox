import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SelectDay from "./Overview/SelectDay";
import SelectHour from "./Overview/SelectHour";
import DailyList from "./Overview/DailyList";
import { useDispatch } from "react-redux";
import { boxActions } from "../store/box-slice";
import { readBoxData } from "../store/box-actions";

const BoxApp = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.stack.selectedDate);

    useEffect(() => {
        dispatch(
            boxActions.initPlaceholders({
                nHours: 8,
                startDateTime: selectedDate,
            })
        );

        dispatch(readBoxData(selectedDate));
    }, [selectedDate]);

    return (
        <main className="container-fluid bg-light-subtle">
            <div className="row justify-content-center mt-4 mb-4">
                <div className="col-xs-12 col-sm-12 col-md-7 col-lg-5">
                    <SelectDay selectedDate={selectedDate} />
                    <SelectHour selectedDate={selectedDate} />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-12 col-md-7 col-lg-5">
                    <DailyList></DailyList>
                </div>
            </div>
        </main>
    );
};

export default BoxApp;
