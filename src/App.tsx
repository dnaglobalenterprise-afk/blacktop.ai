import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);
  const [jakeCommand, setJakeCommand] = useState('');
  const [newEntry, setNewEntry] = useState<any>({});

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const { data } = await supabase.from('loads').select('*').order('created_at', { ascending: false });
        if (data) setLoads(data);
      };
      fetchData();
    }
  }, [isLoggedIn, room]);

  const handleSystemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let table = room === 'Control Tower' ? 'loads' : room === 'Fuel' ? 'fuel_logs' : 'general_logs';
    const { error } = await supabase.from(table).insert([newEntry]);
    if (!error) { alert(`SYSTEM: Committed to ${table}.`); setNewEntry({}); }
  };

  const executeJake = async () => {
    if (!jakeCommand) return;
    await supabase.from('jake_commands').insert([{ instruction: jakeCommand, status: 'pending' }]);
    alert(`JAKE: Processing Instruction...`);
    setJakeCommand('');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <button onClick={() => setIsLoggedIn(true)} style={{ background: colors.accent, padding: '20px 40px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>AUTHORIZE BLACKTOP OS</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '20px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={{ padding: '12px', color: room === r ? colors.accent : '#555', cursor: 'pointer', borderLeft: room === r ? `3px solid ${colors.accent}` : 'none', fontSize: '11px', background: room === r ? '#111' : 'transparent' }}>{r.toUpperCase()}</div>
          ))}
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* COMMAND CENTER: JAKE'S NEURAL TERMINAL */}
        {room === 'Command Center' && (
          <div style={{ border: `1px solid ${colors.accent}`, padding: '40px', height: '80vh', display: 'flex', flexDirection: 'column', background: '#050505' }}>
            <h1 style={{ color: colors.accent, marginBottom: '10px' }}>NEURAL COMMAND CENTER (JAKE)</h1>
            <p style={{ color: '#444', marginBottom: '30px' }}>Direct Neural Interface Active</p>
            <div style={{ flex: 1, background: '#000', padding: '20px', border: '1px solid #111', color: colors.accent, fontSize: '14px' }}>
              <p>> JAKE STANDING BY...</p>
              <p>> SYSTEM STATUS: OPTIMAL</p>
              <p>> ALL FLOWS MONITORED</p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <input value={jakeCommand} onChange={(e) => setJakeCommand(e.target.value)} style={{ flex: 1, background: '#000', border: `1px solid ${colors.accent}`, color: '#fff', padding: '20px' }} placeholder="Issue Neural Command..." />
              <button onClick={executeJake} style={{ background: colors.accent, color: '#000', border: 'none', padding: '0 40px', fontWeight: 'bold', cursor: 'pointer' }}>EXECUTE</button>
            </div>
          </div>
        )}

        {/* CONTROL TOWER: LOAD BOARD & ENTRY GATE */}
        {room === 'Control Tower' && (
          <>
            <section style={{ background: '#111', padding: '25px', border: '1px solid #222', borderRadius: '4px' }}>
              <h3 style={{ color: colors.accent, marginTop: 0 }}>GATEWAY: NEW LOAD ENTRY</h3>
              <form onSubmit={handleSystemSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <input required placeholder="Load #" style={inS} onChange={e => setNewEntry({...newEntry, load_number: e.target.value})} />
                <input required placeholder="Customer" style={inS} onChange={e => setNewEntry({...newEntry, customer_name: e.target.value})} />
                <input required placeholder="Rate ($)" style={inS} onChange={e => setNewEntry({...newEntry, rate: e.target.value})} />
                <button type="submit" style={subB}>COMMIT TO SYSTEM</button>
              </form>
            </section>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '40px' }}>
              <thead><tr style={{ textAlign: 'left', color: colors.accent, borderBottom: '2px solid #222' }}><th style={pad}>LOAD #</th><th style={pad}>CUSTOMER</th><th style={pad}>ORIGIN</th><th style={pad}>RATE</th><th style={pad}>STATUS</th><th style={pad}>DRILL</th></tr></thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #111' }}>
                    <td style={pad}>{l.load_number}</td><td style={pad}>{l.customer_name}</td><td style={pad}>{l.origin_city_state}</td><td style={pad}>${l.rate}</td><td style={pad}><span style={{color: colors.accent}}>ACTIVE</span></td><td style={pad}><button style={driB}>DRILL DOWN</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* FLEET GPS: SAMSARA STYLE 10-DAY HISTORY */}
        {room === 'Fleet LIVE GPS' && (
          <div style={{ height: '70vh', border: '1px solid #222', background: '#050505', padding: '20px' }}>
            <h2 style={{ color: colors.accent }}>FLEET LIVE GPS</h2>
            <div style={{ height: '80%', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
              MAP ENGINE: [HISTORY_BUFFER_10_DAY] SEARCH ACTIVE
            </div>
          </div>
        )}

        {/* OTHER ROOMS STANDBY */}
        {!['Command Center', 'Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <div style={{ padding: '60px', border: '1px solid #111', textAlign: 'center' }}>
             <h2 style={{ color: colors.accent }}>{room.toUpperCase()} INTERFACE ONLINE</h2>
             <p style={{ color: '#444' }}>Awaiting Data Stream...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inS = { background: '#000', border: '1px solid #333', color: '#fff', padding: '12px' };
const subB = { background: '#32CD32', color: '#000', border: 'none', fontWeight: 'bold' as any, cursor: 'pointer' };
const driB = { background: 'none', border: '1px solid #333', color: '#666', padding: '5px 10px', cursor: 'pointer', fontSize: '10px' };
const pad = { padding: '15px 10px' };