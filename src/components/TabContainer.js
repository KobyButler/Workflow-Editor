import React, { useRef } from 'react';
import Tab from './Tab';


function TabContainer({ tabs, activeWorkflowTab, setActiveWorkflowTab, setTabs }) {
    const tabContainerRef = useRef(null);
    const scrollSpeed = 5;

    const moveTab = (dragIndex, hoverIndex) => {
        const draggedTab = tabs[dragIndex];
        const updatedTabs = [...tabs];
        updatedTabs.splice(dragIndex, 1);
        updatedTabs.splice(hoverIndex, 0, draggedTab);
        setTabs(updatedTabs);
    };

    const handleScroll = (direction) => {
        if (tabContainerRef.current) {
            tabContainerRef.current.scrollLeft += direction * scrollSpeed;
        }
    };

    const handleMouseMove = (e) => {
        if (!tabContainerRef.current) return;

        const { left, right } = tabContainerRef.current.getBoundingClientRect();
        const { clientX } = e;

        if (clientX - left < 150) {
            handleScroll(-1); // Scroll left
        } else if (right - clientX < 150) {
            handleScroll(1); // Scroll right
        }
    };

    return (
        <div
            id="tabContainer"
            className="tab-container"
            ref={tabContainerRef}
            onMouseMove={handleMouseMove}
        >
            <div id="tabButtonsContainer" className="tab tab-list">
                {tabs.map((module, index) => (
                    <Tab
                        key={module.key}
                        index={index}
                        isActive={activeWorkflowTab === module.key}
                        tabNumber={index + 1}
                        tabTitle={module.tab_bar_item?.title || `Tab ${index + 1}`}
                        onClick={() => setActiveWorkflowTab(module.key)}
                        moveTab={moveTab}
                    />
                ))}
            </div>
        </div>
    );
}

export default TabContainer;
