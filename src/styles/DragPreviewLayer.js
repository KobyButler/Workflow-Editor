/* eslint-disable no-unused-vars */
import React from 'react';
import { useDragLayer } from 'react-dnd';
import Field from '../components/Field';

const DragPreviewLayer = () => {
    const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }

    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

    return (
        <div className="drag-preview-layer">
            <div
                style={{
                    transform,
                    WebkitTransform: transform,
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 1000,
                    left: 0,
                    top: 0,
                    width: '365px',
                    height: 'auto',
                }}
            >
                {/* Render the Field component exactly as it appears */}
                <div style={{ opacity: 0.8 }}>
                    <Field group={item.group} index={item.index} moveField={() => { }} />
                </div>
            </div>
        </div>
    );
};

export default DragPreviewLayer;
