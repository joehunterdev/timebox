// ContainerComponent.jsx
import React from 'react';

const DraggableContainer = ({ children, provided, handleClick, className }) => {
    return (
        <div className="row mb-4">
            <div
                className={`col-lg-12 col-lg-offset-2 col-xs-12 ${className}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={handleClick}
            >
                {children}
            </div>
        </div>
    );
};

export default DraggableContainer;