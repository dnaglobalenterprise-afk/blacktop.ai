import React, { useState, useEffect } from 'react';

type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');

  useEffect(() => {
    console.log("Jake Neural Engine: Active. Auditing All Layers.");
  }, []);

  // Standardized UI for all Rooms to ensure "Add" and "Drill Down" capability
  const renderRoomContent = (title: string, actionText: string, tableHeaders: string[]) => (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '28px', textTransform: 'uppercase' }}>{title}</h3>
        <button style={{ backgroundColor: '#00FF00', color: '#000', padding: '12px 24px', fontWeight: '900', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          {actionText}
        </button>
      </div>
      <div style={{ backgroundColor: '#0a0a0a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', color: '#00FF00', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #00FF00', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#111' }}>
              {tableHeaders.map(header => <th key={header} style={{ padding: '20px' }}>{header}</th>)}
              <th style={{ padding: '20px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={tableHeaders.length + 1} style={{ padding: '60px', textAlign: 'center', color: '#333', fontWeight: 'bold', fontStyle: 'italic' }}>
                SYSTEM STANDBY. NO ENTRIES IN {title.toUpperCase()}.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return renderRoomContent('Control Tower', '+ Add New Load', ['Status', 'Load ID', 'Origin/Dest', 'Driver/Truck', 'Live GPS / ETA', '10-Day History']);
      case 'Driver Management':
        return renderRoomContent('Driver Management', '+ Add New Driver', ['Name', 'Status', 'Truck ID', 'Contact', 'Assigned Load', 'Performance']);
      case 'Compliance Room':
        return renderRoomContent('Compliance Room', '+ Upload Documents', ['Driver', 'Document Type', 'Expiry Date', 'Status', 'Audit Log']);
      case 'Maintenance Hub':
        return renderRoomContent('Maintenance Hub', '+ New Service Entry', ['Unit #', 'Service Type', 'Last Service', 'Next Interval', 'Vendor']);
      case 'Accounting':
        return renderRoomContent('Accounting', '+ New Invoice/Entry', ['Invoice #', 'Entity', 'Amount', 'Date', 'Status', 'P&L Impact']);
      case 'Fuel':
        return renderRoomContent('Fuel', '+ Sync Fuel Cards', ['Card ID', 'Driver', 'Transaction', 'Location', 'Gallons', 'Neural Audit']);
      case 'CRM':
        return renderRoomContent('CRM', '+ Add Customer', ['Client Name', 'Key Contact', 'Open Loads', 'Rate Agreement', 'Rating']);
      case 'Fleet Live GPS':
        return renderRoomContent('Fleet Live GPS', 'Live Map Sync', ['Truck ID', 'Driver', 'Current Lat/Long', 'Heading', 'Speed', 'Battery/Fuel']);
      default:
        return (
          <div style={{ padding: '40px' }}>
            <div style={{ border: '4px solid #00FF00', padding: '40px', borderRadius: '16px', backgroundColor: '#050505', marginBottom: '40px' }}>
              <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '32px', marginBottom: '15px', fontStyle: 'italic' }}>NEURAL STATUS (JAKE)</h3>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>"Jake Neural Dispatch Engine initialized. Monitoring all system layers. No anomalies detected."</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ border: '1px solid #222', padding: '30px', borderRadius: '12px', backgroundColor: '#0a0a0a' }}>
                <h4 style={{ color: '#444', fontWeight: '900', fontSize: '12px', marginBottom: '15px', textTransform: 'uppercase' }}>System Overview</h4>
                <div style={{ color: '#00FF00', fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                  <p>{"> LIVE GPS TRACKING: ACTIVE"}</p>
                  <p style={{ marginTop: '10px' }}>{"> 10-DAY HISTORY: INDEXED"}</p>
                  <p style={{ marginTop: '10px' }}>{"> COMPLIANCE & FUEL: SECURED"}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '300px', backgroundColor: '#050505', borderRight: '1px solid #111', padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#00FF00', fontWeight: '900', fontSize: '30px', marginBottom: '60px', fontStyle: 'italic' }}>BLACKTOP OS</h1>
        <nav style={{ flex: 1 }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet Live GPS'].map((room) => (
            <button 
              key={room}
              onClick={() => setActiveRoom(room as RoomName)} 
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '14px', marginBottom: '8px',
                backgroundColor: activeRoom === room ? '#00FF00' : 'transparent',
                color: activeRoom === room ? '#000' : '#444',
                border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px'
              }}
            >
              {room}
            </button>
          ))}
        </nav>
        <div style={{ fontSize: '10px', color: '#222', fontWeight: 'bold' }}>NEURAL ENGINE V37.8 | JAKE ACTIVE</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '25px 40px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '24px' }}>{activeRoom}</h2>
          <span style={{ fontSize: '10px', color: '#00FF00', border: '1px solid #00FF00', padding: '6px 14px', fontWeight: '900' }}>SECURE SESSION: 71D05620</span>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>{renderRoom()}</div>
      </div>
    </div>
  );
};

export default BlacktopOS;