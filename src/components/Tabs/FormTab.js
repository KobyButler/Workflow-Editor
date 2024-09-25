/* eslint-disable no-unused-vars */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Field from '../Field';

export default function FormTab({ groups = [], handleFieldClick }) {
    return (
        <Droppable droppableId="droppable-field-list">
            {(provided) => (
                <div
                    className="field-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {groups.map((group, index) => (
                        <Draggable
                            key={String(group.id)}
                            draggableId={String(group.id)} // Ensure draggableId is a string
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
    );
}
