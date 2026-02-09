import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- SYSTEM CONNECTION ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  // --- SYNC WITH REAL DATA ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchLoads = async () => {
        const { data, error } = await supabase.from('loads').select('*');
        if (!error && data) setLoads(data);
      };
      fetchLoads();
    }
  }, [isLoggedIn, room]);

  // --- NEURAL COMMAND (Strict Types) ---
  const handleJakeCommand = async (instruction: string, loadId: string | null = null) => {
    const { error } = await supabase
      .from('jake_commands')
      .insert([{ instruction, load_id: loadId, status: 'pending' }]);
    
    if (!error) alert("Neural Engine updated.");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '80px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '20px', fontSize: '60px' }}>BLACKTOP</h1>
          <button onClick={() => setIsLoggedIn(true)} style={{ background: colors.accent, border: 'none', padding: '20px 40px', fontWeight: 'bold', cursor: 'pointer' }}>SYSTEM AUTHORIZATION</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px' }}>
        <h2 style={{ color: colors.accent }}>BLACKTOP</h2>
        <div style={{ marginTop: '40px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={{ padding: '15px 10px', color: room === r ? colors.accent : '#444', cursor: 'pointer', borderLeft: room === r ? `3px solid ${colors.accent}` : '3px solid transparent' }}>{r.toUpperCase()}</div>
          ))}
        </div>
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h1>{room.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              placeholder="Search..." 
              style={{ background: '#111', border: '1px solid #222', color: '#fff', padding: '10px' }} 
              onChange={(e) => console.log("Searching for:", e.target.value)} 
            />
            <button style={{ background: colors.accent, color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold' }}>+ ADD ENTRY</button>
          </div>
        </header>

        {/* CONTROL TOWER VIEW */}
        {room === 'Control Tower' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #222', color: colors.accent }}>
                <th style={{ padding: '10px' }}>LOAD #</th><th>CUSTOMER</th><th>ORIGIN/DEST</th><th>RATE</th><th>STATUS</th><th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loads.length > 0 ? loads.map(load => (
                <tr key={load.id} style={{ borderBottom: '1px solid #111' }}>
                  <td style={{ padding: '15px 10px' }}>{load.load_number}</td>
                  <td>{load.customer_name}</td>
                  <td>{load.origin_city_state} ➔ {load.destination_city_state}</td>
                  <td style={{ color: colors.accent }}>${load.rate}</td>
                  <td>In Transit</td>
                  <td><button onClick={() => handleJakeCommand("Review Load Details", load.id)} style={{ background: 'none', border: '1px solid #333', color: '#666', padding: '5px 10px', cursor: 'pointer' }}>Neural Review</button></td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ padding: '50px', textAlign: 'center', color: '#333' }}>No active loads. Ready for data.</td></tr>
              )}
            </tbody>
          </table>
        )}

        {/* GPS VIEW */}
        {room === 'Fleet LIVE GPS' && (
          <div style={{ height: '70vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <p style={{ color: colors.accent }}>MAP ENGINE LOADING (10-DAY HISTORY ACTIVE)</p>
          </div>
        )}
      </div>
    </div>
  );
}