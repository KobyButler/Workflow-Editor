import React from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Import Font Awesome PDF icon

const DigitalFormTab = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',       // Ensure the div takes the full height of the parent container
            width: '100%',        // Ensure the div takes the full width of the parent container
        }}>
            <FaFilePdf size={150} color="#E53A4E" style={{marginTop: '40px'}} />  {/* PDF icon, size and color */}
        </div>
    );
};

export default DigitalFormTab;
