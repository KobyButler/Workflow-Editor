/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';

const ItemType = {
    FIELD: 'field',
};

export default function Field({ group, index, moveField, handleDragStart, handleDragEnd }) {
    const ref = React.useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.FIELD,
        item: { index, group },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: () => {
            handleDragEnd();
        },
    });

    const [, drop] = useDrop({
        accept: ItemType.FIELD,
        hover(item) {
            if (item.index !== index) {
                moveField(item.index, index);
                item.index = index;
            }
        },
    });

    drag(drop(ref));

    return (
        <motion.div
            ref={ref}
            className="group-container"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: isDragging ? 0.5 : 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="drag-handle">
                <i className="fas fa-arrows-alt"></i>
            </div>
            <RenderField group={group} />
        </motion.div>
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
        return <motion.div className="unhandled-field-type">No group data provided.</motion.div>;
    }

    switch (group.type) {
        case 'AcuantButton':
            return <motion.button className="edit-input-acuant-button">{group.label}</motion.button>;
        case 'AcuantTextbox':
        case 'Textbox':
            return (
                <motion.div>
                    <label className="editable-label" htmlFor={`input-${group.label}`}>{group.label}</label>
                    <input id={`input-${group.label}`} type="text" />
                </motion.div>
            );
        case 'Checkbox':
            return (
                <motion.div>
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
                </motion.div>
            );
        case 'CommentLog':
            return (
                <motion.div>
                    <label className="edit-input-grey-label">{group.label}</label>
                    <input type="text" className="commentlog-input" placeholder="Enter a comment" />
                </motion.div>
            );
        case 'HTMLLabel':
            return <motion.div className="editable-html" dangerouslySetInnerHTML={{ __html: group.label }}></motion.div>;
        case 'MultiDropDownList':
            return (
                <motion.div>
                    <label className="editable-label">{group.label}</label>
                    <select multiple>
                        {group?.items?.map((item, i) => (
                            <option key={i} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </motion.div>
            );
        case 'SingleDropDownList':
            return (
                <motion.div>
                    <label className="editable-label">{group.label}</label>
                    <select>
                        {group?.items?.map((item, i) => (
                            <option key={i} value={item.title}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </motion.div>
            );
        case 'PassFail':
            if (!group.items || thumbsState.length === 0) return null; // Ensure thumbsState is initialized

            return (
                <motion.div>
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
                </motion.div>
            );
        case 'Radio':
            return (
                <motion.div>
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
                </motion.div>
            );
        case 'DateSelector':
            return (
                <motion.div>
                    <label className="editable-label">{group.label}</label>
                    <input type="date" name={group.label} />
                </motion.div>
            );
        case 'Label':
            return <motion.label className="edit-input-grey-label">{group.label}</motion.label>;
        default:
            return <motion.div className="unhandled-field-type">Unhandled Field Type: {group.type}</motion.div>;
    }
}
