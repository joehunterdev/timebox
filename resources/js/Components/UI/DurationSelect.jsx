// DurationSelect.jsx
import React from "react";
import { getNextFreePlaceholders } from "../../../utils/box-utils";

const DurationSelect = ({ defaultValue, nextFreePlaceholders } = {}) => {

    const boxes = useSelector((state) => state.stack.boxes); // Replace `state.boxes` with the correct path to the `boxes` array in your state
    const nextFreePlaceholders = getNextFreePlaceholders(boxes, index);
return (
    <select type="text" name="duration" defaultValue={defaultValue}>
        <option value="30">30mins</option>
        <option value="60" disabled={nextFreePlaceholders < 1}>
            60mins
        </option>
        <option value="90" disabled={nextFreePlaceholders < 2}>
            1.5 Hrs
        </option>
        <option value="120" disabled={nextFreePlaceholders < 3}>
            2 Hrs
        </option>
        <option value="180" disabled={nextFreePlaceholders < 4}>
            3 Hrs
        </option>
        <option value="240" disabled={nextFreePlaceholders < 5}>
            4 Hrs
        </option>
    </select>);
);

export default DurationSelect;
