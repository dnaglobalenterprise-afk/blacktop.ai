import React from 'react';

const ComplianceRoom = () => {
  const records = [
    { driver: 'John Doe', medicalCard: 'Valid', eldStatus: 'Compliant', drugTest: 'Clear' },
    { driver: 'Adina S.', medicalCard: 'Valid', eldStatus: 'Compliant', drugTest: 'Clear' }
  ];

  return (
    <div className="compliance-room">
      <h2 style={{borderLeft: '4px solid #ffcc00', paddingLeft: '10px'}}>Safety & Compliance Vault</h2>
      <div className="compliance-grid">
        {records.map((r, i) => (
          <div key={i} className="compliance-card" style={{background: '#222', margin: '10px', padding: '15px'}}>
            <h4>Driver: {r.driver}</h4>
            <p>ELD Status: <span style={{color: '#00ff00'}}>{r.eldStatus}</span></p>
            <p>Medical Card: {r.medicalCard}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceRoom;