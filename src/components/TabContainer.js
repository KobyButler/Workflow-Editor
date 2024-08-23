/* eslint-disable no-unused-vars */
import React from 'react';
import Tab from './Tab';

function TabContainer({ tabs, activeWorkflowTab, setActiveWorkflowTab }) {
    return (
        <div id="tabContainer" className="tab-container">
            <div
                id="tabButtonsContainer"
                className="tab tab-list"
            >
                {tabs.map((module, index) => (
                    <Tab
                        key={module.key}
                        isActive={activeWorkflowTab === module.key}
                        tabNumber={index + 1}
                        tabTitle={module.tab_bar_item?.title || `Tab ${index + 1}`}
                        onClick={() => setActiveWorkflowTab(module.key)}
                    />
                ))}
            </div>
        </div>
    );
}

export default TabContainer;
