/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Field from '../Field';

export default function FormTab({ groups = [], handleFieldClick, handleDragEnd }) {
    const [fieldOrder, setFieldOrder] = useState([]);

    useEffect(() => {
        setFieldOrder(groups);
    }, [groups]);

    return (
        //<DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-field-list">
                {(provided) => (
                    <div
                        className="field-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {fieldOrder.map((group, index) => (
                            <Draggable
                                key={group.id || `${group.label}-${index}`}  // Ensure unique draggableId
                                draggableId={group.id || `${group.label}-${index}`}  // Use group.id if available
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Field
                                            index={index}
                                            group={group}
                                            handleFieldClick={() => handleFieldClick(group)}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        //</DragDropContext>
    );
}
