import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
    return (
        <div className="app-sidebar">
            <div className="properties-tabs">
                <button
                    className={`properties-tab-link workflow-tab ${activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tab1')}
                >
                    Workflow Properties
                </button>
                <button
                    className={`properties-tab-link workflow-tab ${activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tab2')}
                >
                    Tab Properties
                </button>
                <button
                    className={`properties-tab-link workflow-tab ${activeTab === 'tab3' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tab3')}
                >
                    Field Properties
                </button>
            </div>
            <div id="tab1" className={`properties-tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
                {/* Workflow Properties Content */}
            </div>
            <div id="tab2" className={`properties-tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                {/* Tab Properties Content */}
            </div>
            <div id="tab3" className={`properties-tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
                {/* Field Properties Content */}
            </div>
        </div>
    );
}

export default Sidebar;
