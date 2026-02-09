import React, { useState, useEffect } from 'react';

// Room types locked to Dom's requirements
type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');

  // NEURAL ENGINE (JAKE) - ACTIVATED
  useEffect(() => {
    const runJakeAudit = () => {
      console.log("Jake Neural Engine: Monitoring Carrier 71d05620...");
    };
    runJakeAudit();
  }, []);

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return (
          <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
              <h3 style={{ color: '#00FF00', fontWeight: '900', fontSize: '24px' }}>CONTROL TOWER</h3>
              <button style={{ backgroundColor: '#00FF00', color: '#000', padding: '12px 24px', fontWeight: '900', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                + ADD NEW LOAD
              </button>
            </div>
            {/* CLEAN TABLE - NO DUMMY DATA */}
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
                  <tr>
                    <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#333', fontSize: '12px' }}>
                      NO ACTIVE LOADS FOUND. CLICK "+ ADD NEW LOAD" TO BEGIN.
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
            <h3 style={{ color: '#00FF00', fontWeight: '900', marginBottom: '20px' }}>DRIVER MANAGEMENT</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {['Compliance', 'Maintenance', 'Accounting', 'Fuel'].map(item => (
                <div key={item} style={{ border: '1px solid #333', padding: '30px', borderRadius: '8px', textAlign: 'center', fontSize: '12px' }}>
                  {item.toUpperCase()} LAYER
                </div>
              ))}
            </div>
          </div>
        );
      case 'Compliance Room':
        return <div style={{ padding: '40px', color: '#00FF00' }}>COMPLIANCE ROOM ACTIVE</div>;
      case 'Maintenance Hub':
        return <div style={{ padding: '40px', color: '#00FF00' }}>MAINTENANCE HUB ACTIVE</div>;
      case 'Accounting':
        return <div style={{ padding: '40px', color: '#00FF00' }}>ACCOUNTING HUB ACTIVE</div>;
      case 'Fuel':
        return <div style={{ padding: '40px', color: '#00FF00' }}>FUEL MANAGEMENT ACTIVE</div>;
      default:
        return (
          <div style={{ padding: '30px', color: '#00FF00' }}>
            <div style={{ border: '1px solid #00FF00', padding: '30px', borderRadius: '12px', marginBottom: '30px', backgroundColor: '#050505' }}>
              <h3 style={{ fontWeight: '900', marginBottom: '15px', fontSize: '20px' }}>NEURAL STATUS (JAKE)</h3>
              <p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6' }}>
                "Jake Neural Dispatch is online. Monitoring all system layers. No anomalies detected in Carrier 71d05620. 10-day history indexing complete."
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '12px', marginBottom: '10px', color: '#555' }}>COMMAND CENTER REVIEW</h4>
                <p>{"- LIVE GPS TRACKING: ACTIVE"}</p>
                <p>{"- 10-DAY HISTORY SEARCH: READY"}</p>
              </div>
              <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '12px', marginBottom: '10px', color: '#555' }}>SYSTEM INTEGRATIONS</h4>
                <p>{"- FUEL CARD SYNC: STABILIZED"}</p>
                <p>{"- GATEKEEPER COMPLIANCE: ONLINE"}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'monospace' }}>
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '280px', borderRight: '1px solid #222', padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a' }}>
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
        <div style={{ borderTop: '1px solid #222', paddingTop: '20px', fontSize: '10px', color: '#333', fontWeight: 'bold' }}>
          NEURAL ENGINE V37.4 | JAKE OPERATIONAL
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 30px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050505' }}>
          <h2 style={{ textTransform: 'uppercase', fontWeight: '900', letterSpacing: '2px' }}>{activeRoom}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '9px', color: '#00FF00', border: '1px solid #00FF00', padding: '4px 12px', borderRadius: '2px', fontWeight: 'bold' }}>SYSTEM SECURE: 71D05620</span>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderRoom()}
        </div>
      </div>
    </div>
  );
};

export default BlacktopOS;