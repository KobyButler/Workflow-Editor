import React from 'react';

const MediaTab = () => {
    return (
        <div className="tabcontent media-tab-content">
            <i className="fas fa-camera gradient-icon"></i>
            <p>Document asset damage, fuel level, current mileage, and more.</p>
            <button className="new-capture-button">
                +<i className="fa-solid fa-camera"></i> NEW CAPTURE
            </button>
        </div>
    );
};

export default MediaTab;
