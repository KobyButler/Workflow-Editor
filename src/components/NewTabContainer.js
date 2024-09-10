import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const NewTabContainer = ({ tabOptions, onDragEnd }) => {
    return (
        <Droppable droppableId="new-tab-container" isDropDisabled={true}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ width: 'auto', padding: 0 }}
                >
                    <h4 style={{ textAlign: 'center' }}>Add New tab</h4>
                    {tabOptions.templates.map((tab, index) => (
                        <Draggable key={tab.type} draggableId={tab.type} index={index}>
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
                                        color: 'white',
                                        textAlign: 'center',
                                        backgroundColor: '#E53A4E',
                                        borderRadius: '50px',
                                        ...provided.draggableProps.style,
                                    }}
                                >
                                    {tab.type}
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

export default NewTabContainer;
