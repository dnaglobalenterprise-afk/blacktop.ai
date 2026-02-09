import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- THE BLACKTOP FOUNDATION ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);
  const [jakeCommand, setJakeCommand] = useState('');

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a', card: '#111' };

  // --- PERSISTENT DATA STREAM ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const { data } = await supabase.from('loads').select('*').order('created_at', { ascending: false });
        if (data) setLoads(data);
      };
      fetchData();
    }
  }, [isLoggedIn, room]);

  // --- 🧠 JAKE NEURAL ENGINE (SIDEBAR COMMANDS) ---
  const handleJakeExecute = async () => {
    if (!jakeCommand) return;
    const { error } = await supabase
      .from('jake_commands')
      .insert([{ instruction: jakeCommand, status: 'pending' }]);
    
    if (!error) {
      alert(`JAKE: Processing Instruction...`);
      setJakeCommand('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '80px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '20px', fontSize: '50px', margin: 0 }}>BLACKTOP</h1>
          <p style={{ color: '#444', marginBottom: '40px' }}>SYSTEM READY // JAKE STANDING BY</p>
          <button onClick={() => setIsLoggedIn(true)} style={{ background: colors.accent, color: '#000', border: 'none', padding: '15px 40px', fontWeight: 'bold', cursor: 'pointer' }}>AUTHORIZE ACCESS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* 🧭 SIDEBAR: THE 10 COMMAND MODULES */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, marginBottom: '30px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1 }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'
          ].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={{ 
              padding: '12px 10px', color: room === r ? colors.accent : '#555', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', borderLeft: room === r ? `3px solid ${colors.accent}` : '3px solid transparent', background: room === r ? '#111' : 'transparent', marginBottom: '5px' 
            }}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>

        {/* 🧠 JAKE'S PERMANENT TERMINAL */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
          <label style={{ color: colors.accent, fontSize: '10px', display: 'block', marginBottom: '8px' }}>NEURAL COMMAND (JAKE)</label>
          <input 
            value={jakeCommand}
            onChange={(e) => setJakeCommand(e.target.value)}
            placeholder="Issue Instruction..." 
            style={{ width: '100%', background: '#000', border: '1px solid #333', color: '#fff', padding: '8px', fontSize: '12px', marginBottom: '10px' }} 
          />
          <button onClick={handleJakeExecute} style={{ width: '100%', background: '#111', color: colors.accent, border: `1px solid ${colors.accent}`, padding: '6px', cursor: 'pointer', fontWeight: 'bold' }}>EXECUTE</button>
        </div>
      </div>

      {/* 🖥️ WORKSPACE AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h1>{room.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input placeholder="Search System..." style={{ background: '#111', border: '1px solid #222', color: '#fff', padding: '10px', width: '250px' }} />
            <button style={{ background: colors.accent, color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold' }}>+ ADD ENTRY</button>
          </div>
        </header>

        {/* ROOM LOGIC: CONTROL TOWER (LOAD BOARD) */}
        {room === 'Control Tower' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: colors.accent, borderBottom: '2px solid #222' }}>
                <th style={{padding: '12px'}}>LOAD #</th><th>CUSTOMER</th><th>ORIGIN</th><th>DESTINATION</th><th>RATE</th><th>STATUS</th><th>DRILL</th>
              </tr>
            </thead>
            <tbody>
              {loads.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{padding: '15px 12px'}}>{l.load_number}</td><td>{l.customer_name}</td><td>{l.origin_city_state}</td><td>{l.destination_city_state}</td><td>${l.rate}</td><td style={{color: colors.accent}}>ACTIVE</td><td><button style={{background:'none', border:'1px solid #333', color:'#666', padding:'5px', cursor:'pointer'}}>VIEW</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ROOM LOGIC: GPS TRACKING (MICROPOINT/SAMSARA STYLE) */}
        {room === 'Fleet LIVE GPS' && (
          <div>
            <div style={{ height: '400px', background: '#050505', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>
              MAP ENGINE: 10-DAY HISTORY SEARCH ACTIVE
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div style={statBox}>TRUCK: ONLINE</div><div style={statBox}>DRIVER: ASSIGNED</div><div style={statBox}>ETA: 10:45 AM</div><div style={statBox}>TEMP: 180°C</div>
            </div>
          </div>
        )}

        {/* THE OTHER 8 ROOMS (STANDBY) */}
        {!['Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <div style={{ padding: '100px', textAlign: 'center', border: '1px solid #111' }}>
            <h2 style={{ color: '#222' }}>{room} MODULE READY</h2>
            <p style={{ color: '#111' }}>Awaiting data push from Neural Engine...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const statBox = { background: '#111', border: '1px solid #222', padding: '15px', color: '#32CD32', fontSize: '11px', textAlign: 'center' as const };