
import React from 'react';
const DailyTimeline = ({ startDay, durationDay, children }) => {
    return (
        <div className="timeline list-group" >
            <div className="timeline-hours">
                {[...Array(durationDay * 2)].map((_, index) => (
                    <div key={index} className="timeline-hour">
                        {Math.floor((startDay + index / 2) % 24)}:{index % 2 === 0 ? '00' : '30'}
                    </div>
                ))}
            </div>
            <div className="timeline-content">{children}</div>
        </div>
    );
};

export default DailyTimeline;
