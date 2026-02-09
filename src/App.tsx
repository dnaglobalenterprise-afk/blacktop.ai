import React, { useState } from 'react';

// Room types locked to Dom's requirements
type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return (
          <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
              <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '24px' }}>CONTROL TOWER (LOAD BOARD)</h3>
              <button style={{ backgroundColor: '#00FF00', color: '#000', padding: '12px 24px', fontWeight: '900', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                + ADD NEW LOAD
              </button>
            </div>
            <div style={{ backgroundColor: '#111', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
              <table style={{ width: '100%', textAlign: 'left', color: '#00FF00', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #00FF00', fontSize: '11px', textTransform: 'uppercase', backgroundColor: '#0a0a0a' }}>
                    <th style={{ padding: '15px' }}>Status</th>
                    <th style={{ padding: '15px' }}>Load ID</th>
                    <th style={{ padding: '15px' }}>Origin/Dest</th>
                    <th style={{ padding: '15px' }}>Driver/Truck Details</th>
                    <th style={{ padding: '15px' }}>Live GPS / ETA</th>
                    <th style={{ padding: '15px' }}>10-Day History</th>
                    <th style={{ padding: '15px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #222' }}>
                    <td style={{ padding: '15px' }}><span style={{ color: '#00FF00' }}>● ACTIVE</span></td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>BT-9422</td>
                    <td style={{ padding: '15px' }}>CHI &rarr; DAL</td>
                    <td style={{ padding: '15px' }}>Marcus V. / Unit 502</td>
                    <td style={{ padding: '15px', color: '#fff' }}>Dallas, TX (ETA 14:00)</td>
                    <td style={{ padding: '15px', fontSize: '10px', color: '#555' }}>Search 10-Day History...</td>
                    <td style={{ padding: '15px' }}>
                      <button style={{ background: 'transparent', color: '#00FF00', border: '1px solid #00FF00', padding: '5px 10px', fontSize: '10px', cursor: 'pointer' }}>
                        DRILL DOWN
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Driver Management':
        return (
          <div style={{ padding: '30px' }}>
            <h3 style={{ color: '#00FF00', fontWeight: '900', marginBottom: '20px' }}>DRIVER MANAGEMENT LAYERS</h3>
            <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', display: 'grid', gap: '20px' }}>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>COMPLIANCE ROOM</div>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>MAINTENANCE HUB</div>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>ACCOUNTING</div>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>FUEL MODULE</div>
            </div>
          </div>
        );
      case 'Accounting':
        return <div style={{ padding: '40px', color: '#00FF00', textAlign: 'center' }}>ACCOUNTING HUB - FULL FINANCIAL REVIEW</div>;
      case 'Fuel':
        return <div style={{ padding: '40px', color: '#00FF00', textAlign: 'center' }}>FUEL MANAGEMENT - CARRIERS & DATA</div>;
      default:
        return (
          <div style={{ padding: '30px', color: '#00FF00' }}>
            <div style={{ border: '1px solid #00FF00', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
              <h3 style={{ fontWeight: '900', marginBottom: '15px' }}>NEURAL STATUS (JAKE)</h3>
              <p style={{ color: '#fff', fontSize: '14px' }}>"System audit complete. Carrier ID 71d05620 identified. All rooms functional. Neural audit is active."</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '12px', marginBottom: '10px', color: '#555' }}>COMMAND CENTER REVIEW</h4>
                <p>{"- GPS TRACKING: SAMSARA READY"}</p>
                <p>{"- 10-DAY HISTORY: ACTIVE"}</p>
              </div>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '12px', marginBottom: '10px', color: '#555' }}>SYSTEM LOGS</h4>
                <p>{"- FUEL MODULE: STABILIZED"}</p>
                <p>{"- GATEKEEPER: ONLINE"}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'monospace' }}>
      <div style={{ width: '280px', borderRight: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#00FF00', fontWeight: '900', fontSize: '28px', marginBottom: '50px', letterSpacing: '-2px' }}>BLACKTOP OS</h1>
        <nav style={{ flex: 1 }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 
            'CRM', 'Fuel', 'Fleet Live GPS'
          ].map((room) => (
            <button 
              key={room}
              onClick={() => setActiveRoom(room as RoomName)} 
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '12px', marginBottom: '8px',
                backgroundColor: activeRoom === room ? '#00FF00' : 'transparent',
                color: activeRoom === room ? '#000' : '#888',
                border: 'none', fontWeight: '900', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase'
              }}
            >
              {room}
            </button>
          ))}
        </nav>
        <div style={{ borderTop: '1px solid #222', paddingTop: '20px', fontSize: '10px', color: '#333' }}>
          NEURAL ENGINE V37.3 | JAKE ACTIVE
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 30px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050505' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', letterSpacing: '2px' }}>{activeRoom}</h2>
          <span style={{ fontSize: '9px', color: '#00FF00', border: '1px solid #00FF00', padding: '4px 12px', borderRadius: '50px' }}>SECURE SESSION</span>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderRoom()}
        </div>
      </div>
    </div>
  );
};

export default BlacktopOS;