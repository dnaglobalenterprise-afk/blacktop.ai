import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- SYSTEM CONNECTION ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

// SAFE INITIALIZATION: This prevents the white screen crash
const supabase = (SUPABASE_URL && SUPABASE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<any[]>([]);

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  useEffect(() => {
    if (isLoggedIn && supabase) {
      const fetchLoads = async () => {
        try {
          const { data, error } = await supabase.from('loads').select('*');
          if (!error && data) setLoads(data);
        } catch (e) { console.error("Database connection issue."); }
      };
      fetchLoads();
    }
  }, [isLoggedIn, room]);

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '60px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '15px', fontSize: '40px' }}>BLACKTOP</h1>
          <p style={{ marginBottom: '30px', color: '#444' }}>SOVEREIGN v17</p>
          <button onClick={() => setIsLoggedIn(true)} style={{ background: colors.accent, border: 'none', padding: '15px 30px', fontWeight: 'bold', cursor: 'pointer' }}>SYSTEM AUTHORIZATION</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      <div style={{ width: '260px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px' }}>
        <h3 style={{ color: colors.accent }}>BLACKTOP</h3>
        <div style={{ marginTop: '30px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => setRoom(r)} style={{ padding: '12px 10px', color: room === r ? colors.accent : '#555', cursor: 'pointer', fontSize: '12px' }}>{r.toUpperCase()}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px' }}>
        <h1>{room.toUpperCase()}</h1>
        <div style={{ marginTop: '20px', border: '1px solid #111', padding: '20px' }}>
          {room === 'Control Tower' && loads.length === 0 && <p>Connecting to Data Stream...</p>}
          <p>Displaying {room} workspace.</p>
        </div>
      </div>
    </div>
  );
}