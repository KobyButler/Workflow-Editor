import React from 'react';

function AppHeader({ workflowOptions, onSelectWorkflow }) {
    return (
        <header className="app-header">
            <h1>Workflow Editor</h1>
            <div>
                <select id="workflowSelector" data-testid="workflowSelector" onChange={(e) => onSelectWorkflow(e.target.value)}>
                    <option value="">Select a workflow...</option>
                    {workflowOptions.map((workflow) => (
                        <option key={workflow.id} value={workflow.value}>
                            {workflow.label}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}

export default AppHeader;
