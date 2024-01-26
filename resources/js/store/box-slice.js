import { createSlice } from '@reduxjs/toolkit'
import { getEndTime, calculateNewStartTime, getHourMinsFromTime, getDateFromTime } from '../../utils/time-utils';
import { findMatchingBox, getTotalToRemove, getPlaceholder } from '../../utils/box-utils';

const boxSlice = createSlice({

    name: 'boxes',
    initialState: {
        boxes: [],
        lastUpdatedIndex: 0,
        lastTotalToRemove: {},
        selectedDate: calculateNewStartTime(new Date(), 8),
    },

    reducers: {


        setSelectedDate(state, action) {
            state.selectedDate = calculateNewStartTime(action.payload);
        },


        initPlaceholders(state, action) {
            state.boxes = Array.from({ length: action.payload.nHours * 2 }, (_, index) => {
                return getPlaceholder(`init-${index}`, calculateNewStartTime(action.payload.startDateTime, index))
            });
        },

        replaceBoxes(state, action) {
            state.boxes = action.payload.boxes;
        },

        mergeBoxes(state, action) {
            state.boxes = action.payload.boxes;
        },


        clearBoxes(state, action) {
            state.boxes = []
        },

        //Find a box by start and replace it by its start time
        mergeBoxesByStartTime(state, action) {
            state.boxes = state.boxes.map(placeholder => {
                const matchingBox = findMatchingBox(action.payload.boxes, placeholder);
                return matchingBox ? matchingBox : placeholder;
            });
        },

        // //Make start time of next box the end time of the previous box
        adjustStartTimes(state, action) {
            let lastEndTime = null;
            for (let i = 0; i < state.boxes.length - 1; i++) {
                state.boxes[i + 1].start = getEndTime(state.boxes[i].start, state.boxes[i].duration);
            }
        },

        adjustStartTimes2(state, action) {
            // Sort the boxes by start time
            state.boxes.sort((a, b) => new Date(a.start) - new Date(b.start));

            // Adjust the start times
            for (let i = 0; i < state.boxes.length - 1; i++) {
                state.boxes[i + 1].start = getEndTime(state.boxes[i].start, state.boxes[i].duration);
            }
        },

        managePlaceholders(state) {

            const currentDay = getDateFromTime(state.selectedDate); // Replace this with your function to get the current day


            // Calculate the number of boxes to remove based on the total duration
            const boxesToRemove = getTotalToRemove(state.boxes);

            // Get the last total for the current day, or 0 if it doesn't exist
            const lastTotal = state.lastTotalToRemove[currentDay] || 0;

            // Calculate the difference
            const difference = boxesToRemove - lastTotal;

            // Update the last total for the current day
            state.lastTotalToRemove[currentDay] = boxesToRemove;

            let offset = 0;

            // Use a single loop to handle both adding and removing boxes
            for (let i = 0; i < Math.abs(difference); i++) {

                if (difference > 0) {

                    //Remove free where todo will be
                    if (state.lastUpdatedIndex + i + offset + 1 < state.boxes.length) {

                        const nextBox = state.boxes[state.lastUpdatedIndex + i + offset + 1];
                        if (nextBox.status === 'free') {
                            state.boxes.splice(state.lastUpdatedIndex + i + offset + 1, 1);
                            offset--;
                        }
                    }
                    //Add free where todo was
                } else if (difference < 0) {
                    const boxToAdd = getPlaceholder("mgm-" + Math.random().toString(36).substr(2, 9), state.boxes[state.lastUpdatedIndex + i + 1].start);
                     state.boxes.splice(state.lastUpdatedIndex + i + 1, 0, boxToAdd);
                }

                //Add free where todo was from end 
                if (state.boxes[state.boxes.length - 1].status !== 'free') {
                    const lastBox = state.boxes[state.boxes.length - 1];
                    const newStartTime = calculateNewStartTime(lastBox.start, lastBox.duration);
                    const boxToAdd = getPlaceholder("mgm-" + Math.random().toString(36).substr(2, 9), newStartTime);
                    state.boxes.push(boxToAdd);
                }
            }
        },
        getBoxes(state, action) {

            if (action.payload) {
                state.boxes = action.payload.boxes;
            }
        },

        addBox(state, action) {
            state.boxes[action.payload.order] = action.payload;
        },

        deleteBox(state, action) {
            if (Number.isNaN(action.payload)) return;

            const boxToDelete = state.boxes.find(box => box.id === action.payload.id);
            if (!boxToDelete) return;

            const newBoxesCount = Math.floor(boxToDelete.duration / 30);

            const newBoxes = Array(newBoxesCount).fill().map(() => (
                 getPlaceholder("del-" + Math.random().toString(36).substr(2, 9), boxToDelete.start)
            ));
            state.boxes = state.boxes.map(box =>
                box.id === action.payload.id ? newBoxes : box
            ).flat();

        },

        updateBox(state, action) {
            const { id, ...box } = action.payload;
            const index = state.boxes.findIndex(box => box.id === id);
            if (index !== -1) {
                state.boxes[index] = { id, ...box };
            }
        },

        addLastUpdatedIndex(state, action) {
            state.lastUpdatedIndex = action.payload;
        },


    },


});






export const boxActions = boxSlice.actions;

export default boxSlice.reducer

