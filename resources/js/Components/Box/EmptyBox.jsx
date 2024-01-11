import React, { useState } from "react";
import NewBox from "./NewBox";
import { getHourMinsFromTime } from "../../../utils/time-utils";
import DraggableContainer from "../Layout/DraggableContainer";

const EmptyBox = ({ item, provided, snapshot, index }) => {
    const [isNewBoxVisible, setNewBoxVisible] = useState(false);
    return isNewBoxVisible ? (
        <DraggableContainer provided={provided}>
            <NewBox
                provided={provided}
                snapshot={snapshot}
                item={item}
                index={index}
                setNewBoxVisible={setNewBoxVisible}
            />
            <button
                onClick={() => setNewBoxVisible(false)}
                className="btn btn-outline-secondary rounded-0 btn-xs border-0"
            >
                <i className="fas fa-close icon-hover"></i>
            </button>
        </DraggableContainer>
    ) : (
        <DraggableContainer provided={provided}>
            <small className="opacity-50 text-nowrap">
                {getHourMinsFromTime(item.start)}
            </small>
            <div
                onClick={() => setNewBoxVisible(true)}
                className="d-flex align-items-center justify-content-center height-30 align-items-center shadow-sm bg-body"
            >
                <i className="fas fa-plus icon-hover btn"></i>
            </div>
        </DraggableContainer>
    );
};

export default EmptyBox;
