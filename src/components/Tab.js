import React from 'react';

function Tab({ isActive, tabNumber, tabTitle, onClick }) {
    return (
        <button className={`tablinks ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="tab-number">{tabNumber}</span>
            <span className="tab-title">{tabTitle}</span>
        </button>
    );
}

export default Tab;
