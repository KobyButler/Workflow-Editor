import React from 'react';

function WorkflowDisplay({ selectedModules }) {
    return (
        <div id="workflowContent">
            {selectedModules.map((module, index) => (
                <div key={index} className="module-container">
                    <h2>{module.name}</h2>
                    <ul>
                        {Object.keys(module).map((key) =>
                            key !== 'name' && key !== 'key' ? (
                                <li key={key}>
                                    {key}: {JSON.stringify(module[key], null, 2)}
                                </li>
                            ) : null
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default WorkflowDisplay;
