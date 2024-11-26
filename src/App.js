/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
//import { workflowData as importedWorkflowData } from './data/workflowData';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import TabContainer from './components/TabContainer';
import TabContent from './components/TabContent';
import HelpPopup from './components/HelpPopup';
import './styles/WorkflowEditor.css';
import { DragDropContext } from 'react-beautiful-dnd'; // Import react-beautiful-dnd
import { fieldOptions, tabOptions, workflowAttributes, tabAttributes } from './models/models';
import WorkflowLoader from './components/WorkflowLoader';
import Login from './components/Login';
import { v4 as uuidv4 } from 'uuid';

let fieldIdCounter = 1;

function App() {
  const [groups, setGroups] = useState([]);
  const [fieldCount, setFieldCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('');
  const [moduleKeys, setModuleKeys] = useState([]);
  const [activeSidebarTab, setActiveSidebarTab] = useState('tab1');
  const [selectedField, setSelectedField] = useState(null);
  const [selectedWorkflowModuleKey, setSelectedWorkflowModuleKey] = useState(null);
  const [selectedWorkflowOptionValue, setSelectedWorkflowOptionValue] = useState(null);
  const [workflowTitle, setWorkflowTitle] = useState('');
  const [helpPosition, setHelpPosition] = useState({ top: 0, left: 0 });
  const [activeHelp, setActiveHelp] = useState(null);
  const [workflowData, setWorkflowData] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [isWorkflowLoaded, setIsWorkflowLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullModuleKeys, setFullModuleKeys] = useState([]);
  const [fieldError, setFieldError] = useState('');
  const [selectedWorkflowOptionId, setSelectedWorkflowOptionId] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('apiToken');
    if (storedToken) {
      setApiToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setApiToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsWorkflowLoaded(false);
    setWorkflowData(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (selectedField && workflowData) {
      // Update workflowData whenever selectedField changes
      setWorkflowData((prevWorkflowData) => {
        // Ensure that both template and modules are defined before proceeding
        if (!prevWorkflowData.template || !prevWorkflowData.template.modules) {
          return prevWorkflowData; // Return the unmodified state if template or modules are missing
        }

        const updatedModules = prevWorkflowData.template.modules.map((module) => {
          if (module.key === activeWorkflowTab && module.key.startsWith('F')) {
            return {
              ...module,
              groups: module.groups.map((group) => {
                // Check if the group matches the selectedField's label
                if (group.label === selectedField?.label) {
                  // Update the entire group with the selectedField's changes
                  return {
                    ...group,
                    ...selectedField,
                  };
                }
                return group;
              }),
            };
          }
          return module;
        });

        return {
          ...prevWorkflowData,
          template: {
            ...prevWorkflowData.template,
            modules: updatedModules,
          },
        };
      });
    }
  }, [activeWorkflowTab, selectedField, workflowData]);

  useEffect(() => {
    const updateSequenceValue = () => {
      setWorkflowData((prevData) => {
        const updatedModules = prevData.template.modules.map((module) => {
          if (module.logic_branch && module.logic_branch.variable === '{WORKFLOW_MODULES}') {
            const updatedOptions = module.logic_branch.options.map((option) => {
              if (option.id === selectedWorkflowOptionId) { // Use option.id for matching
                return {
                  ...option,
                  value: fullModuleKeys.join(', '),
                };
              }
              return option;
            });
            return {
              ...module,
              logic_branch: {
                ...module.logic_branch,
                options: updatedOptions,
              },
            };
          }
          return module;
        });
  
        return {
          ...prevData,
          template: {
            ...prevData.template,
            modules: updatedModules,
          },
        };
      });
    };
  
    if (workflowData && selectedWorkflowOptionId) { // Use selectedWorkflowOptionId here
      updateSequenceValue();
    }
  }, [fullModuleKeys, selectedWorkflowOptionId, workflowData]); // Add selectedWorkflowOptionId to dependencies

  const handleTabClick = (tabKey) => {
    setActiveWorkflowTab(tabKey);
    setActiveSidebarTab('tab2');
  };

  const handleBackToLoader = () => {
    setIsWorkflowLoaded(false);  // Set back to false to show WorkflowLoader
    setWorkflowData(null);       // Optionally reset workflow data if necessary
    setModuleKeys([]);           // Clear any module-related state
    setActiveWorkflowTab('');
    setSelectedField(null);
  };

  const handleFieldClick = (field) => {
    if (!workflowData) return;

    const activeModule = workflowData.template.modules.find(
      (module) => module.key === activeWorkflowTab
    );

    if (activeModule) {
      // Find the field using the label
      const activeGroup = activeModule.groups?.find((group) => group.label === field.label);

      if (activeGroup) {
        setSelectedField(activeGroup);
        setActiveSidebarTab('tab3'); // Switch to field properties in the sidebar
      }
    }
  };

  const handleWorkflowDataLoaded = (data) => {
    //const dataWithIds = assignUniqueIdsToGroups(data);
    setWorkflowData(data);
    setIsWorkflowLoaded(true);
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
    setWorkflowData((prevData) => {
      const updatedModules = prevData.template.modules.map((module) => {
        if (module.key === activeWorkflowTab) {
          let updatedModule = { ...module };
          if (Array.isArray(key)) {
            // Nested update
            let currentLevel = updatedModule;
            for (let i = 0; i < key.length - 1; i++) {
              const k = key[i];
              if (!currentLevel[k]) currentLevel[k] = {};
              currentLevel = currentLevel[k];
            }
            currentLevel[key[key.length - 1]] = value;
          } else {
            updatedModule[key] = value;
          }
          return updatedModule;
        }
        return module;
      });

      return {
        ...prevData,
        template: {
          ...prevData.template,
          modules: updatedModules,
        },
      };
    });
  };

  const onFieldChange = (fieldKey, newValue) => {
    setSelectedField((prevField) => {
      const updatedField = { ...prevField, [fieldKey]: newValue };

      if (fieldKey === 'label') {
        const prevLabel = prevField.label;
        const currentModule = workflowData.template.modules.find(
          (module) => module.key === activeWorkflowTab
        );

        if (currentModule && currentModule.groups) {
          const labels = currentModule.groups.map((group) => group.label);
          const labelsExcludingCurrent = labels.filter((label) => label !== prevLabel);

          if (labelsExcludingCurrent.includes(newValue)) {
            window.alert('A field with this label already exists. Please choose a different label.');
            return prevField;
          }
        }
      }

      setWorkflowData((prevWorkflowData) => {
        const updatedModules = prevWorkflowData.template.modules.map((module) => {
          if (module.key === activeWorkflowTab) {
            return {
              ...module,
              groups: module.groups?.map((group) => {
                const labelToMatch = fieldKey === 'label' ? prevField.label : updatedField.label;
                if (group.label === labelToMatch) {
                  return updatedField;
                }
                return group;
              }),
            };
          }
          return module;
        });

        return {
          ...prevWorkflowData,
          template: {
            ...prevWorkflowData.template,
            modules: updatedModules,
          },
        };
      });

      return updatedField;
    });
  };

  const onFieldItemsChange = (itemIndex, newItemValue) => {
    setSelectedField((prevField) => {
      // Ensure we're dealing with a field that has items
      const updatedItems = prevField.items?.map((item, index) =>
        index === itemIndex ? { ...item, ...newItemValue } : item
      );

      const updatedField = { ...prevField, items: updatedItems };

      // Update workflowData to keep in sync
      setWorkflowData((prevWorkflowData) => {
        const updatedModules = prevWorkflowData.template.modules.map((module) => {
          if (module.key === activeWorkflowTab) {
            return {
              ...module,
              groups: module.groups?.map((group) => {
                // Match the group by label and update items
                if (group.label === updatedField.label) {
                  return updatedField;
                }
                return group;
              }),
            };
          }
          return module;
        });

        return {
          ...prevWorkflowData,
          template: {
            ...prevWorkflowData.template,
            modules: updatedModules,
          },
        };
      });

      return updatedField;
    });
  };

  const assignUniqueIdsToGroups = (data) => {
    const updatedData = {
      ...data,
      template: { ...data.template },
    };

    updatedData.template.modules = data.template.modules.map((module) => {
      if (module.groups) {
        const updatedGroups = module.groups.map((group) => {
          return {
            ...group,
            id: group.id || uuidv4(),
            label: group.label || 'Unnamed Field',
          };
        });
        return {
          ...module,
          groups: updatedGroups,
        };
      }
      // Ensure all properties are preserved
      return { ...module };
    });
    return updatedData;
  };

  const handleSaveJSON = () => {
    // Ensure workflowData exists
    if (!workflowData) {
      console.warn('No workflow data available to save.');
      return;
    }

    try {
      // Convert workflowData to JSON string
      const jsonString = JSON.stringify(workflowData, null, 2);
      // Create a Blob from the JSON string
      const blob = new Blob([jsonString], { type: 'application/json' });
      // Create a link element
      const link = document.createElement('a');
      // Set the download attribute with a filename
      link.download = `${workflowTitle || 'workflowData'}.json`;
      // Create an object URL and set it as the href of the link
      link.href = window.URL.createObjectURL(blob);
      // Append the link to the body
      document.body.appendChild(link);
      // Programmatically click the link to trigger the download
      link.click();
      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error saving JSON:', error);
    }
  };

  const workflowOptions = workflowData
    ? workflowData.template?.modules
      .filter(
        (module) =>
          module.logic_branch && module.logic_branch.variable === '{WORKFLOW_MODULES}'
      )
      .flatMap((module) =>
        module.logic_branch.options.map((option) => ({
          ...option,
          moduleKey: module.key, // Include the module's key
        }))
      )
    : [];

  const handleSelectWorkflow = (workflowValue) => {
    if (workflowValue) {
      const keys = workflowValue.split(', ');

      setFullModuleKeys(keys);

      // Filter the keys to only include ones starting with 'F', 'M', 'E', 'C'
      const filteredKeys = keys.filter(key => ['F', 'M', 'E', 'C'].includes(key[0]));

      // Store filtered module keys
      setModuleKeys(filteredKeys);

      // Find the selected option
      const selectedOption = workflowOptions.find(option => option.value === workflowValue);
      if (selectedOption) {
        setWorkflowTitle(selectedOption.label);
        setSelectedWorkflowOptionValue(selectedOption.value);
        setSelectedWorkflowModuleKey(selectedOption.moduleKey);
        setSelectedWorkflowOptionId(selectedOption.id);
      }

      if (filteredKeys.length > 0) {
        setActiveWorkflowTab(filteredKeys[0]);
      }
    } else {
      setFullModuleKeys([]);
      setModuleKeys([]);
      setActiveWorkflowTab('');
      setWorkflowTitle('');
      setSelectedWorkflowOptionValue(null);
      setSelectedWorkflowModuleKey(null);
      setSelectedWorkflowOptionId(null);
    }
  };

  const handleWorkflowTitleChange = (newTitle) => {
    setWorkflowTitle(newTitle);

    // Update the label in workflowData
    setWorkflowData((prevData) => {
      const updatedModules = prevData.template.modules.map((module) => {
        if (module.key === selectedWorkflowModuleKey && module.logic_branch && module.logic_branch.options) {
          const updatedOptions = module.logic_branch.options.map(option => {
            if (option.value === selectedWorkflowOptionValue) {
              return {
                ...option,
                label: newTitle,
              };
            }
            return option;
          });
          return {
            ...module,
            logic_branch: {
              ...module.logic_branch,
              options: updatedOptions,
            },
          };
        }
        return module;
      });

      return {
        ...prevData,
        template: {
          ...prevData.template,
          modules: updatedModules,
        },
      };
    });
  };

  // Helper function to create new tabs based on the type
  const createNewTab = (tabOption, workflowData) => {
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

    // Get the existing modules from workflowData
    const existingModules = workflowData.template.modules;

    // Get the modules with the same prefix
    const existingTabsWithPrefix = existingModules
      .filter(tab => tab.key.startsWith(prefix))
      .map(tab => parseInt(tab.key.slice(prefix.length)))
      .filter(number => !isNaN(number));

    // Find the next available number
    const nextNumber = existingTabsWithPrefix.length > 0
      ? Math.max(...existingTabsWithPrefix) + 1
      : 1;

    const newTabKey = `${prefix}${nextNumber}`;

    // Count the number of tabs of this type
    const newTabCount = existingModules.filter(tab => tab.type === tabOption.type).length + 1;

    // Create the new tab object
    const newTab = {
      number: newTabCount,
      key: newTabKey,
      name: `New ${tabOption.type} Tab ${nextNumber}`,
      groups: [],
      tab_bar_item: {
        title: `New ${tabOption.type} Tab ${newTabCount}`,
        image_name: '',
        url: '',
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
    // If dropped outside any droppable, do nothing
    if (!destination) {
      console.log('Dropped outside any valid droppable.');
      return;
    }

    // Reordering tabs within the droppable-tab-list
    if (
      source.droppableId === 'droppable-tab-list' &&
      destination.droppableId === 'droppable-tab-list'
    ) {
      const reorderedKeys = Array.from(moduleKeys);
      const [movedKey] = reorderedKeys.splice(source.index, 1);
      reorderedKeys.splice(destination.index, 0, movedKey);

      setModuleKeys(reorderedKeys);
      // Update fullModuleKeys
      const updatedFullModuleKeys = [...fullModuleKeys];

      // Positions of filtered keys in fullModuleKeys
      const filteredKeyPositions = fullModuleKeys.reduce((acc, key, index) => {
        if (['F', 'M', 'E', 'C'].includes(key[0])) {
          acc.push(index);
        }
        return acc;
      }, []);

      // Move the key in fullModuleKeys
      const sourceFullIndex = filteredKeyPositions[source.index];
      const destinationFullIndex = filteredKeyPositions[destination.index];

      const [movedFullKey] = updatedFullModuleKeys.splice(sourceFullIndex, 1);
      updatedFullModuleKeys.splice(destinationFullIndex, 0, movedFullKey);

      setFullModuleKeys(updatedFullModuleKeys);

      return;
    }

    // Adding new tabs from new-tab-container to the droppable-tab-list
    if (
      source.droppableId === 'new-tab-container' &&
      destination.droppableId === 'droppable-tab-list'
    ) {

      const tabOption = tabOptions.templates[source.index];

      // Check if a "Share" tab already exists and prevent adding another
      if (tabOption.type === 'Share') {
        const shareTabExists = moduleKeys.some((key) => key.startsWith('E'));
        if (shareTabExists) {
          console.warn('A Share tab already exists!');
          return;
        }
      }

      // Create the new tab based on the type (Checklist, Media, etc.)
      const newTab = createNewTab(tabOption, workflowData);

      // Update workflowData by adding the new module
      setWorkflowData((prevData) => {
        const updatedModules = [...prevData.template.modules, newTab];
        return {
          ...prevData,
          template: {
            ...prevData.template,
            modules: updatedModules,
          },
        };
      });

      // Insert the new tab key into moduleKeys at the dropped index
      const updatedModuleKeys = [...moduleKeys];
      updatedModuleKeys.splice(destination.index, 0, newTab.key);
      setModuleKeys(updatedModuleKeys);

      // Insert the new tab key into fullModuleKeys at the correct position
      const updatedFullModuleKeys = [...fullModuleKeys];

      // Find positions of filtered keys in fullModuleKeys
      const filteredKeyPositions = fullModuleKeys.reduce((acc, key, index) => {
        if (['F', 'M', 'E', 'C'].includes(key[0])) {
          acc.push(index);
        }
        return acc;
      }, []);

      // Determine the insert index in fullModuleKeys
      let insertIndex = 0;
      if (destination.index < filteredKeyPositions.length) {
        insertIndex = filteredKeyPositions[destination.index];
      } else {
        insertIndex = fullModuleKeys.length;
      }

      // Insert the new tab key
      updatedFullModuleKeys.splice(insertIndex, 0, newTab.key);
      setFullModuleKeys(updatedFullModuleKeys);
      return;
    }

    // Adding new fields from new-item-container to droppable-field-list
    if (
      source.droppableId === 'new-item-container' &&
      destination.droppableId === 'droppable-field-list'
    ) {

      // Get the field template
      const fieldToCopy = fieldOptions.templates[source.index];

      const fieldType = fieldToCopy.type;

      // Increment field count for unique labeling
      const updatedFieldCount = fieldCount + 1;
      setFieldCount(updatedFieldCount);

      // Create a placeholder label based on the field type
      const placeholderLabel = `---New ${fieldType} ${updatedFieldCount}---`;

      // Function to get default items with proper labels and placeholders
      const getDefaultItems = () => {
        const needsDefaultItems = [
          'Radio',
          'Checkbox',
          'PassFail',
          'SingleDropDownList',
          'MultiDropDownList',
        ];

        if (needsDefaultItems.includes(fieldType)) {
          // Increment itemCount for unique item placeholders
          const updatedItemCount1 = itemCount + 1;
          const updatedItemCount2 = itemCount + 2;
          setItemCount(updatedItemCount2); // Increment by 2 for two items

          return [
            {
              name: `item1-${Date.now()}`,
              title: `---New Item Placeholder ${updatedItemCount1}---`,
            },
            {
              name: `item2-${Date.now()}`,
              title: `---New Item Placeholder ${updatedItemCount2}---`,
            },
          ];
        }
        return undefined;
      };

      const defaultItems = getDefaultItems();

      const copiedField = {
        ...fieldToCopy,
        id: fieldIdCounter++,
        label: placeholderLabel,
        ...(defaultItems && { items: defaultItems }),
      };

      // Update the active module's groups in workflowData
      const activeModuleKey = activeWorkflowTab;
      setWorkflowData((prevData) => {
        const updatedModules = prevData.template.modules.map((module) => {
          if (module.key === activeModuleKey) {
            const updatedGroups = Array.from(module.groups || []);
            updatedGroups.splice(destination.index, 0, copiedField);
            return {
              ...module,
              groups: updatedGroups,
            };
          }
          return module;
        });

        return {
          ...prevData,
          template: {
            ...prevData.template,
            modules: updatedModules,
          },
        };
      });
      return;
    }

    // Reordering fields within the droppable-field-list
    if (
      source.droppableId === 'droppable-field-list' &&
      destination.droppableId === 'droppable-field-list'
    ) {

      const activeModuleKey = activeWorkflowTab;

      setWorkflowData((prevData) => {
        const updatedModules = prevData.template.modules.map((module) => {
          if (module.key === activeModuleKey) {
            const reorderedGroups = Array.from(module.groups || []);
            const [movedGroup] = reorderedGroups.splice(source.index, 1);
            reorderedGroups.splice(destination.index, 0, movedGroup);

            return {
              ...module,
              groups: reorderedGroups,
            };
          }
          return module;
        });

        return {
          ...prevData,
          template: {
            ...prevData.template,
            modules: updatedModules,
          },
        };
      });
      return;
    }

    // Handle any other custom logic or cases
    console.log('Unhandled drag and drop case.');
  };

  const onDeleteField = () => {
    if (selectedField) {
      setWorkflowData((prevWorkflowData) => {
        const updatedModules = prevWorkflowData.template.modules.map((module) => {
          if (module.key === activeWorkflowTab) {
            return {
              ...module,
              groups: module.groups.filter(
                (group) => group.label !== selectedField.label
              ),
            };
          }
          return module;
        });

        return {
          ...prevWorkflowData,
          template: {
            ...prevWorkflowData.template,
            modules: updatedModules,
          },
        };
      });
      setSelectedField(null); // Clear the selectedField after deletion
    }
  };

  // In App.js

  const onDeleteTab = () => {
    if (activeWorkflowTab) {
      setWorkflowData((prevWorkflowData) => {
        const updatedModules = prevWorkflowData.template.modules.filter(
          (module) => module.key !== activeWorkflowTab
        );

        return {
          ...prevWorkflowData,
          template: {
            ...prevWorkflowData.template,
            modules: updatedModules,
          },
        };
      });

      setModuleKeys((prevModuleKeys) => {
        const updatedModuleKeys = prevModuleKeys.filter(
          (key) => key !== activeWorkflowTab
        );
        return updatedModuleKeys;
      });

      setFullModuleKeys((prevFullModuleKeys) => prevFullModuleKeys.filter(key => key !== activeWorkflowTab));

      // Update activeWorkflowTab
      setActiveWorkflowTab((prevActiveTab) => {
        // If there are other tabs, set the active tab to the first one
        if (moduleKeys.length > 1) {
          const index = moduleKeys.indexOf(activeWorkflowTab);
          const nextIndex = index > 0 ? index - 1 : 0;
          return moduleKeys.filter((key) => key !== activeWorkflowTab)[nextIndex];
        } else {
          // No tabs left
          return '';
        }
      });

      // Reset the sidebar to workflow properties or another appropriate tab
      setActiveSidebarTab('tab1');

      // Clear selectedField if necessary
      setSelectedField(null);
    }
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
    const activeModule = workflowData.template.modules.find((module) => module.key === tabKey);
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

  const handleTabAttributeChange = (attributeName, newValue) => {
    setWorkflowData((prevData) => {
      const updatedModules = prevData.template.modules.map((module) => {
        if (module.key === activeWorkflowTab) {
          if (attributeName === 'title') {
            // Update the nested tab_bar_item.title property
            return {
              ...module,
              name: newValue,
              tab_bar_item: {
                ...module.tab_bar_item,
                title: newValue,
              },
            };
          } else {
            // Update other attributes as before
            return {
              ...module,
              [attributeName]: newValue,
            };
          }
        }
        return module;
      });

      return {
        ...prevData,
        template: {
          ...prevData.template,
          modules: updatedModules,
        },
      }
    });
  };

  if (!isLoggedIn) {
    // If not logged in, show the login page
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!isWorkflowLoaded) {
    return (
      <WorkflowLoader onWorkflowDataLoaded={handleWorkflowDataLoaded} />
    );
  }

  return (
    <div className="App">
      {!apiToken ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          {!workflowData ? (
            // Render WorkflowLoader if workflowData is not yet loaded
            <WorkflowLoader onWorkflowDataLoaded={handleWorkflowDataLoaded} />
          ) : (
            // Render the main application when workflowData is available
            <div>
              <AppHeader
                workflowOptions={workflowOptions}
                onSelectWorkflow={handleSelectWorkflow}
                onLogout={handleLogout}
                onBack={handleBackToLoader}
                onSaveJSON={handleSaveJSON}
              />
              <DragDropContext onDragEnd={handleDragEnd}>
                <div id="appContainer" className="app-container" style={{ display: moduleKeys.length > 0 ? 'block' : 'none' }}>
                  <div className="container">
                    <Sidebar
                      activeTab={activeSidebarTab}
                      onTabChange={setActiveSidebarTab}
                      activeWorkflowTab={activeWorkflowTab}
                      workflowData={workflowData}
                      selectedTab={
                        workflowData
                          ? workflowData.template.modules.find(
                            (module) => module.key === activeWorkflowTab
                          )
                          : null
                      }
                      selectedField={selectedField}
                      setSelectedField={setSelectedField}
                      onWorkflowChange={handleWorkflowChange}
                      onTabChangeHandler={handleTabChange}
                      onFieldChange={onFieldChange}
                      onFieldItemsChange={onFieldItemsChange}
                      fieldOptions={fieldOptions}
                      tabOptions={tabOptions}
                      handleDragEnd={handleDragEnd}
                      onDeleteField={onDeleteField}
                      onDeleteTab={onDeleteTab}
                      onTabAttributeChange={handleTabAttributeChange}
                      workflowAttributes={workflowAttributes}
                      tabAttributes={tabAttributes}
                      setWorkflowData={setWorkflowData}
                      workflowTitle={workflowTitle}
                      onWorkflowTitleChange={handleWorkflowTitleChange}
                    />
                    {workflowTitle && (
                      <h1 className="workflow-title">{workflowTitle}</h1>
                    )}
                    <TabContainer
                      moduleKeys={moduleKeys}
                      workflowData={workflowData}
                      activeWorkflowTab={activeWorkflowTab}
                      setActiveWorkflowTab={setActiveWorkflowTab}
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
          )}
        </div>
      )}
    </div>
  );
}

export default App;

