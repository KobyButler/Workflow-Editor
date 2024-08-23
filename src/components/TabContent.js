/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Field from './Field'

// TabContent component for rendering all the fields within the active tab
export default function TabContent({ groups = [] }) {
    const [fieldOrder, setFieldOrder] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    // Sync fieldOrder with the incoming groups whenever groups change
    useEffect(() => {
        setFieldOrder(groups);
    }, [groups]);

    // Function to move fields within the list
    const moveField = (fromIndex, toIndex) => {
        const updatedOrder = [...fieldOrder];
        const [movedField] = updatedOrder.splice(fromIndex, 1);
        updatedOrder.splice(toIndex, 0, movedField);
        setFieldOrder(updatedOrder);
    };

    // Handle when a field starts dragging
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    // Handle when a field stops dragging
    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="field-list">
            {fieldOrder.map((group, index) => (
                <React.Fragment key={index}>
                    {draggedIndex !== null && draggedIndex === index && (
                        <div className="placeholder" style={{ height: '60px', backgroundColor: 'blue', border: '2px dashed #ccc', marginBottom: '10px' }}>
                            {/* Placeholder: Adjust styles as needed */}
                        </div>
                    )}
                    <Field
                        index={index}
                        group={group}
                        moveField={moveField}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}
