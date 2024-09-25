import React from 'react';

function AppHeader({ workflowOptions, onSelectWorkflow, onLogout, onBack, onSaveJSON }) {
    return (
        <header className="app-header">
            <h1>Workflow Editor</h1>
            <div>
                <select
                    id="workflowSelector"
                    data-testid="workflowSelector"
                    onChange={(e) => onSelectWorkflow(e.target.value)}
                    disabled={workflowOptions.length === 0}
                >
                    <option value="">Select a workflow...</option>
                    {workflowOptions.map((workflow) => (
                        <option key={workflow.id} value={workflow.value}>
                            {workflow.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="header-right">
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
                <button className="back-button" onClick={onBack}>
                    ← Back to Workflow Loader
                </button>
                <button className="save-json-button" onClick={onSaveJSON}>
                    Save JSON
                </button>
            </div>
        </header>
    );
}

export default AppHeader;
