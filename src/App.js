/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { workflowData } from './data/workflowData';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import TabContainer from './components/TabContainer';
import TabContent from './components/TabContent';
import HelpPopup from './components/HelpPopup';
import './styles/WorkflowEditor.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [selectedModules, setSelectedModules] = useState([]);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(''); // New state for workflow tabs
  const [activeTab, setActiveTab] = useState('tab1'); // This is for sidebar properties
  const [workflowTitle, setWorkflowTitle] = useState('');
  const [helpPosition, setHelpPosition] = useState({ top: 0, left: 0 });
  const [activeHelp, setActiveHelp] = useState(null);

  const setTabs = (newTabs) => {
    setSelectedModules(newTabs);
  };

  // Filter workflow options based on the provided logic
  const workflowOptions = workflowData.template.modules
    .filter(
      (module) =>
        module.logic_branch && module.logic_branch.variable === '{WORKFLOW_MODULES}'
    )
    .flatMap((module) => module.logic_branch.options);

  // Handle workflow selection
  const handleSelectWorkflow = (workflowValue) => {
    if (workflowValue) {
      const moduleKeys = workflowValue.split(', ');

      // First, filter the modules based on the desired prefixes
      const filteredModules = workflowData.template.modules.filter((module) =>
        moduleKeys.includes(module.key) && ['F', 'M', 'E', 'C'].includes(module.key[0])
      );

      // Then, sort the filtered modules according to the order of moduleKeys
      const sortedModules = moduleKeys
        .filter(key => ['F', 'M', 'E', 'C'].includes(key[0])) // Keep only the relevant keys
        .map(key => filteredModules.find(module => module.key === key)) // Map them to the filtered modules
        .filter(Boolean); // Remove any undefined entries

      setSelectedModules(sortedModules);

      // Set the workflow title based on the selected option
      const selectedOption = workflowOptions.find(option => option.value === workflowValue);
      if (selectedOption) {
        setWorkflowTitle(selectedOption.label); // Set the title based on the selected workflow
      }

      // Automatically set the first valid workflow tab as active
      if (sortedModules.length > 0) {
        setActiveWorkflowTab(sortedModules[0].key); // This is the key from the first selected module
      }
    } else {
      setSelectedModules([]);
      setActiveWorkflowTab(''); // Reset the active workflow tab if no workflow is selected
      setWorkflowTitle('');
    }
  };

  // Render the content of the active tab
  const renderTabContent = (tabKey) => {
    const activeModule = selectedModules.find((tab) => tab.key === tabKey);
    if (activeModule) {
      return (
        <TabContent tabKey={tabKey} groups={activeModule.groups} />
      );
    }
    return null;
  };

  // Render the App component
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <AppHeader workflowOptions={workflowOptions} onSelectWorkflow={handleSelectWorkflow} />
        <div id="appContainer" className="app-container" style={{ display: selectedModules.length > 0 ? 'block' : 'none' }}>
          <div className="container">
            <Sidebar activeTab={activeWorkflowTab} setActiveTab={setActiveWorkflowTab} />
            {workflowTitle && (
              <h1 className="workflow-title">{workflowTitle}</h1>
            )}
            <TabContainer
              tabs={selectedModules}
              activeWorkflowTab={activeWorkflowTab}
              setActiveWorkflowTab={setActiveWorkflowTab}
              setTabs={setTabs}
            />
          </div>
          <div id="tabContentContainer" className="tabcontent">
            {activeWorkflowTab && renderTabContent(activeWorkflowTab)}
          </div>
        </div>
        <HelpPopup activeHelp={activeHelp} helpPosition={helpPosition} />
      </div>
    </DndProvider>
  );
}

export default App;
