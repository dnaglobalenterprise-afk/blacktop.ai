import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- SYSTEM CORE: SECURE CONNECTION ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<any>(null); // DRILL-DOWN STATE
  const [jakeCommand, setJakeCommand] = useState('');

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a', card: '#111' };

  // --- LIVE DATA SYNC ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        // Fetching loads from Papi's database table
        const { data } = await supabase.from('loads').select('*').order('created_at', { ascending: false });
        if (data) setLoads(data);
      };
      fetchData();
    }
  }, [isLoggedIn, room]);

  // --- JAKE NEURAL EXECUTION ---
  const executeJake = async (cmd: string) => {
    if (!cmd) return;
    const { error } = await supabase.from('jake_commands').insert([{ instruction: cmd, status: 'pending' }]);
    if (!error) {
      alert(`NEURAL ENGINE: Jake has received the instruction.`);
      setJakeCommand('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '80px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '20px', fontSize: '50px', margin: 0 }}>BLACKTOP</h1>
          <p style={{ color: '#444', marginBottom: '40px' }}>SOVEREIGN OS v25 // JAKE & PAPI READY</p>
          <button onClick={() => setIsLoggedIn(true)} style={authBtnStyle}>SYSTEM AUTHORIZATION</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: 10 MODULES LOCKED */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, marginBottom: '30px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1 }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'
          ].map(r => (
            <div key={r} onClick={() => { setRoom(r); setSelectedLoad(null); }} style={navItemStyle(room === r, colors.accent)}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>
        
        {/* JAKE SIDEBAR INTERFACE */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
          <p style={{ color: colors.accent, fontSize: '10px', marginBottom: '10px' }}>NEURAL COMMAND (JAKE)</p>
          <input value={jakeCommand} onChange={(e) => setJakeCommand(e.target.value)} style={jakeInputStyle} placeholder="Talk to Jake..." />
          <button onClick={() => executeJake(jakeCommand)} style={jakeBtnStyle}>EXECUTE</button>
        </div>
      </div>

      {/* WORKSPACE AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h1 style={{fontSize: '24px'}}>{room.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
             <input placeholder="Search..." style={topSearchStyle} />
             <button style={actionBtnStyle}>+ ADD ENTRY</button>
          </div>
        </header>

        {/* 1. COMMAND CENTER (JAKE'S MAIN HUB) */}
        {room === 'Command Center' && (
          <div style={neuralTerminalStyle}>
            <h2 style={{ color: colors.accent }}>NEURAL TERMINAL (JAKE)</h2>
            <div style={terminalLogStyle}>
              <p>> SYSTEM: ONLINE</p>
              <p>> DATABASE: CONNECTED (PAPI ENGINE ACTIVE)</p>
              <p>> WAITING FOR NEURAL INSTRUCTIONS...</p>
            </div>
          </div>
        )}

        {/* 2. CONTROL TOWER (LOAD BOARD + DRILL-DOWN) */}
        {room === 'Control Tower' && (
          <div>
            {selectedLoad ? (
              <div style={drillDownBoxStyle}>
                <button onClick={() => setSelectedLoad(null)} style={backBtnStyle}> ➔ BACK TO LOAD BOARD</button>
                <h2 style={{color: colors.accent}}>LOAD #{selectedLoad.load_number} - DRILL DOWN</h2>
                <div style={detailGridStyle}>
                  <div style={statBoxStyle}><strong>CUSTOMER:</strong> {selectedLoad.customer_name}</div>
                  <div style={statBoxStyle}><strong>RATE:</strong> ${selectedLoad.rate}</div>
                  <div style={statBoxStyle}><strong>ORIGIN:</strong> {selectedLoad.origin_city_state}</div>
                  <div style={statBoxStyle}><strong>DESTINATION:</strong> {selectedLoad.destination_city_state}</div>
                  <div style={statBoxStyle}><strong>ETA:</strong> CALCULATING...</div>
                  <div style={statBoxStyle}><strong>STATUS:</strong> IN-TRANSIT</div>
                </div>
              </div>
            ) : (
              <table style={tableStyle}>
                <thead><tr style={thStyle}><th>LOAD #</th><th>CUSTOMER</th><th>ROUTE</th><th>RATE</th><th>STATUS</th><th>DRILL</th></tr></thead>
                <tbody>
                  {loads.map(l => (
                    <tr key={l.id} style={trStyle}>
                      <td style={tdStyle}>{l.load_number}</td>
                      <td style={tdStyle}>{l.customer_name}</td>
                      <td style={tdStyle}>{l.origin_city_state} ➔ {l.destination_city_state}</td>
                      <td style={tdStyle}>${l.rate}</td>
                      <td style={tdStyle}><span style={{color: colors.accent}}>ACTIVE</span></td>
                      <td style={tdStyle}><button onClick={() => setSelectedLoad(l)} style={drillBtnStyle}>VIEW DETAILS</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* 3. FLEET LIVE GPS (10-DAY HISTORY) */}
        {room === 'Fleet LIVE GPS' && (
          <div style={{ height: '70vh', background: '#050505', border: '1px solid #222', padding: '20px' }}>
            <h3 style={{ color: colors.accent }}>LIVE TRACKING ENGINE</h3>
            <div style={{ flex: 1, border: '1px solid #111', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{color: '#333'}}>MAP VIEW: MICROPONT/SAMSARA INTEGRATION [10-DAY SEARCH ACTIVE]</p>
            </div>
          </div>
        )}

        {/* 4. DRIVER/MAINTENANCE/COMPLIANCE/ACCOUNTING/CRM/FUEL (READY ROOMS) */}
        {!['Command Center', 'Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <div style={readyRoomStyle}>
            <h2 style={{ color: colors.accent }}>{room.toUpperCase()} MODULE</h2>
            <p style={{ color: '#444' }}>Awaiting Papi's Data Stream for validated entries.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- CSS-IN-JS STYLING ---
const authBtnStyle = { background: '#32CD32', color: '#000', border: 'none', padding: '20px 40px', fontWeight: 'bold' as any, cursor: 'pointer' };
const navItemStyle = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#555', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', background: active ? '#111' : 'transparent', fontSize: '11px', marginBottom: '4px' });
const jakeInputStyle = { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '8px', fontSize: '11px' };
const jakeBtnStyle = { width: '100%', background: '#222', color: '#32CD32', border: 'none', padding: '5px', marginTop: '5px', cursor: 'pointer', fontSize: '10px' };
const topSearchStyle = { background: '#111', border: '1px solid #222', color: '#fff', padding: '10px', width: '250px' };
const actionBtnStyle = { background: '#32CD32', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold' as any, cursor: 'pointer' };
const neuralTerminalStyle = { border: '1px solid #32CD32', padding: '40px', height: '70vh', background: '#050505' };
const terminalLogStyle = { background: '#000', border: '1px solid #111', padding: '20px', color: '#32CD32', height: '100%', overflowY: 'auto' as any };
const drillDownBoxStyle = { background: '#111', padding: '30px', border: '1px solid #222' };
const backBtnStyle = { color: '#32CD32', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' as any };
const detailGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
const statBoxStyle = { background: '#000', padding: '20px', border: '1px solid #222', fontSize: '14px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as any };
const thStyle = { textAlign: 'left' as any, color: '#32CD32', borderBottom: '2px solid #222', padding: '10px' };
const trStyle = { borderBottom: '1px solid #111' };
const tdStyle = { padding: '15px 10px', fontSize: '13px' };
const drillBtnStyle = { background: 'none', border: '1px solid #333', color: '#666', padding: '5px 10px', cursor: 'pointer', fontSize: '10px' };
const readyRoomStyle = { padding: '80px', border: '1px solid #111', textAlign: 'center' as any };