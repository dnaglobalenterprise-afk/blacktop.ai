import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONNECTIONS ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a', card: '#111' };

  // --- RELEVANT DATA SYNC ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const { data } = await supabase.from('loads').select('*').order('created_at', { ascending: false });
        if (data) setLoads(data);
      };
      fetchData();
    }
  }, [isLoggedIn, room]);

  const handleAction = (type: string) => alert(`${type} logic engaged. Neural Engine processing...`);

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '80px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '20px', fontSize: '50px', margin: 0 }}>BLACKTOP</h1>
          <p style={{ color: '#444', marginBottom: '40px' }}>SOVEREIGN OPERATING SYSTEM v18</p>
          <button onClick={() => setIsLoggedIn(true)} style={{ background: colors.accent, color: '#000', border: 'none', padding: '20px 40px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>SYSTEM AUTHORIZATION</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: 10 CORE MODULES */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, marginBottom: '40px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1 }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'
          ].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={{ 
              padding: '14px 12px', 
              color: room === r ? colors.accent : '#555', 
              cursor: 'pointer', 
              fontSize: '11px', 
              fontWeight: 'bold',
              borderLeft: room === r ? `3px solid ${colors.accent}` : '3px solid transparent',
              background: room === r ? '#111' : 'transparent',
              marginBottom: '4px'
            }}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>{room.toUpperCase()}</h1>
            <p style={{ color: '#444', fontSize: '12px' }}>System Active // Neural Link 100%</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              placeholder="Search ID, VIN, or Load..." 
              style={{ background: '#111', border: '1px solid #222', color: '#fff', padding: '10px 15px', width: '300px' }} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button onClick={() => handleAction('Add Entry')} style={{ background: colors.accent, color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>+ NEW ENTRY</button>
          </div>
        </header>

        {/* ROOM LOGIC */}
        <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '20px' }}>
          
          {/* CONTROL TOWER: FULL LOAD BOARD */}
          {room === 'Control Tower' && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: colors.accent, borderBottom: '2px solid #222' }}>
                  <th style={th}>LOAD #</th><th style={th}>CUSTOMER</th><th style={th}>ORIGIN</th><th style={th}>DESTINATION</th><th style={th}>RATE</th><th style={th}>STATUS</th><th style={th}>DRILL</th>
                </tr>
              </thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={td}>{l.load_number}</td><td style={td}>{l.customer_name}</td><td style={td}>{l.origin_city_state}</td><td style={td}>{l.destination_city_state}</td><td style={td}>${l.rate}</td><td style={td}><span style={{color: colors.accent}}>In-Transit</span></td><td style={td}><button style={drillBtn}>VIEW</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* FLEET LIVE GPS: MAPPING ENGINE */}
          {room === 'Fleet LIVE GPS' && (
            <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ flex: 1, background: '#050505', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: colors.accent }}>GPS ENGINE INITIALIZING... [10-DAY HISTORY BUFFER ACTIVE]</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
                <div style={statCard}>DRIVER: Active</div><div style={statCard}>ETA: 14:20</div><div style={statCard}>LOC: 34.05, -118.24</div><div style={statCard}>SPEED: 68 MPH</div>
              </div>
            </div>
          )}

          {/* DRIVER MANAGEMENT: LAYERS & COMPLIANCE */}
          {room === 'Driver Management' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={subBox}><h3>ACTIVE ROSTER</h3><p>Manage CDL layers and assignments.</p></div>
              <div style={subBox}><h3>COMPLIANCE STATUS</h3><p>Medical cards, drug tests, and MVRs.</p></div>
            </div>
          )}

          {/* ACCOUNTING & FUEL */}
          {(room === 'Accounting' || room === 'Fuel') && (
            <div>
              <h3>{room} Ledger</h3>
              <div style={{ height: '200px', background: '#000', border: '1px solid #222', marginTop: '20px' }}></div>
            </div>
          )}

          {/* FALLBACK FOR OTHER ROOMS */}
          {!['Control Tower', 'Fleet LIVE GPS', 'Driver Management', 'Accounting', 'Fuel'].includes(room) && (
             <div style={{ padding: '40px', textAlign: 'center' }}>
               <h2 style={{ color: '#333' }}>{room.toUpperCase()} INTERFACE READY</h2>
               <p style={{ color: '#222' }}>Awaiting data stream for {room} module...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const th = { padding: '15px 10px', fontSize: '12px' };
const td = { padding: '15px 10px', fontSize: '13px' };
const drillBtn = { background: 'none', border: '1px solid #333', color: '#666', padding: '5px 10px', cursor: 'pointer' };
const statCard = { background: '#000', border: '1px solid #222', padding: '15px', textAlign: 'center' as const, fontSize: '11px', color: '#32CD32' };
const subBox = { background: '#000', border: '1px solid #222', padding: '20px' };