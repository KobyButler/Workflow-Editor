import React from 'react';

function WorkflowSelector({ workflows, onSelectWorkflow }) {
    return (
        <div>
            <select onChange={(event) => onSelectWorkflow(event.target.value)}>
                <option value="">Select a workflow...</option>
                {workflows.map((workflow, index) => (
                    <option key={index} value={workflow.value}>
                        {workflow.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default WorkflowSelector;
