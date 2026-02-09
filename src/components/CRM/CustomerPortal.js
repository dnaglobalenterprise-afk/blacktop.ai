import React from 'react';

export default function CRM({ children }) {
  return (
    <div style={{ padding: 24, fontFamily: 'Arial' }}>
      <h2 style={{ marginTop: 0 }}>CRM</h2>
      <div>✅ CRM is exporting correctly.</div>

      <div style={{ marginTop: 16 }}>
        {children}
      </div>
    </div>
  );
}
