import React, { useState } from 'react';
import { workflowData } from './data/workflowData';
import WorkflowSelector from './components/WorkflowSelector';
import WorkflowDisplay from './components/WorkflowDisplay';
import './styles/WorkflowEditor.css';

function App() {
  const [selectedModules, setSelectedModules] = useState([]);

  const handleSelectWorkflow = (workflowValue) => {
    if (workflowValue) {
      const moduleKeys = workflowValue.split(', ');
      const modules = workflowData.template.modules.filter(module =>
        moduleKeys.includes(module.key)
      );
      setSelectedModules(modules);
    } else {
      setSelectedModules([]);
    }
  };

  const workflowOptions = workflowData.template.modules
    .filter(module => module.logic_branch && module.logic_branch.options)
    .flatMap(module => module.logic_branch.options);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Workflow Editor</h1>
        <WorkflowSelector workflows={workflowOptions} onSelectWorkflow={handleSelectWorkflow} />
      </header>
      {selectedModules.length > 0 && <WorkflowDisplay selectedModules={selectedModules} />}
    </div>
  );
}

export default App;
