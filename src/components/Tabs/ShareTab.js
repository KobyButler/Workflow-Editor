import React from 'react';

const ShareTab = () => {
    return (
        <div className="tabcontent share-tab-content">
            <div className="button-container">
                <button className="add-email-button">
                    <i className="fa-regular fa-envelope-open"></i> ADD EMAIL
                </button>
                <button className="add-phone-button">
                    <i className="fas fa-phone"></i> ADD PHONE
                </button>
            </div>
            <div className="divider"></div>
            <p>Add emails or phone numbers to share this inspection.</p>
        </div>
    );
};

export default ShareTab;
