import React from 'react';

function HelpPopup({ activeHelp, helpPosition }) {
    return (
        activeHelp && (
            <div className="help-popup" style={{ top: helpPosition.top, left: helpPosition.left }}>
                <img src={`path/to/help/${activeHelp}.gif`} alt="Help Gif" />
            </div>
        )
    );
}

export default HelpPopup;
