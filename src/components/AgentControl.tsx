import React from 'react';
import axios from 'axios';

export const AgentControl: React.FC<{ activeTarget?: string }> = ({ activeTarget }) => {
  const handleAction = async () => {
    if (!activeTarget) {
      alert("Select a driver or broker first!");
      return;
    }

    try {
      await axios.post('http://localhost:3000/send-action', {
        target: activeTarget,
        message: `System Alert: Compliance check required for ${activeTarget}`
      });
      alert(`✅ AI Agent successfully sent email regarding ${activeTarget}`);
    } catch (err) {
      alert("Failed to trigger AI action.");
    }
  };

  return (
    <div style={{ padding: '20px', background: '#000', border: '1px solid #00ff00', borderRadius: '8px' }}>
      <h2 style={{ color: '#00ff00', marginTop: 0 }}>AI Agent Action Center</h2>
      <p style={{ color: '#fff' }}>
        Currently focused on: <span style={{ color: '#00ff00' }}>{activeTarget || 'None'}</span>
      </p>
      <button 
        onClick={handleAction}
        style={{ 
          width: '100%', 
          padding: '15px', 
          background: '#00ff00', 
          color: '#000', 
          border: 'none', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          borderRadius: '4px' 
        }}
      >
        SEND COMPLIANCE EMAIL
      </button>
    </div>
  );
};