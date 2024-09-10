/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { workflowData as importedWorkflowData } from './data/workflowData';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import TabContainer from './components/TabContainer';
import TabContent from './components/TabContent';
import HelpPopup from './components/HelpPopup';
import './styles/WorkflowEditor.css';
import { DragDropContext } from 'react-beautiful-dnd'; // Import react-beautiful-dnd
import { fieldOptions, tabOptions } from './models/models';

function App() {
  const [groups, setGroups] = useState([]);
  const [fieldCount, setFieldCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [selectedModules, setSelectedModules] = useState([]);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('');
  const [activeSidebarTab, setActiveSidebarTab] = useState('tab1');
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [workflowTitle, setWorkflowTitle] = useState('');
  const [helpPosition, setHelpPosition] = useState({ top: 0, left: 0 });
  const [activeHelp, setActiveHelp] = useState(null);
  const [workflowData, setWorkflowData] = useState(importedWorkflowData);

  const setTabs = (newTabs) => {
    setSelectedModules(newTabs);
  };

  const handleTabClick = (tabKey) => {
    setSelectedTab(tabKey);
    setActiveSidebarTab('tab2');
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setActiveSidebarTab('tab3');
  };

  const handleWorkflowChange = (key, value) => {
    setWorkflowData((prevData) => ({
      ...prevData,
      template: {
        ...prevData.template,
        [key]: value,
      },
    }));
  };

  const handleTabChange = (key, value) => {
    setSelectedTab((prevTab) => ({
      ...prevTab,
      [key]: value,
    }));
  };

  const handleFieldChange = (key, value) => {
    setSelectedField((prevField) => ({
      ...prevField,
      [key]: value,
    }));
  };

  const workflowOptions = (workflowData.template?.modules || [])
    .filter(
      (module) =>
        module.logic_branch && module.logic_branch.variable === '{WORKFLOW_MODULES}'
    )
    .flatMap((module) => module.logic_branch.options);

  const handleSelectWorkflow = (workflowValue) => {
    if (workflowValue) {
      const moduleKeys = workflowValue.split(', ');

      const filteredModules = (workflowData.template?.modules || []).filter((module) =>
        moduleKeys.includes(module.key) && ['F', 'M', 'E', 'C'].includes(module.key[0])
      );

      const sortedModules = moduleKeys
        .filter(key => ['F', 'M', 'E', 'C'].includes(key[0]))
        .map(key => filteredModules.find(module => module.key === key))
        .filter(Boolean);

      setSelectedModules(sortedModules);

      const selectedOption = workflowOptions.find(option => option.value === workflowValue);
      if (selectedOption) {
        setWorkflowTitle(selectedOption.label);
      }

      if (sortedModules.length > 0) {
        setActiveWorkflowTab(sortedModules[0].key);
      }
    } else {
      setSelectedModules([]);
      setActiveWorkflowTab('');
      setWorkflowTitle('');
    }
  };

  // Helper function to create new tabs based on the type
  const createNewTab = (tabOption) => {
    // Determine the prefix based on the tab type
    let prefix = '';
    switch (tabOption.type) {
      case 'Checklist':
        prefix = 'F';  // For Form/Checklist tabs
        break;
      case 'Media':
        prefix = 'M';  // For Media tabs
        break;
      case 'Share':
        prefix = 'E';  // For Share tabs (Email, Phone, etc.)
        break;
      case 'Upload':
        prefix = 'C';  // For Upload tabs
        break;
      case 'PDF':
        prefix = 'PF';  // For PDF tabs
        break;
      default:
        prefix = 'U';  // Unknown or unhandled types, use a default prefix
    }

    // **Update**: Find the next available number for the prefix dynamically
    const updatedSelectedModules = [...selectedModules];  // Make sure we work with the updated state
    const existingTabsWithPrefix = updatedSelectedModules
      .filter(tab => tab.key.startsWith(prefix)) // Get all tabs with the same prefix
      .map(tab => parseInt(tab.key.slice(prefix.length)))     // Extract the number part of the key, after the prefix length
      .filter(number => !isNaN(number));          // Ensure we only work with valid numbers

    // Find the next available number
    const nextNumber = existingTabsWithPrefix.length > 0
      ? Math.max(...existingTabsWithPrefix) + 1   // Find the next available number
      : 1;                                        // If no existing tabs, start with 1

    const newTabKey = `${prefix}${nextNumber}`;     // Combine prefix and number for the new key
    const newTabCount = updatedSelectedModules.filter(tab => tab.type === tabOption.type).length + 1;

    // Create the new tab object
    const newTab = {
      number: newTabCount,
      key: newTabKey,
      type: tabOption.type,
      groups: [],
      tab_bar_item: {
        title: `New ${tabOption.type} Tab ${newTabCount}`, // Title now inside tab_bar_item
        image_name: '', // Adjust as necessary
        url: '', // Adjust as necessary
      }
    };

    // Additional logic for different tab types (Media, Share, etc.)
    if (tabOption.type === 'Media') {
      newTab.content = {
        description: 'Document asset damage, fuel level, current mileage, and more.',
        captureButtonLabel: '+ New Capture',
      };
    } else if (tabOption.type === 'Share') {
      newTab.content = {
        shareOptions: ['Email', 'Phone'],
        description: 'Add emails or phone numbers to share this inspection.',
      };
    } else if (tabOption.type === 'Upload') {
      newTab.content = {
        followUpTaskText: 'Follow-up Task',
        signatureText: 'Signature',
        buttons: ['+ Add Follow-up Task', '+ Add Signature'],
      };
    }

    return newTab;
  };


  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Log the source and destination for debugging
    console.log('Drag ended:', { source, destination });

    // If dropped outside any droppable, do nothing
    if (!destination) {
      console.log('Dropped outside any valid droppable.');
      return;
    }

    // Reordering tabs within the droppable-tab-list
    if (source.droppableId === 'droppable-tab-list' && destination.droppableId === 'droppable-tab-list') {
      console.log('Reordering within droppable-tab-list.');

      const reorderedTabs = Array.from(selectedModules);
      const [movedTab] = reorderedTabs.splice(source.index, 1);
      reorderedTabs.splice(destination.index, 0, movedTab);

      setSelectedModules(reorderedTabs);
      console.log('Reordered tabs:', reorderedTabs);
      return;
    }

    // Reordering tabs within the droppable-tab-list
    if (source.droppableId === 'droppable-tab-list' && destination.droppableId === 'droppable-tab-list') {
      console.log('Reordering within droppable-tab-list.');

      const updatedTabs = [...selectedModules];
      const [movedTab] = updatedTabs.splice(source.index, 1);
      updatedTabs.splice(destination.index, 0, movedTab);  // Insert at the new index

      setSelectedModules(updatedTabs);
      console.log('Reordered tabs:', updatedTabs);
      return;
    }

    // Adding new tabs from new-tab-container to the droppable-tab-list
    if (source.droppableId === 'new-tab-container' && destination.droppableId === 'droppable-tab-list') {
      console.log('Adding new tab from new-tab-container to droppable-tab-list.');

      const tabOption = tabOptions.templates[source.index]; // Get the tab option being dragged
      console.log('Tab option to add:', tabOption);

      // Check if a "Share" tab already exists and prevent adding another
      if (tabOption.type === "Share") {
        const shareTabExists = selectedModules.some(tab => tab.key.startsWith('E'));
        if (shareTabExists) {
          console.warn('A Share tab already exists!');
          return;
        }
      }

      // Create the new tab based on the type (Checklist, Media, etc.)
      const newTab = createNewTab(tabOption);

      // Insert the new tab into the selectedModules array at the dropped index
      const updatedTabs = [...selectedModules];
      updatedTabs.splice(destination.index, 0, newTab);
      setSelectedModules(updatedTabs);

      console.log('Added new tab:', newTab);
      console.log('Updated tabs:', updatedTabs);
      return;
    }

    // If dropping from the new-item-container to the droppable-field-list (copy)
    if (source.droppableId === 'new-item-container' && destination.droppableId === 'droppable-field-list') {
      console.log('Copying from new-item-container to droppable-field-list.');

      // Make sure the correct field is being selected
      const fieldToCopy = fieldOptions.templates[source.index];
      console.log('Field to copy:', fieldToCopy);

      const fieldType = fieldToCopy.type;

      // Increment field count for unique labeling
      const updatedFieldCount = fieldCount + 1;
      setFieldCount(updatedFieldCount);

      // Create a placeholder label based on the field type
      const placeholderLabel = `---New ${fieldType} ${updatedFieldCount}---`;

      // Function to get default items with proper labels and placeholders
      const getDefaultItems = () => {
        const needsDefaultItems = ['Radio', 'Checkbox', 'PassFail', 'SingleDropDownList', 'MultiDropDownList'];

        if (needsDefaultItems.includes(fieldType)) {
          // Increment itemCount for unique item placeholders
          const updatedItemCount1 = itemCount + 1;
          const updatedItemCount2 = itemCount + 2;
          setItemCount(updatedItemCount2); // Increment by 2 for two items

          return [
            { name: `item1-${Date.now()}`, title: `---New Item Placeholder ${updatedItemCount1}---` },
            { name: `item2-${Date.now()}`, title: `---New Item Placeholder ${updatedItemCount2}---` }
          ];
        }
        return [];
      };

      // Create the copied field with the placeholder and default items if necessary
      const copiedField = {
        ...fieldToCopy,
        id: `copied-${Date.now()}`,  // Ensure unique ID
        label: placeholderLabel,      // Add the placeholder label
        items: getDefaultItems()      // Add default items if applicable
      };
      console.log('Copied field:', copiedField);

      // Add the copied field to the specific destination index
      const updatedTabs = [...selectedModules];
      const activeTab = updatedTabs.find(tab => tab.key === activeWorkflowTab);
      if (activeTab) {
        const updatedGroups = Array.from(activeTab.groups || []);
        updatedGroups.splice(destination.index, 0, copiedField);  // Insert at the drop index
        activeTab.groups = updatedGroups;

        console.log('Updated activeTab.groups:', activeTab.groups);
      }

      setSelectedModules(updatedTabs); // Set the updated selectedModules
      return;
    }

    // If reordering within the droppable-field-list
    if (source.droppableId === 'droppable-field-list' && destination.droppableId === 'droppable-field-list') {
      console.log('Reordering within droppable-field-list.');

      const updatedTabs = [...selectedModules];
      const activeTab = updatedTabs.find(tab => tab.key === activeWorkflowTab);

      if (activeTab) {
        const reorderedGroups = Array.from(activeTab.groups);
        const [movedGroup] = reorderedGroups.splice(source.index, 1);
        reorderedGroups.splice(destination.index, 0, movedGroup);  // Insert at the new index

        activeTab.groups = reorderedGroups;
        setSelectedModules(updatedTabs);
        console.log('Reordered groups:', reorderedGroups);
      }
      return;
    }

    // Handle any other custom logic or cases
    console.log('Unhandled drag and drop case.');
  };

  const getDefaultItems = (fieldType) => {
    const defaultItems = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ];

    switch (fieldType) {
      case 'Radio':
      case 'Checkbox':
      case 'PassFail':
      case 'SingleDropDown':
      case 'MultiDropDown':
        return defaultItems; // Return two default items
      default:
        return []; // Return empty for other field types
    }
  };

  const renderTabContent = (tabKey) => {
    const activeModule = selectedModules.find((tab) => tab.key === tabKey);
    if (activeModule) {
      return (
        <TabContent
          tabKey={tabKey}
          groups={activeModule.groups || []}
          handleFieldClick={handleFieldClick}
          handleDragEnd={handleDragEnd}
        />
      );
    }
    return null;
  };


  return (
    <div className="App">
      <AppHeader workflowOptions={workflowOptions} onSelectWorkflow={handleSelectWorkflow} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div id="appContainer" className="app-container" style={{ display: selectedModules.length > 0 ? 'block' : 'none' }}>
          <div className="container">
            <Sidebar
              activeTab={activeSidebarTab}
              onTabChange={setActiveSidebarTab}
              workflowData={workflowData}
              selectedTab={selectedTab}
              selectedField={selectedField}
              onWorkflowChange={handleWorkflowChange}
              onTabChangeHandler={handleTabChange}
              onFieldChange={handleFieldChange}
              fieldOptions={fieldOptions}
              tabOptions={tabOptions}
              handleDragEnd={handleDragEnd}
            />
            {workflowTitle && (
              <h1 className="workflow-title">{workflowTitle}</h1>
            )}
            <TabContainer
              tabs={selectedModules}
              activeWorkflowTab={activeWorkflowTab}
              setActiveWorkflowTab={setActiveWorkflowTab}
              setTabs={setTabs}
              handleTabClick={handleTabClick}
            />
          </div>
          <div id="tabContentContainer" className="tabcontent">
            {activeWorkflowTab && renderTabContent(activeWorkflowTab)}
          </div>
        </div>
      </DragDropContext>
      <HelpPopup activeHelp={activeHelp} helpPosition={helpPosition} />
    </div>
  );
}

export default App;
