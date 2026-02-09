import React, { useState } from 'react';

type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');

  const renderRoomHeader = (title: string, actionText: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
      <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '28px', textTransform: 'uppercase', fontStyle: 'italic' }}>{title}</h3>
      <button style={{ backgroundColor: '#00FF00', color: '#000', padding: '12px 24px', fontWeight: '900', border: 'none', cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase' }}>
        {actionText}
      </button>
    </div>
  );

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return (
          <div style={{ padding: '40px' }}>
            {renderRoomHeader('Control Tower', '+ Add New Load')}
            <div style={{ backgroundColor: '#0a0a0a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden' }}>
              <table style={{ width: '100%', textAlign: 'left', color: '#00FF00', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #00FF00', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#111' }}>
                    <th style={{ padding: '20px' }}>Status</th>
                    <th style={{ padding: '20px' }}>Load ID</th>
                    <th style={{ padding: '20px' }}>Origin/Dest</th>
                    <th style={{ padding: '20px' }}>Driver/Truck</th>
                    <th style={{ padding: '20px' }}>Live GPS / ETA</th>
                    <th style={{ padding: '20px' }}>10-Day History</th>
                    <th style={{ padding: '20px', textAlign: 'right' }}>Drill Down</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} style={{ padding: '60px', textAlign: 'center', color: '#333', fontWeight: 'bold' }}>SAMSARA GPS FEED ACTIVE... NO LOADS IN QUEUE.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Fuel': return <div style={{ padding: '40px' }}>{renderRoomHeader('Fuel Management', '+ Sync Fuel Cards')}</div>;
      case 'Accounting': return <div style={{ padding: '40px' }}>{renderRoomHeader('Accounting', '+ New Entry')}</div>;
      case 'Driver Management':
        return (
          <div style={{ padding: '40px' }}>
            {renderRoomHeader('Driver Management', '+ Add Driver')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {['Compliance Room', 'Maintenance Hub', 'Accounting', 'Fuel'].map(layer => (
                <div key={layer} style={{ border: '1px solid #222', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#555', fontWeight: '900' }}>{layer.toUpperCase()}</div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={{ padding: '40px' }}>
            {/* JAKE NEURAL BRAIN + INTERFACE BUTTON */}
            <div style={{ border: '4px solid #00FF00', padding: '40px', borderRadius: '16px', backgroundColor: '#050505', marginBottom: '40px', boxShadow: '0 0 20px rgba(0,255,0,0.2)' }}>
              <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '32px', marginBottom: '15px', fontStyle: 'italic' }}>NEURAL STATUS (JAKE)</h3>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', marginBottom: '25px' }}>
                "Jake Neural Dispatch Engine initialized. Monitoring Carrier 71d05620. Auditing 10-day history. Systems Wired."
              </p>
              <button 
                onClick={() => alert("JAKE: 'Awaiting voice command. Carrier 71d05620 secure.'")}
                style={{ backgroundColor: '#00FF00', color: '#000', padding: '15px 30px', fontWeight: '900', border: 'none', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <span style={{ fontSize: '20px' }}>●</span> COMMUNICATE WITH JAKE
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ border: '1px solid #222', padding: '30px', borderRadius: '12px', backgroundColor: '#0a0a0a' }}>
                <h4 style={{ color: '#444', fontWeight: '900', fontSize: '12px', marginBottom: '15px', textTransform: 'uppercase' }}>Command Center Review</h4>
                <div style={{ color: '#00FF00', fontSize: '14px', fontFamily: 'monospace' }}>
                  <p>{"> GPS TRACKING: SAMSARA READY"}</p>
                  <p style={{ marginTop: '10px' }}>{"> 10-DAY HISTORY: ACTIVE"}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'monospace', overflow: 'hidden' }}>
      <div style={{ width: '300px', backgroundColor: '#050505', borderRight: '1px solid #111', padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#00FF00', fontWeight: '900', fontSize: '28px', marginBottom: '60px', fontStyle: 'italic', letterSpacing: '-2px' }}>BLACKTOP OS</h1>
        <nav style={{ flex: 1 }}>
          {(['Command Center', 'Control Tower', 'Driver Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet Live GPS'] as RoomName[]).map((room) => (
            <button key={room} onClick={() => setActiveRoom(room)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px', marginBottom: '8px', backgroundColor: activeRoom === room ? '#00FF00' : 'transparent', color: activeRoom === room ? '#000' : '#444', border: 'none', fontWeight: '900', fontSize: '11px', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px' }}>
              {room}
            </button>
          ))}
        </nav>
        <div style={{ fontSize: '10px', color: '#222', fontWeight: 'bold' }}>NEURAL ENGINE V38.1 | JAKE WIRED</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '25px 40px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '24px', fontStyle: 'italic' }}>{activeRoom}</h2>
          <span style={{ fontSize: '10px', color: '#00FF00', border: '1px solid #00FF00', padding: '6px 14px', fontWeight: '900' }}>SECURE: 71D05620</span>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>{renderRoom()}</div>
      </div>
    </div>
  );
};

export default BlacktopOS;