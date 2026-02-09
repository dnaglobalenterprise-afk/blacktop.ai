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
  
  // --- WORKFLOW STATE: THE "INPUT GATES" ---
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

  // --- FLOW LOGIC: AUTOMATIC ROUTING ---
  const handleSystemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let table = "";
    
    // Workflow routing based on active room
    if (room === 'Control Tower') table = 'loads';
    if (room === 'Fuel') table = 'fuel_logs';
    if (room === 'Accounting') table = 'ledger';

    const { error } = await supabase.from(table).insert([newEntry]);
    
    if (!error) {
      alert(`SYSTEM: Data validated and flowed to ${table}.`);
      setNewEntry({});
    } else {
      alert(`SYSTEM ERROR: Required fields missing or database mismatch.`);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <button onClick={() => setIsLoggedIn(true)} style={authBtn}>AUTHORIZE BLACKTOP OS</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: NAV & NEURAL */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '20px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={navItem(room === r, colors.accent)}>{r.toUpperCase()}</div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #222', paddingTop: '20px' }}>
          <p style={{fontSize: '10px', color: colors.accent}}>NEURAL JAKE ENGINE</p>
          <input value={jakeCommand} onChange={(e) => setJakeCommand(e.target.value)} style={jakeInput} placeholder="Global Instruction..." />
        </div>
      </div>

      {/* WORKSPACE: THE WORKFLOW ENGINES */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{marginBottom: '30px'}}>
          <h1 style={{margin: 0}}>{room.toUpperCase()}</h1>
          <p style={{color: '#444', fontSize: '12px'}}>VALIDATED WORKFLOW ACTIVE</p>
        </header>

        {/* DATA ENTRY GATE: FORCING CORRECT DATA FLOW */}
        <section style={entrySection}>
          <h3 style={{color: colors.accent, fontSize: '12px'}}>SYSTEM ENTRY: {room}</h3>
          <form onSubmit={handleSystemSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px'}}>
            {room === 'Control Tower' && (
              <>
                <input required placeholder="Load Number" style={inputStyle} onChange={e => setNewEntry({...newEntry, load_number: e.target.value})} />
                <input required placeholder="Customer Name" style={inputStyle} onChange={e => setNewEntry({...newEntry, customer_name: e.target.value})} />
                <input required placeholder="Rate ($)" style={inputStyle} onChange={e => setNewEntry({...newEntry, rate: e.target.value})} />
              </>
            )}
            {room === 'Fuel' && (
              <>
                <input required placeholder="Unit #" style={inputStyle} onChange={e => setNewEntry({...newEntry, unit: e.target.value})} />
                <input required placeholder="Gallons" style={inputStyle} onChange={e => setNewEntry({...newEntry, gallons: e.target.value})} />
                <input required placeholder="Fuel Card ID" style={inputStyle} onChange={e => setNewEntry({...newEntry, card_id: e.target.value})} />
              </>
            )}
            <button type="submit" style={submitBtn}>COMMIT TO {room.toUpperCase()}</button>
          </form>
        </section>

        {/* DATA VIEW: THE FLOW RESULT */}
        <div style={{marginTop: '40px'}}>
          {room === 'Control Tower' && (
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead><tr style={thStyle}><th>LOAD #</th><th>CUSTOMER</th><th>ORIGIN</th><th>RATE</th><th>STATUS</th><th>DRILL DOWN</th></tr></thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l.id} style={trStyle}>
                    <td>{l.load_number}</td><td>{l.customer_name}</td><td>{l.origin_city_state}</td><td>${l.rate}</td><td>ACTIVE</td>
                    <td><button style={drillBtn}>DETAILS</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {room === 'Fleet LIVE GPS' && (
             <div style={gpsContainer}>
                <div style={{flex: 1, borderRight: '1px solid #222', padding: '20px'}}>
                  <p style={{color: colors.accent}}>GPS TRUCKING (SAMSARA STYLE)</p>
                  <p style={{fontSize: '10px', color: '#444'}}>10-DAY BREADCRUMB HISTORY ACTIVE</p>
                </div>
                <div style={{width: '300px', padding: '20px'}}>
                  <p style={{fontSize: '12px'}}>ETA: 04:12:00</p>
                  <p style={{fontSize: '12px'}}>DRIVER: CONNECTED</p>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const authBtn = { background: '#32CD32', padding: '20px 40px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const navItem = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#555', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', fontSize: '11px', background: active ? '#111' : 'transparent' });
const jakeInput = { width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '8px', fontSize: '11px' };
const entrySection = { background: '#050505', border: '1px solid #222', padding: '20px', borderRadius: '4px' };
const inputStyle = { background: '#000', border: '1px solid #333', color: '#fff', padding: '10px', fontSize: '12px' };
const submitBtn = { background: '#32CD32', color: '#000', border: 'none', fontWeight: 'bold' as any, cursor: 'pointer', padding: '10px' };
const thStyle = { textAlign: 'left' as const, color: '#32CD32', borderBottom: '2px solid #222', fontSize: '12px' };
const trStyle = { borderBottom: '1px solid #111', height: '45px', fontSize: '12px' };
const drillBtn = { background: 'none', border: '1px solid #333', color: '#666', padding: '4px 8px', cursor: 'pointer' };
const gpsContainer = { height: '400px', border: '1px solid #222', display: 'flex' };