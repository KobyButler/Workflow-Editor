/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NewItemContainer from './NewItemContainer';
import NewTabContainer from './NewTabContainer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    WorkflowTemplate,
    WorkflowModule,
    FieldOption,
    tabOptions,
    mediaAttributes,
    digitalFormsAttributes,
    emailAttributes,
    uploadAttributes,
    checklistAttributes,
    referenceCaptureAttributes,
    notationsAttributes,
    workflowAttributes,
    fieldAttributes,
} from '../models/models';

const AppSidebar = ({
    activeTab,
    onTabChange,
    activeWorkflowTab,
    workflowData,
    selectedTab,
    selectedField,
    setSelectedField,
    onWorkflowChange,
    onTabChangeHandler,
    onFieldChange,
    onFieldItemsChange,
    fieldOptions,
    tabOptions,
    handleDragEnd,
    onDeleteField,
    onDeleteTab,
    onTabAttributeChange,
    workflowAttributes,
    tabAttributes,
    setWorkflowData,
    workflowTitle,
    onWorkflowTitleChange
}) => {
    const [activeHelp, setActiveHelp] = useState(null);
    const [helpPosition, setHelpPosition] = useState({ top: 0, left: 0 });
    const [prevLabel, setPrevLabel] = useState(selectedField?.label);

    useEffect(() => {
        // Update prevLabel when selectedField changes
        setPrevLabel(selectedField?.label);
    }, [selectedField]);

    const [sections, setSections] = useState({
        main: true,
        properties: false,
        items: true,
        conditional: false,
        fieldMap: false,
        instructions: true,
        new_instructions: false,
        update_instructions: false,
        close_instructions: false,
    });


    const toggleSection = (section) => {
        setSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const updateTabAttribute = (attributeName, value) => {
        if (selectedTab) {
            onTabChangeHandler(attributeName, value);
        }
    };

    const updateWorkflowAttribute = (attributeName, value) => {
        if (workflowData && workflowData.template) {
            onWorkflowChange(attributeName, value);
        }
    };

    const getFilteredTabAttributes = () => {
        if (!selectedTab) return [];
        const tabType = getTabType(selectedTab);
        return tabAttributes[tabType] || [];
    };

    const getWorkflowDropdownOptions = (attributeName) => {
        switch (attributeName) {
            case 'forced_resolution':
                return ['medium', 'high', 'very_high'];
            case 'forced_upload_mode':
                return ['offline', 'online', 'wifi_only', 'online_wifi_uploads'];
            case 'force_upload_dialog_visibility':
                return ['true', 'false'];
            case 'disable_microphone':
                return ['true', 'false'];
            case 'key':
                return ['Keyboard', 'Barcode'];
            case 'keyboard':
                return ['numeric', 'numeric_and_punctuation', 'email'];
            case 'no_spaces_allowed':
                return ['true', 'false'];
            case 'keyboard_autocapitalization_type':
                return ['none', 'first_letter', 'all_letter'];
            case 'ref_num_lock':
                return ['open', 'warn', 'lock'];
            case 'allowmultiselect':
                return ['true', 'false'];
            default:
                return [];
        }
    };

    const getTabDropdownOptions = (attributeName) => {
        switch (attributeName) {
            case 'forced_resolution':
                return ['medium', 'high', 'very_high'];
            case 'forced_native_mode':
                return ['true', 'false'];
            case 'hide_photo_button':
                return ['true', 'false'];
            case 'hide_video_button':
                return ['true', 'false'];
            case 'photo_button_primary':
                return ['true', 'false'];
            case 'auto_advance':
                return ['true', 'false'];
            case 'autonav':
                return ['true', 'false'];
            case 'send_to_remember':
                return ['true', 'false'];
            case 'addresses_copied_to':
                return ['none', 'both', 'return', 'add_media'];
            case 'visible':
                return ['true', 'false'];
            case 'signature_required':
                return ['true', 'false'];
            case 'allow_multiple_signatures':
                return ['true', 'false'];
            case 'show_cdw':
                return ['true', 'false'];
            case 'transaction_type':
                return ['New', 'Update', 'Close'];
            default:
                return [];
        }
    };

    const getFieldDropdownOptions = (attributeName) => {
        switch (attributeName) {
            case 'required':
                return ['true', 'false'];
            case 'readonly':
                return ['true', 'false', 'mobile', 'web'];
            case 'keyboard':
                return ['numeric', 'numeric_and_punctuation', 'email'];
            case 'keyboard_autocapitalization_type':
                return ['none', 'first_letter', 'all_letters'];
            case 'pre_post':
                return ['true', 'false'];
            case 'clear':
                return ['update', 'close', 'always'];
            case 'ofac_check':
            case 'facial_recognition':
                return ['true', 'false'];
            case 'inline_media':
                return ['true', 'false'];
            case 'require_inline_photo':
                return ['true', 'false'];
            default:
                return [];
        }
    };

    // Function to add a new item to an array attribute (e.g., adding a new dropdown option)
    const addArrayItem = (scope, attributeName) => {
        if (scope === 'tab' && selectedTab) {
            if (!Array.isArray(selectedTab[attributeName])) {
                onTabChangeHandler(attributeName, []);
            }
            onTabChangeHandler(attributeName, [...selectedTab[attributeName], '']);
        } else if (scope === 'workflow' && workflowData && workflowData.template) {
            if (!Array.isArray(workflowData.template[attributeName])) {
                onWorkflowChange(attributeName, []);
            }
            onWorkflowChange(attributeName, [...workflowData.template[attributeName], '']);
        }
    };

    // Function to remove an item from an array attribute
    const removeArrayItem = (scope, attributeName, index) => {
        if (scope === 'tab' && selectedTab && Array.isArray(selectedTab[attributeName])) {
            const updatedArray = [...selectedTab[attributeName]];
            updatedArray.splice(index, 1);
            onTabChangeHandler(attributeName, updatedArray);
        } else if (scope === 'workflow' && workflowData && Array.isArray(workflowData.template[attributeName])) {
            const updatedArray = [...workflowData.template[attributeName]];
            updatedArray.splice(index, 1);
            onWorkflowChange(attributeName, updatedArray);
        }
    };

    const updateWorkflowArrayItem = (attributeName, index, value) => {
        setWorkflowData((prevData) => {
            const currentArray = prevData.template[attributeName] || [];
            const newArray = [...currentArray];
            newArray[index] = value;
            return {
                ...prevData,
                template: {
                    ...prevData.template,
                    [attributeName]: newArray,
                },
            };
        });
    };



    const updateInstructionField = (instructionType, index, field, value) => {
        if (selectedTab && selectedTab[instructionType]) {
            const updatedInstructions = [...selectedTab[instructionType]];
            updatedInstructions[index] = {
                ...updatedInstructions[index],
                [field]: value,
            };
            updateTabAttribute(instructionType, updatedInstructions);
        }
    };

    const removeInstruction = (instructionType, index) => {
        if (selectedTab && selectedTab[instructionType]) {
            const updatedInstructions = [...selectedTab[instructionType]];
            updatedInstructions.splice(index, 1);
            updateTabAttribute(instructionType, updatedInstructions);
        }
    };

    const addInstruction = (instructionType) => {
        const newInstruction = {
            label: '',
            auto_advance: false,
            autonav: false,
            image_url: '',
        };
        const updatedInstructions = [
            ...(selectedTab[instructionType] || []),
            newInstruction,
        ];
        updateTabAttribute(instructionType, updatedInstructions);
    };

    const renderInstructionList = (instructionType) => {
        const instructions = selectedTab[instructionType] || [];

        return (
            <Droppable droppableId={`droppable-instruction-list-${instructionType}`}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <ul className="instruction-list">
                            {instructions.map((instruction, index) => (
                                <Draggable
                                    key={`instruction-${instructionType}-${index}`}
                                    draggableId={`draggable-instruction-${instructionType}-${index}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="instruction-item"
                                        >
                                            <input
                                                type="text"
                                                value={instruction.label || ''}
                                                onChange={(e) =>
                                                    updateInstructionField(
                                                        instructionType,
                                                        index,
                                                        'label',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    className="instruction-item-input-checkbox"
                                                    checked={instruction.auto_advance || false}
                                                    onChange={(e) =>
                                                        updateInstructionField(
                                                            instructionType,
                                                            index,
                                                            'auto_advance',
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <label>Auto Advance</label>
                                            </div>
                                            <div className="checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    className="instruction-item-input-checkbox"
                                                    checked={instruction.autonav || false}
                                                    onChange={(e) =>
                                                        updateInstructionField(
                                                            instructionType,
                                                            index,
                                                            'autonav',
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <label>Autonav</label>
                                            </div>
                                            <input
                                                type="text"
                                                value={instruction.image_url || ''}
                                                onChange={(e) =>
                                                    updateInstructionField(
                                                        instructionType,
                                                        index,
                                                        'image_url',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Image URL"
                                            />
                                            <div onClick={() => removeInstruction(instructionType, index)} className="action-icon">
                                                <i className="fas fa-trash-alt"></i>
                                            </div>
                                            <div {...provided.dragHandleProps} className="action-icon">
                                                <i className="fas fa-sort"></i>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                        <button className="add-item-button" onClick={() => addInstruction(instructionType)}>
                            Add Item
                        </button>
                    </div>
                )}
            </Droppable>
        );
    };

    const onInstructionDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside the list, do nothing
        if (!destination) return;

        // Extract the instructionType from the droppableId
        const instructionType = source.droppableId.replace('droppable-instruction-list-', '');

        // Only handle reordering within the same instruction type
        if (source.droppableId === destination.droppableId) {
            const updatedInstructions = Array.from(selectedTab[instructionType]);
            const [movedItem] = updatedInstructions.splice(source.index, 1);
            updatedInstructions.splice(destination.index, 0, movedItem);

            // Update the selectedTab with the reordered instructions
            updateTabAttribute(instructionType, updatedInstructions);
        }
    };

    const renderMediaInstructions = () => {
        if (!selectedTab) return null;

        // Instruction types
        const instructionTypes = ['instructions', 'new_instructions', 'update_instructions', 'close_instructions'];

        const onInstructionDragEnd = (result) => {
            const { source, destination } = result;

            // If dropped outside the list, do nothing
            if (!destination) return;

            // Extract the instructionType from the droppableId
            const instructionType = source.droppableId.replace('droppable-instruction-list-', '');

            // Only handle reordering within the same instruction type
            if (source.droppableId === destination.droppableId) {
                const updatedInstructions = Array.from(selectedTab[instructionType]);
                const [movedItem] = updatedInstructions.splice(source.index, 1);
                updatedInstructions.splice(destination.index, 0, movedItem);

                // Update the selectedTab with the reordered instructions
                updateTabAttribute(instructionType, updatedInstructions);
            }
        };

        return (
            <DragDropContext onDragEnd={onInstructionDragEnd}>
                {instructionTypes.map((instructionType) => (
                    <div className="collapsible-section" key={instructionType}>
                        <h3
                            onClick={() => toggleSection(instructionType)}
                            className={sections[instructionType] ? 'active' : ''}
                        >
                            {instructionType.replace('_', ' ').toUpperCase()}
                        </h3>
                        {sections[instructionType] && (
                            <div>
                                {renderInstructionList(instructionType)}
                            </div>
                        )}
                    </div>
                ))}
            </DragDropContext>
        );
    };

    const getTabType = (tab) => {
        if (!tab) {
            console.warn("getTabType called with undefined or null tab.");
            return 'Unknown';  // or some default value
        }

        const key = tab.key || '';

        if (key.startsWith('F')) {
            return 'Checklist';
        } else if (key.startsWith('M')) {
            return 'Media';
        } else if (key.startsWith('PF')) {
            return 'PDF';
        } else if (key.startsWith('E')) {
            return 'Share';
        } else if (key.startsWith('C')) {
            return 'Upload';
        } else {
            return 'Unknown';
        }
    };

    const updateTabArrayItem = (attributeName, index, value) => {
        if (!selectedTab) return;
        setWorkflowData((prevData) => {
            const updatedModules = prevData.template.modules.map((module) => {
                if (module.key === selectedTab.key) {
                    const currentArray = module[attributeName] || [];
                    const newArray = [...currentArray];
                    newArray[index] = value;
                    return {
                        ...module,
                        [attributeName]: newArray,
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

    const renderWorkflowAttributeInput = (attribute) => {
        const attributeName = attribute.Name;

        const getAttributeValue = (paths) => {
            for (const path of paths) {
                const value = path.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), workflowData);
                if (value !== undefined) {
                    return value;
                }
            }
            return '';
        };

        const attributePaths = [];
        attributePaths.push(['template', attributeName]); // workflowData.template.attributeName

        for (let index = 0; index < workflowData.template.modules.length; index++) {
            attributePaths.push(['template', 'modules', index, attributeName]); // workflowData.template.modules[index].attributeName
        }

        const attributeValue = getAttributeValue(attributePaths);

        const handleChange = (newValue) => {
            onWorkflowChange(attributeName, newValue);
        };

        switch (attribute.Type) {
            case 'String':
                if (!hasDropdownOptions('workflow', attributeName)) {
                    return (
                        <input
                            type="text"
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    );
                } else {
                    return (
                        <select
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                            {getDropdownOptions('workflow', attributeName).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                }

            case 'Boolean':
                return (
                    <select
                        value={attributeValue.toString() || ''}
                        onChange={(e) => handleChange(e.target.value === 'true')}
                    >
                        <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );

            case 'Integer':
                return (
                    <input
                        type="number"
                        value={attributeValue || ''}
                        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
                    />
                );

            case 'Array':
                return (
                    <div>
                        {Array.isArray(attributeValue || '') &&
                            attributeValue.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateWorkflowArrayItem(attributeName, index, e.target.value)}
                                    />
                                    <button onClick={() => removeArrayItem(attributeName, index, 'workflow')}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        <button onClick={() => addArrayItem(attributeName, 'workflow')}>Add Item</button>
                    </div>
                );

            default:
                return null;
        }
    };

    const renderTabAttributeInput = (attribute) => {
        if (!selectedTab) return null; // Ensure selectedTab is available
        const attributeName = attribute.Name;
        const attributeValue = selectedTab[attributeName] || '';

        const handleChange = (newValue) => {
            onTabAttributeChange(attributeName, newValue);
        };

        switch (attribute.Type) {
            case 'String':
                if (!hasDropdownOptions('tab', attributeName)) {
                    return (
                        <input
                            type="text"
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    );
                } else {
                    return (
                        <select
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                            {getDropdownOptions('tab', attributeName).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                }

            case 'Boolean':
                return (
                    <select
                        value={attributeValue !== undefined ? attributeValue.toString() : ''}
                        onChange={(e) => handleChange(e.target.value === 'true')}
                    >
                        <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );


            case 'Integer':
                return (
                    <input
                        type="number"
                        value={attributeValue}
                        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
                    />
                );

            case 'Array':
                return (
                    <div>
                        {Array.isArray(attributeValue) &&
                            attributeValue.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateTabArrayItem(attributeName, index, e.target.value)}
                                    />
                                    <button onClick={() => removeArrayItem(attributeName, index, 'tab')}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        <button onClick={() => addArrayItem(attributeName, 'tab')}>Add Item</button>
                    </div>
                );

            default:
                return null;
        }
    };

    const renderFieldAttributeInput = (attribute) => {
        if (!selectedField) return null;

        const attributeName = attribute.Name;
        const attributeValue = selectedField[attributeName] || '';

        const handleChange = (newValue) => {
            onFieldChange(attributeName, newValue);
        };

        switch (attribute.Type) {
            case 'String':
                if (!hasDropdownOptions('field', attributeName)) {
                    return (
                        <input
                            type="text"
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    );
                } else {
                    return (
                        <select
                            value={attributeValue || ''}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                            {getDropdownOptions('field', attributeName).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                }

            case 'Boolean':
                return (
                    <select
                        value={attributeValue !== undefined ? attributeValue.toString() : ''}
                        onChange={(e) => handleChange(e.target.value === 'true')}
                    >
                        <option value="" style={{ color: 'lightgrey' }}>-- Select an option --</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );

            case 'Integer':
                return (
                    <input
                        type="number"
                        value={attributeValue !== undefined ? attributeValue : ''}
                        onChange={(e) => handleChange(parseInt(e.target.value, 10))}
                    />
                );

            case 'Array':
                return (
                    <div>
                        {Array.isArray(attributeValue) &&
                            attributeValue.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateFieldArrayItem(attributeName, index, e.target.value)}
                                    />
                                    <button onClick={() => removeArrayItem('field', attributeName, index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        <button onClick={() => addArrayItem('field', attributeName)}>Add Item</button>
                    </div>
                );

            default:
                return null;
        }
    };

    const updateFieldArrayItem = (attributeName, index, value) => {
        if (!selectedField) return;
        // Implement the logic to update the array item in the selected field
    };

    const hasDropdownOptions = (scope, attributeName) => {
        let options = [];
        if (scope === 'workflow') {
            options = getWorkflowDropdownOptions(attributeName);
        } else if (scope === 'tab') {
            options = getTabDropdownOptions(attributeName);
        } else if (scope === 'field') {
            options = getFieldDropdownOptions(attributeName);
        }
        return options.length > 0;
    };

    const getDropdownOptions = (scope, attributeName) => {
        if (scope === 'workflow') {
            return getWorkflowDropdownOptions(attributeName);
        } else if (scope === 'tab') {
            return getTabDropdownOptions(attributeName);
        } else if (scope === 'field') {
            return getFieldDropdownOptions(attributeName);
        }
        return [];
    };


    const getFilteredWorkflowAttributes = (workflowAttributes, referenceCaptureAttributes, notationsAttributes) => {
        const workflowTemplates = workflowAttributes?.templates || [];
        const referenceTemplates = referenceCaptureAttributes?.templates || [];
        const notationTemplates = notationsAttributes?.templates || [];

        return [
            ...workflowTemplates,
            ...referenceTemplates,
            ...notationTemplates
        ];
    };

    const getFilteredAttributes = (isMainProperty) => {
        if (!selectedField || !fieldOptions || !fieldAttributes || !fieldAttributes.templates) {
            console.warn("Field attributes or templates are missing.");
            return [];
        }

        const fieldType = selectedField.type;
        return fieldAttributes.templates.filter(attr => {
            return (
                attr.Applies_To &&
                Array.isArray(attr.Applies_To) &&
                attr.Applies_To.some(applyTo => applyTo.type === fieldType) &&
                attr.Main_Property === isMainProperty
            );
        });
    };


    const showHelp = (event, propertyName) => {
        setActiveHelp(propertyName);
        updateHelpPosition(event);
    };

    const hideHelp = () => {
        setActiveHelp(null);
    };

    const isSpecialField = (fieldName) => {
        return ['default', 'lines', 'post_label', 'pre_label', 'min_value', 'max_value'].includes(fieldName);
    };

    const hasFieldItems = (field) => {
        return ['Radio', 'Checkbox', 'SingleDropDownList', 'MultiDropDownList', 'PassFail'].includes(field.type);
    };

    const updateFieldItemTitle = (index, title) => {
        if (selectedField && selectedField.items) {
            const updatedItems = [...selectedField.items];
            updatedItems[index].title = title;
            onFieldChange('items', updatedItems);
        }
    };

    const removeFieldItem = (index) => {
        if (selectedField && selectedField.items) {
            // Deep clone the selectedField and its items
            const updatedField = { ...selectedField };
            const updatedItems = [...selectedField.items];  // Clone the items array
            updatedItems.splice(index, 1);  // Remove the item at the given index

            // Update both the items and the selectedField state in the parent
            updatedField.items = updatedItems;  // Assign the cloned and updated array back

            // Propagate the changes back to the parent state via onFieldChange
            onFieldChange('items', updatedItems);
        }
    };

    const addFieldItem = () => {
        if (selectedField && selectedField.items) {
            const updatedItems = [...selectedField.items, { title: 'New Item', default: "false" }];
            onFieldChange('items', updatedItems);
        }
        if (selectedTab && selectedTab.instructions) {
            const newInstruction = {
                label: 'New Instruction',
                auto_advance: false,
                autonav: false,
                text_color: '',
                text_size: 12,
                image_url: ''
            };
            onTabChangeHandler('instructions', [...selectedTab.instructions, newInstruction]);
        }
    };

    const onSourceFieldChange = (event) => {
        console.log('Source field changed:', event.target.value);
        onFieldChange('conditionalSourceField', event.target.value); // Update the field value
    };

    const getFilteredFieldsForDropdown = () => {
        const allowedTypes = ['Checkbox', 'PassFail', 'MultiDropDownList', 'Textbox', 'AcuantTextbox', 'SingleDropDownList', 'Radio'];

        if (!selectedTab || !selectedTab.groups) {
            return [];
        }

        return selectedTab.groups.filter(group => allowedTypes.includes(group.type));
    };

    const updateHelpPosition = (event) => {
        setHelpPosition({
            top: `${event.clientY + window.scrollY}px`,
            left: `${event.clientX - 200}px`,
        });
    };

    const requestFieldDeletion = (field) => {
        if (!field) return;

        if (!selectedTab || !Array.isArray(selectedTab.groups)) {
            console.warn('selectedTab or selectedTab.groups is undefined.');
            return;
        }

        const updatedFields = selectedTab.groups.filter(item => item !== field);
        onTabChangeHandler('groups', updatedFields); // Update the groups after deletion
    };

    const handleDragEnded = (result) => {
        const { source, destination } = result;

        // If dropped outside the list, do nothing
        if (!destination) return;

        // Reorder the items
        const reorderedItems = Array.from(selectedField.items);
        const [removed] = reorderedItems.splice(source.index, 1); // Remove the dragged item from the source index
        reorderedItems.splice(destination.index, 0, removed); // Insert the dragged item at the destination index

        // Update the parent state with the reordered items
        onFieldChange('items', reorderedItems);
    };

    const handleLabelChange = (e) => {
        const newLabel = e.target.value;
        onFieldChange('label', newLabel, prevLabel);
        setPrevLabel(newLabel);
    };

    const handleDeleteField = () => {
        if (window.confirm('Are you sure you want to delete this field?')) {
            onDeleteField();
        }
    };

    const handleDeleteTab = () => {
        if (window.confirm('Are you sure you want to delete this tab?')) {
            onDeleteTab();
        }
    };

    const renderWorkflowProperties = () => {
        const filteredAttributes = getFilteredWorkflowAttributes(
            workflowAttributes, referenceCaptureAttributes, notationsAttributes
        );
        return (
            <div>
                <h2 className="sidebar-heading">Editing Workflow:</h2>
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('main')} className={sections.main ? 'active' : ''}>Properties</h3>
                    {sections.main && (
                        <div>
                            <label htmlFor="workflowTitle">Label:</label>
                            <input
                                id="workflowTitle"
                                type="text"
                                value={workflowTitle || ''}
                                onChange={(e) => onWorkflowTitleChange(e.target.value)}
                            />

                            <div className="collapsible-section">
                                <NewTabContainer tabOptions={tabOptions} onDragEnd={handleDragEnd} />
                            </div>

                            {/* Display Main Properties */}
                            {workflowAttributes.templates?.filter(attr => attr.Main_Property).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderWorkflowAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Advanced Properties Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('advancedWorkflow')} className={sections.advancedWorkflow ? 'active' : ''}>
                        Advanced
                    </h3>
                    {sections.advancedWorkflow && (
                        <div>
                            {/* Display Advanced Properties */}
                            {workflowAttributes.templates?.filter(attr => !attr.Main_Property).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderWorkflowAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderTabProperties = () => {
        if (!selectedTab) {
            return <div>Select a tab to edit its properties.</div>;
        }

        const tabType = getTabType(selectedTab);
        const attributes = tabAttributes[tabType]?.templates || [];

        return (
            <div>
                <h2 className="sidebar-heading">
                    Editing Tab:<br />
                    {selectedTab?.tab_bar_item?.title || selectedTab.name || 'Untitled Tab'}
                </h2>

                {/* Main Properties Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('main')} className={sections.main ? 'active' : ''}>
                        Properties
                    </h3>
                    {sections.main && (
                        <div>
                            <label htmlFor="tabTitle">Title:</label>
                            <input
                                id="tabTitle"
                                type="text"
                                value={selectedTab?.tab_bar_item?.title || selectedTab.name || ''}
                                onChange={(e) => onTabAttributeChange('title', e.target.value)}
                            />

                            {getTabType(selectedTab) === 'Checklist' && (
                                <div className="collapsible-section">
                                    <NewItemContainer fieldOptions={fieldOptions} onDragEnd={handleDragEnd} />
                                </div>
                            )}

                            {/* Display Main Properties */}
                            {attributes.filter(attr => attr.Main_Property).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderTabAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Advanced Properties Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('advancedTab')} className={sections.advancedTab ? 'active' : ''}>
                        Advanced Properties
                    </h3>
                    {sections.advancedTab && (
                        <div>
                            {/* Display Advanced Properties */}
                            {attributes.filter(attr => !attr.Main_Property).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderTabAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Instructions Sections for Media Tabs */}
                {tabType === 'Media' && renderMediaInstructions()}

                <button className="delete-button" onClick={handleDeleteTab}>Delete Tab</button>
            </div>
        );
    };

    const renderFieldProperties = () => {
        if (!selectedField) {
            return <div>Select a field to edit its properties.</div>;
        }

        return (
            <div>
                <h2 className="sidebar-heading">
                    Editing Field:<br />
                    {selectedField.label || 'Untitled Field'}
                </h2>

                {/* Properties Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('main')} className={sections.main ? 'active' : ''}>
                        Properties
                    </h3>
                    {sections.main && (
                        <div>
                            <label htmlFor="fieldLabel">Label:</label>
                            <input
                                id="fieldLabel"
                                type="text"
                                value={selectedField.label || ''}
                                onChange={handleLabelChange}
                            />

                            {/* Display Main Properties */}
                            {getFilteredAttributes(true).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderFieldAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Field Items Section */}
                {hasFieldItems(selectedField) && (
                    <DragDropContext onDragEnd={handleDragEnded}>
                        <Droppable droppableId="droppable-items-list">
                            {(provided) => (
                                <div
                                    className="collapsible-section"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 onClick={() => toggleSection('items')} className={sections.items ? 'active' : ''}>
                                        Items
                                    </h3>
                                    {sections.items && (
                                        <div>
                                            <ul className="field-items-list">
                                                {selectedField.items.map((item, i) => (
                                                    <Draggable key={(item.title)} draggableId={(item.title)} index={i}>
                                                        {(provided) => (
                                                            <li
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="field-item"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    defaultValue={item.title || ''}
                                                                    onBlur={(e) => updateFieldItemTitle(i, e.target.value)}
                                                                />
                                                                <div className="item-handle" {...provided.dragHandleProps}>
                                                                    <i className="fas fa-sort"></i>
                                                                </div>
                                                                <button onClick={() => removeFieldItem(i)}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </ul>
                                            <button className="add-item-button" onClick={addFieldItem}>
                                                Add Item
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}


                {/* Conditional Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('conditional')} className={sections.conditional ? 'active' : ''}>Conditional</h3>
                    {sections.conditional && (
                        <div>
                            <label htmlFor="sourceField">Source Field:</label>
                            <select
                                id="sourceField"
                                value={selectedField.conditionalSourceField || ''}
                                onChange={(e) => onSourceFieldChange(e)}
                            >
                                {getFilteredFieldsForDropdown().map((field, index) => (
                                    <option key={index} value={field.label}>{field.label}</option>
                                ))}
                            </select>

                            <label htmlFor="conditionalValue">Value:</label>
                            <input
                                id="conditionalValue"
                                type="text"
                                value={selectedField.conditionalValue || ''}
                                onChange={(e) => onFieldChange('conditionalValue', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Field Map Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('fieldMap')} className={sections.fieldMap ? 'active' : ''}>Field Map</h3>
                    {sections.fieldMap && (
                        <div>
                            {/* Add Field Map logic here */}
                        </div>
                    )}
                </div>

                {/* Advanced Properties Section */}
                <div className="collapsible-section">
                    <h3 onClick={() => toggleSection('advancedField')} className={sections.advancedField ? 'active' : ''}>
                        Advanced Properties
                    </h3>
                    {sections.advancedField && (
                        <div>
                            {/* Display Advanced Properties */}
                            {getFilteredAttributes(false).map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderFieldAttributeInput(attribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className="delete-button" onClick={handleDeleteField}>Delete Field</button>
            </div>
        );
    };

    return (
        <div className="app-sidebar">
            <div className="properties-tabs">
                <button className={`properties-tab-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => onTabChange('tab1')}>
                    Workflow Properties
                </button>
                <button className={`properties-tab-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => onTabChange('tab2')}>
                    Tab Properties
                </button>
                <button className={`properties-tab-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => onTabChange('tab3')}>
                    Field Properties
                </button>
            </div>

            <div className={`properties-tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
                {renderWorkflowProperties()}
            </div>

            <div className={`properties-tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                {renderTabProperties()}
            </div>

            <div className={`properties-tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
                {renderFieldProperties()}
            </div>
        </div>
    );
};

export default AppSidebar;