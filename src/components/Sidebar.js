/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import NewItemContainer from './NewItemContainer';
import NewTabContainer from './NewTabContainer';
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
} from '../models/models';

// Helper functions to get filtered attributes (These will be implemented next)
const getFilteredTabAttributes = (tab, tabOptions, mediaAttributes, digitalFormsAttributes, emailAttributes, uploadAttributes, checklistAttributes) => {
    if (!tab) return [];
    switch (tab.type) {
        case 'Checklist':
            return checklistAttributes.templates;
        case 'Media':
            return mediaAttributes.templates;
        case 'PDF':
            return digitalFormsAttributes.templates;
        case 'Share':
            return emailAttributes.templates;
        case 'Upload':
            return uploadAttributes.templates;
        default:
            return [];
    }
};

const generateUniqueId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const AppSidebar = ({ activeTab, onTabChange, workflowData, selectedTab, selectedField, onWorkflowChange, onTabChangeHandler, onFieldChange, fieldOptions, tabOptions, handleDragEnd }) => {
    const [sections, setSections] = useState({
        main: true,
        properties: true,
        instructions: false,
        items: false,
        conditional: false,
        fieldMap: false,
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

    // Function to check if a dropdown option exists for a specific attribute
    const hasDropdownOptions = (scope, attributeName) => {
        let options = [];
        if (scope === 'tab') {
            options = getTabDropdownOptions(attributeName);
        } else if (scope === 'workflow') {
            options = getWorkflowDropdownOptions(attributeName);
        }
        return options.length > 0;
    };

    // Function to get dropdown options for a specific attribute
    const getDropdownOptions = (scope, attributeName) => {
        if (!attributeName) return [];

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

    // Method to get dropdown options for workflow attributes
    const getWorkflowDropdownOptions = (optionName) => {
        switch (optionName) {
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

    // Method to get dropdown options for tab attributes
    const getTabDropdownOptions = (optionName) => {
        switch (optionName) {
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

    const renderTabProperties = () => {
        const tabAttributes = getFilteredTabAttributes(selectedTab, tabOptions, mediaAttributes, digitalFormsAttributes, emailAttributes, uploadAttributes, checklistAttributes);

        const handleDrop = (item) => {
            if (selectedTab && selectedTab.groups) {
                const newGroup = { ...item, id: generateUniqueId() }; // Create a new instance of the dropped item
                onTabChangeHandler('groups', [...selectedTab.groups, newGroup]);
            }
        };

        const renderInstructionsSection = (sectionName, instructions) => (
            <div className="collapsible-section">
                <h3 onClick={() => toggleSection(sectionName)} className={sections[sectionName] ? 'active' : ''}>
                    {sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace('_', ' ')}
                </h3>
                {sections[sectionName] && (
                    <div>
                        <ul className="instruction-list">
                            {instructions.map((instruction, i) => (
                                <li key={i} className="instruction-item">
                                    <input
                                        type="text"
                                        value={instruction.label || ''}
                                        onChange={(e) => updateInstructionField(sectionName, i, 'label', e.target.value)}
                                        placeholder="Label"
                                    />
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={instruction.auto_advance || false}
                                            onChange={(e) => updateInstructionField(sectionName, i, 'auto_advance', e.target.checked)}
                                        />
                                        <label style={{ color: 'black' }}>Auto Advance</label>
                                    </div>
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={instruction.autonav || false}
                                            onChange={(e) => updateInstructionField(sectionName, i, 'autonav', e.target.checked)}
                                        />
                                        <label style={{ color: 'black' }}>Autonav</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={instruction.image_url || ''}
                                        onChange={(e) => updateInstructionField(sectionName, i, 'image_url', e.target.value)}
                                        placeholder="Image URL"
                                    />
                                    <button onClick={() => removeArrayItem(sectionName, i)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => addArrayItem(sectionName)}>Add Item</button>
                    </div>
                )}
            </div>
        );

        return (
            <div>
                {selectedTab && (
                    <>
                        <h2 className="sidebar-heading">Editing Tab:<br />{selectedTab.title}</h2>

                        {/* Main Properties Section */}
                        <div className="collapsible-section">
                            <h3 onClick={() => toggleSection('main')} className={sections.main ? 'active' : ''}>Main Properties</h3>
                            {sections.main && (
                                <div>
                                    <label htmlFor="tabLabel">Label:</label>
                                    <input
                                        id="tabLabel"
                                        type="text"
                                        value={selectedTab.title ?? ''}
                                        onChange={(e) => updateTabAttribute('title', e.target.value)}
                                    />
                                    {tabAttributes.filter(attr => attr.Main_Property).map((attribute, index) => (
                                        <div key={index}>
                                            <label>{attribute.Option}</label>
                                            {renderAttributeInput('tab', attribute, selectedTab[attribute.Name], updateTabAttribute)}
                                        </div>
                                    ))}

                                    {getTabType(selectedTab) === 'Checklist' && (
                                        <div className="collapsible-section">
                                            <NewItemContainer fieldOptions={fieldOptions} onDragEnd={handleDragEnd} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Advanced Properties Section */}
                        <div className="collapsible-section">
                            <h3 onClick={() => toggleSection('properties')} className={sections.properties ? 'active' : ''}>Advanced Properties</h3>
                            {sections.properties && (
                                <div>
                                    {tabAttributes.filter(attr => !attr.Main_Property).map((attribute, index) => (
                                        <div key={index}>
                                            <label>{attribute.Option}</label>
                                            {renderAttributeInput('tab', attribute, selectedTab[attribute.Name], updateTabAttribute)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Instructions Sections (only for Media tabs) */}
                        {getTabType(selectedTab) === 'Media' && (
                            <>
                                {renderInstructionsSection('instructions', selectedTab.instructions || [])}
                                {renderInstructionsSection('new_instructions', selectedTab.new_instructions || [])}
                                {renderInstructionsSection('update_instructions', selectedTab.update_instructions || [])}
                                {renderInstructionsSection('close_instructions', selectedTab.close_instructions || [])}
                            </>
                        )}

                    </>
                )}
            </div>
        );
    };

    const getTabType = (tab) => {
        if (!tab) {
            console.warn("getTabType called with undefined or null tab.");
            return 'Unknown';  // or some default value
        }

        if (tab.startsWith('F')) {
            return 'Checklist';
        } else if (tab.startsWith('M')) {
            return 'Media';
        } else if (tab.startsWith('PF')) {
            return 'PDF';
        } else if (tab.startsWith('E')) {
            return 'Share';
        } else if (tab.startsWith('C')) {
            return 'Upload';
        } else {
            return 'Unknown';
        }
    };


    const updateInstructionField = (index, field, value) => {
        if (selectedTab && selectedTab.instructions) {
            const updatedInstructions = [...selectedTab.instructions];
            updatedInstructions[index] = {
                ...updatedInstructions[index],
                [field]: value
            };
            updateTabAttribute('instructions', updatedInstructions);
        }
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
                                value={workflowData.template.title ?? ''}
                                onChange={(e) => updateWorkflowAttribute('title', e.target.value)}
                            />

                            <div className="collapsible-section">
                                <NewTabContainer tabOptions={tabOptions} onDragEnd={handleDragEnd} />
                            </div>
                            
                            {workflowAttributes.templates.map((attribute, index) => (
                                <div key={index}>
                                    <label>{attribute.Option}</label>
                                    {renderAttributeInput('workflow', attribute, workflowData.template[attribute.Name], updateWorkflowAttribute)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderFieldProperties = () => {
        const fieldAttributes = getFilteredTabAttributes(selectedTab, tabOptions, mediaAttributes, digitalFormsAttributes, emailAttributes, uploadAttributes, checklistAttributes);
        return (
            <div>
                {selectedField && (
                    <>
                        <h2 className="sidebar-heading">Editing Field:<br />{selectedField.label ?? 'Untitled Field'}</h2>
                        <div className="collapsible-section">
                            <h3 onClick={() => toggleSection('main')} className={sections.main ? 'active' : ''}>Properties</h3>
                            {sections.main && (
                                <div>
                                    <label htmlFor="fieldLabel">Label:</label>
                                    <input
                                        id="fieldLabel"
                                        type="text"
                                        value={selectedField.label ?? ''}
                                        onChange={(e) => onFieldChange('label', e.target.value)}
                                    />
                                    {fieldAttributes.map((attribute, index) => (
                                        <div key={index}>
                                            <label>{attribute.Option}</label>
                                            {renderAttributeInput('field', attribute, selectedField[attribute.Name], onFieldChange)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    };

    const renderAttributeInput = (context, attribute, value = '', onChange) => {
        switch (attribute.Type) {
            case 'String':
                return (
                    !hasDropdownOptions(context, attribute.Name) ?
                        <input type="text" value={value} onChange={(e) => onChange(attribute.Name, e.target.value)} /> :
                        <select value={value} onChange={(e) => onChange(attribute.Name, e.target.value)}>
                            {getDropdownOptions(context, attribute.Name).map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                );
            case 'Boolean':
                return (
                    <select value={value} onChange={(e) => onChange(attribute.Name, e.target.value)}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                );
            case 'Integer':
                return (
                    <input type="number" value={value} onChange={(e) => onChange(attribute.Name, e.target.value)} />
                );
            case 'Array':
                return (
                    <div>
                        {value.map((item, index) => (
                            <div key={index}>
                                <input type="text" value={item ?? ''} onChange={(e) => onChange(`${attribute.Name}.${index}`, e.target.value)} />
                                <button onClick={() => removeArrayItem(context, attribute.Name, index)}>Remove</button>
                            </div>
                        ))}
                        <button onClick={() => addArrayItem(context, attribute.Name)}>Add Item</button>
                    </div>
                );
            default:
                return <div>Unhandled Type</div>;
        }
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