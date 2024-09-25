/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Tab from './Tab';

function TabContainer({ moduleKeys, workflowData, activeWorkflowTab, setActiveWorkflowTab, handleTabClick }) {
    if (!workflowData) return null;

    const scrollSpeed = 5;

    const handleScroll = (direction) => {
        document.getElementById('tabContainer').scrollLeft += direction * scrollSpeed;
    };

    const handleMouseMove = (e) => {
        const tabContainer = document.getElementById('tabContainer');
        if (!tabContainer) return;

        const { left, right } = tabContainer.getBoundingClientRect();
        const { clientX } = e;

        if (clientX - left < 150) {
            handleScroll(-1); // Scroll left
        } else if (right - clientX < 150) {
            handleScroll(1); // Scroll right
        }
    };

    const handleClick = (moduleKey) => {
        setActiveWorkflowTab(moduleKey); // Activate the tab
        handleTabClick(moduleKey);       // Open the properties sidebar
    };

    const tabs = moduleKeys
        .map(key => workflowData.template.modules.find(module => module.key === key))
        .filter(Boolean);

    return (
        //<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-tab-list" direction="horizontal">
            {(provided) => (
                <div
                    id="tabContainer"
                    className="tab-container"
                    ref={provided.innerRef} // Attach the innerRef to the Droppable container
                    {...provided.droppableProps}
                    onMouseMove={handleMouseMove}
                >
                    <div id="tabButtonsContainer" className="tab tab-list">
                        {tabs.map((module, index) => (
                            <Draggable key={module.key} draggableId={module.key} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="draggable-tab-wrapper"
                                        style={{
                                            position: 'relative',
                                            userSelect: 'none',
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <Tab
                                            index={index}
                                            isActive={activeWorkflowTab === module.key}
                                            tabNumber={index + 1}
                                            tabTitle={module.tab_bar_item?.title || module.name || `Tab ${index + 1}`}
                                            onClick={() => handleClick(module.key)}
                                        />
                                        {/* Drag handle in top right corner */}
                                        <div
                                            {...provided.dragHandleProps}
                                            className="drag-handle"
                                            style={{
                                                position: 'absolute',
                                                top: '0px',
                                                right: '-5px',
                                                cursor: 'move',
                                            }}
                                        >
                                            <i className="fas fa-arrows-alt"></i>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder} {/* Placeholder is essential for Droppable to work */}
                    </div>
                </div>
            )}
        </Droppable>
        //</DragDropContext>
    );
}

export default TabContainer;
