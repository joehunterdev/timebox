import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoxData } from "../../store/box-actions";
import { useSelector } from "react-redux";
import { getNextFreePlaceholders } from "../../../utils/box-utils";
import { getHourMinsFromTime } from "../../../utils/time-utils";

import BoxTab from "./BoxTab";
import BoxForm from "./BoxForm";
import DeleteBox from "./DeleteBox";
import DraggableContainer from "../Layout/DraggableContainer";

const UpdateBox = ({ item, provided, snapshot, index }) => {
    const boxes = useSelector((state) => state.stack.boxes);
    const nextFreePlaceholders = getNextFreePlaceholders(boxes, index);
    const [isFormVisible, setFormVisible] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
         //debugger;
        const formData = new FormData(e.target.form);
         const updatedBox = {
            ...item,
            text: formData.get("text"),
            duration: formData.get("duration"),
            start: formData.get("start"),
            status: formData.get("status"),
            order: index,
        };
 
        dispatch(updateBoxData(updatedBox));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const updatedBox = {
            ...item,
            text: formData.get("text"),
            //HACK: if duration / time are null then set it to the original set in update
            duration: formData.get("duration")
                ? formData.get("duration")
                : item.duration,
            start: formData.get("start") ? formData.get("start") : item.start,
            status: formData.get("status"),
            order: index,
        };

        dispatch(updateBoxData(updatedBox));
        setFormVisible(false);
    };

    return (
        <DraggableContainer
            provided={provided}
            className={`height-${item.duration} mb-4`}
        >
            <small className="opacity-50 text-nowrap">
                {getHourMinsFromTime(item.start)}
            </small>
            <div
                className={`update-box d-flex align-items-start shadow-sm h-100`}
                {...provided.dragHandleProps}
                style={{ cursor: "grab" }}
            >
                {isFormVisible ? (
                    <>
                        <BoxForm
                            item={item}
                            nextFreePlaceholders={nextFreePlaceholders}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />

                        <DeleteBox item={item} />
                    </>
                ) : (
                    <BoxTab
                        item={item}
                        nextFreePlaceholders={nextFreePlaceholders}
                        setFormVisible={setFormVisible}
                        handleChange={handleChange}
                    />
                )}
            </div>
        </DraggableContainer>
    );
};

export default UpdateBox;
