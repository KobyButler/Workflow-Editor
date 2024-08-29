import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';

const ItemType = {
    TAB: 'tab',
};

function Tab({ isActive, tabNumber, tabTitle, onClick, index, moveTab }) {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: ItemType.TAB,
        hover(item) {
            if (item.index !== index) {
                moveTab(item.index, index);
                item.index = index; // Update the item’s index after moving
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.TAB,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <motion.button
            ref={ref}
            layout
            className={`tablinks ${isActive ? 'active' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <span className="tab-number">{tabNumber}</span>
            <span className="tab-title">{tabTitle}</span>
        </motion.button>
    );
}

export default Tab;
