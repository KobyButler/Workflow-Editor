import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const NewItemContainer = ({ fieldOptions, onDragEnd }) => {
    return (
        <Droppable droppableId="new-item-container" isDropDisabled={true}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ width: 'auto', padding: 0 }}
                >
                    <h4 style={{ textAlign: 'center' }}>Add New Field</h4>
                    {fieldOptions.templates.map((field, index) => (
                        <Draggable key={field.type} draggableId={field.type} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        userSelect: 'none',
                                        margin: '8px',
                                        marginBottom: '4px',
                                        marginTop: '4px',
                                        border: '1px solid #ddd',
                                        color: 'black',
                                        textAlign: 'center',
                                        backgroundColor: 'white',
                                        borderRadius: '50px',
                                        ...provided.draggableProps.style,
                                    }}
                                >
                                    {field.type}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default NewItemContainer;
