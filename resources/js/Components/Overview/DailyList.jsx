import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateBoxData } from "../../store/box-actions";
import { boxActions } from "../../store/box-slice";
import { useSelector, useDispatch } from "react-redux";
import { calculateNewStartTime } from "../../../utils/time-utils";
import EmptyBox from "../Box/EmptyBox";
import UpdateBox from "../Box/UpdateBox";

function DailyList() {
    const dispatch = useDispatch();
    const boxes = useSelector((state) => state.stack.boxes);
    const selectedDate = useSelector((state) => state.stack.selectedDate);

    const handleDragEnd = (result) => {

        // Ignore drops outside the list
        if (!result.destination) {
            return;
        }

        const newBoxes = Array.from(boxes);
        const [draggedBox] = newBoxes.splice(result.source.index, 1);
        newBoxes.splice(result.destination.index, 0, draggedBox);

        dispatch(boxActions.replaceBoxes({ boxes: newBoxes || [] }));

        newBoxes.forEach((box, index) => {
            let newStartTime = calculateNewStartTime(selectedDate, index);

            if (box.order !== index && box.status !== "free") {
                dispatch(
                    updateBoxData({
                        ...box,
                        order: index,  
                        start: newStartTime,
                    })
                );
            } else {

                dispatch(
                    //If its a placeholder then just update the redux store
                    boxActions.updateBox({
                        ...box,
                        order: index,
                        start: newStartTime,
                    })
                );
            }
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {boxes.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                                                // draggableId={
                                //     item && item.id
                                //         ? item.id.toString()
                                //         : Math.random().toString()
                                // }

                                index={index}
                            >
                                {(provided, snapshot) =>
                                    item.status === "free" ? (
                                        <EmptyBox
                                            provided={provided}
                                            snapshot={snapshot}
                                            item={item}
                                            index={index}
                                        />
                                    ) : (
                                        <UpdateBox
                                            provided={provided}
                                            snapshot={snapshot}
                                            item={item}
                                            index={index}
                                        />
                                    )
                                }
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DailyList;
