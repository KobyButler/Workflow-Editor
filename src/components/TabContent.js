import React from 'react';
import FormTab from './Tabs/FormTab';
import MediaTab from './Tabs/MediaTab';
import ShareTab from './Tabs/ShareTab';
import UploadTab from './Tabs/UploadTab';
import DigitalFormTab from './Tabs/DigitalFormTab';

export default function TabContent({ groups = [], tabKey, handleFieldClick }) {
    const renderContent = () => {
        if (tabKey.startsWith('F')) {
            return <FormTab groups={groups} handleFieldClick={handleFieldClick} />;
        } else if (tabKey.startsWith('M')) {
            return <MediaTab />;
        } else if (tabKey.startsWith('E')) {
            return <ShareTab />;
        } else if (tabKey.startsWith('C')) {
            return <UploadTab />;
        } else if (tabKey.startsWith('PF')) {
            return <DigitalFormTab />;
        } else {
            return <div className="tabcontent">Unhandled Tab Type</div>;
        }
    };

    return (
        <div className="tab-content">
            {renderContent()}
        </div>
    );
}
