import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoxData, readBoxData } from "../../store/box-actions";
import { useSelector } from "react-redux";
import { getNextFreePlaceholders } from "../../../utils/box-utils";
import { getHourMinsFromTime } from "../../../utils/time-utils";
import DeleteBox from "./DeleteBox";
import DraggableContainer from "../Layout/DraggableContainer";
import BoxForm from "./BoxForm";
const NewBox = ({ item, provided, snapshot, index, setNewBoxVisible }) => {
    const boxes = useSelector((state) => state.stack.boxes);
    let nextFreePlaceholders = getNextFreePlaceholders(boxes, index);
    const [duration, setDuration] = useState("30");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const formData = new FormData(e.target.form);
        const newDuration = formData.get("duration");
        setDuration(newDuration);
    };

    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        e.preventDefault();
        const newBox = {
            start: formData.get("start"),
            status: formData.get("status"),
            text: formData.get("text"),
            duration: formData.get("duration"),
            order: index,
        };
        dispatch(createBoxData(newBox));
    };
    return (
        <DraggableContainer
            provided={provided}
            className={`height-${duration}`}
        >
            <small className="opacity-50 text-nowrap">
                {getHourMinsFromTime(item.start)}
            </small>
            <div
                className={`new-box d-flex shadow-sm height-30 align-items-start`}
                {...provided.dragHandleProps}
                style={{ cursor: "grab" }}
            >
                <BoxForm
                    item={item}
                    nextFreePlaceholders={nextFreePlaceholders}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                 />
                <button
                    type="submit"
                    onClick={()=>setNewBoxVisible(false)}
                    className="btn btn-outline-secondary rounded-0 btn-xs border-0"
                >
                    <i className="fas fa-close icon-hover"></i>
                </button>
            </div>
        </DraggableContainer>
    );
};

export default NewBox;
