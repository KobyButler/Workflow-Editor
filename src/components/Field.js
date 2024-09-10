/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Field({ group, index, moveField, handleDragStart, handleDragEnd, handleFieldClick }) {
    const ref = React.useRef(null);

    return (
        <div
            ref={ref}
            className="group-container"
            initial={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={handleFieldClick}
        >
            <div className="drag-handle">
                <i className="fas fa-arrows-alt"></i>
            </div>
            <RenderField group={group} />
        </div>
    );
}

// Function to render different field types based on the 'type' property
export function RenderField({ group }) {
    const [thumbsState, setThumbsState] = useState(
        group?.items ? group?.items?.map(() => ({ thumbsUpColor: 'grey', thumbsDownColor: 'grey' })) : []
    );

    const toggleThumbsUp = (index) => {
        setThumbsState((prevState) =>
            prevState.map((state, i) =>
                i === index
                    ? { thumbsUpColor: state.thumbsUpColor === 'grey' ? 'green' : 'grey', thumbsDownColor: 'grey' }
                    : state
            )
        );
    };

    const toggleThumbsDown = (index) => {
        setThumbsState((prevState) =>
            prevState.map((state, i) =>
                i === index
                    ? { thumbsDownColor: state.thumbsDownColor === 'grey' ? 'red' : 'grey', thumbsUpColor: 'grey' }
                    : state
            )
        );
    };

    if (!group) {
        return <div className="unhandled-field-type">No group data provided.</div>;
    }

    switch (group.type) {
        case 'AcuantButton':
            return <button className="edit-input-acuant-button">{group.label}</button>;
        case 'AcuantTextbox':
        case 'Textbox':
            return (
                <div>
                    <label className="editable-label" htmlFor={`input-${group.label}`}>{group.label}</label>
                    <input id={`input-${group.label}`} type="text" />
                </div>
            );
        case 'Checkbox':
            return (
                <div>
                    <label className="edit-input-grey-label">{group.label}</label>
                    <div className="field-option-list">
                        {group?.items?.map((item, i) => (
                            <div key={i} className="checkbox-label field-option-item">
                                <input type="checkbox" defaultChecked={item.default === 'true'} />
                                <span className="checkmark"></span>
                                <label className="editable-item">{item.title}</label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'CommentLog':
            return (
                <div>
                    <label className="edit-input-grey-label">{group.label}</label>
                    <input type="text" className="commentlog-input" placeholder="Enter a comment" />
                </div>
            );
        case 'HTMLLabel':
            return <div className="editable-html" dangerouslySetInnerHTML={{ __html: group.label }}></div>;
        case 'MultiDropDownList':
            return (
                <div>
                    <label className="editable-label">{group.label}</label>
                    <select multiple>
                        {group?.items?.map((item, i) => (
                            <option key={i} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
            );
        case 'SingleDropDownList':
            return (
                <div>
                    <label className="editable-label">{group.label}</label>
                    <select>
                        {group?.items?.map((item, i) => (
                            <option key={i} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
            );
        case 'PassFail':
            if (!group.items || thumbsState.length === 0) return null; // Ensure thumbsState is initialized

            return (
                <div>
                    <label className="edit-input-grey-label">{group.label}</label>
                    <div className="field-option-list">
                        {group?.items?.map((item, i) => (
                            <div key={i} className="pass-fail field-option-item">
                                <label className="editable-item">{item.title}</label>
                                <i
                                    className="fas fa-thumbs-up"
                                    style={{ color: thumbsState[i]?.thumbsUpColor, cursor: 'pointer' }}
                                    onClick={() => toggleThumbsUp(i)}
                                ></i>
                                <i
                                    className="fas fa-thumbs-down"
                                    style={{ color: thumbsState[i]?.thumbsDownColor, cursor: 'pointer' }}
                                    onClick={() => toggleThumbsDown(i)}
                                ></i>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'Radio':
            return (
                <div>
                    <label className="edit-input-grey-label">{group.label}</label>
                    <div className="field-option-list">
                        {group?.items?.map((item, i) => (
                            <div key={i} className="radio-label field-option-item">
                                <input type="radio" name={group.label} />
                                <span className="radioDot"></span>
                                <label className="editable-item">{item.title}</label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'DateSelector':
            return (
                <div>
                    <label className="editable-label">{group.label}</label>
                    <input type="date" name={group.label} />
                </div>
            );
        case 'Label':
            return <label className="edit-input-grey-label">{group.label}</label>;
        default:
            return <div className="unhandled-field-type">Unhandled Field Type: {group.type}</div>;
    }
}
