import React, { useState, useEffect } from 'react';
import Field from './Field';

export default function TabContent({ groups = [] }) {
    const [fieldOrder, setFieldOrder] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        setFieldOrder(groups);
    }, [groups]);

    const moveField = (fromIndex, toIndex) => {
        const updatedOrder = [...fieldOrder];
        const [movedField] = updatedOrder.splice(fromIndex, 1);
        updatedOrder.splice(toIndex, 0, movedField);
        setFieldOrder(updatedOrder);
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="field-list">
            {fieldOrder.map((group, index) => (
                <React.Fragment key={`${group.key || index}-${index}`}>
                    {draggedIndex !== null && draggedIndex === index && (
                        <div className="placeholder" style={{ height: '60px', backgroundColor: '#f0f0f0', border: '2px dashed #ccc', marginBottom: '10px' }}>
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
