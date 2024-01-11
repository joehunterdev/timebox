import { isSameTime, getEndTime, getDateTime } from "./time-utils";


const findMatchingBox = (boxes, placeholder) => {

    return boxes.find(box => {
        const boxStart = new Date(box.start);
        const placeholderStart = new Date(placeholder.start);

        return isSameTime(boxStart, placeholderStart);
    });
};

const getPlaceholder = (id, start) => {
    return {
        id: id,
        status: "free",
        text: "",
        duration: 30,
        start: start,
    };
}



const getTotalToRemove = (boxes) => {
    return boxes.reduce((total, box) => {
        if (box.status !== 'free') {
            // Subtract one from the number of 30-minute slots occupied by the box
            return total + Math.max(0, Math.ceil(box.duration / 30) - 1);
        } else {
            // If the box is free, just return the current total
            return total;
        }
    }, 0);
};


const getNextFreePlaceholders = (boxes, currentIndex) => {

    let freePlaceholders = 0;

    for (let i = currentIndex + 1; i < boxes.length; i++) {
        if (boxes[i].status === 'free') {
            freePlaceholders += Math.ceil(boxes[i].duration / 30);
        } else {
            break;
        }
    }

    return freePlaceholders;
};

const getStatusClassName = (item) => {
    const currentTime = getDateTime();
    const itemEndTime = getEndTime(item.start, item.duration)

    if (item.status === 'doing') {
        return 'bg-info-subtle'; // Blue for in progress tasks
    } else if (item.status === 'done') {
        return 'bg-success-subtle'; // Green for done tasks
    } else if (item.status === 'todo') {
        if (currentTime < item.start) {
            return 'bg-warning-subtle'; // Amber for future tasks
        } else if (currentTime > itemEndTime) {
            return 'bg-danger-subtle'; // Red for past tasks
        } else {
            return 'bg-info-subtle'; // Blue for current tasks
        }
    } else {
        return ''; // Default case (should not be reached)
    }
}

export { getPlaceholder, findMatchingBox, getTotalToRemove, getNextFreePlaceholders, getStatusClassName };
