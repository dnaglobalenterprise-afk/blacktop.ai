import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONNECTION ---
// These look for the keys you will set in Vercel in Step 3
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const JAKE_ID = "d74647c4-13ce-4524-92e6-aa7967e46c87";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface Load {
  id: string;
  load_number: string;
  customer_name: string;
  origin: string;
  destination: string;
  pickup_date: string;
  delivery_date: string;
  rate: number;
  status: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [loads, setLoads] = useState<Load[]>([]);
  const [jakeLog, setJakeLog] = useState<string[]>(["[Jake]: Systems Live. Monitoring Blacktop Network..."]);

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  // Pull data from Supabase automatically
  useEffect(() => {
    if (isLoggedIn) {
      const sync = async () => {
        const { data } = await supabase.from('loads').select('*');
        if (data) setLoads(data as Load[]);
      };
      sync();
    }
  }, [isLoggedIn, room]);

  const callJake = (num: string) => {
    setJakeLog(prev => [`[Jake]: Dialing for Load ${num}...`, ...prev]);
    if ((window as any).vapi) (window as any).vapi.start(JAKE_ID);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <div style={{ border: `2px solid ${colors.accent}`, padding: '60px', textAlign: 'center' }}>
          <h1 style={{ color: colors.accent, letterSpacing: '15px', fontSize: '50px' }}>BLACKTOP</h1>
          <button onClick={() => setIsLoggedIn(true)} style={btnStyle}>INITIALIZE OS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: ALL 10 ROOMS */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px' }}>
        <h2 style={{ color: colors.accent, marginBottom: '40px' }}>BLACKTOP</h2>
        {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
          <div key={r} onClick={() => setRoom(r)} style={navItem(room === r, colors.accent)}>{r.toUpperCase()}</div>
        ))}
      </div>

      {/* MAIN SYSTEM VIEW */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{room}</h1>
          <div style={{ color: colors.accent }}>PRODUCTION V12</div>
        </header>

        {/* ROOM: CONTROL TOWER (LOAD BOARD) */}
        {room === 'Control Tower' && (
          <div style={{ background: '#050505', border: '1px solid #111' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: colors.accent, borderBottom: '2px solid #222' }}>
                  <th style={th}>LOAD #</th><th style={th}>CUSTOMER</th><th style={th}>ORIGIN</th><th style={th}>DESTINATION</th><th style={th}>PICKUP</th><th style={th}>DELIVERY</th><th style={th}>RATE</th><th style={th}>NEURAL</th>
                </tr>
              </thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{...td, color: colors.accent}}>{l.load_number}</td>
                    <td style={td}>{l.customer_name}</td>
                    <td style={td}>{l.origin}</td>
                    <td style={td}>{l.destination}</td>
                    <td style={td}>{l.pickup_date}</td>
                    <td style={td}>{l.delivery_date}</td>
                    <td style={{...td, fontWeight: 'bold'}}>${l.rate}</td>
                    <td style={td}><button onClick={() => callJake(l.load_number)} style={jakeBtn}>JAKE</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ROOM: FLEET LIVE GPS */}
        {room === 'Fleet LIVE GPS' && (
          <div style={{ height: '75vh', border: '1px solid #222' }}>
            <iframe width="100%" height="100%" frameBorder="0" style={{ filter: 'grayscale(1) invert(1)' }} src="https://maps.google.com/maps?q=USA&t=&z=4&ie=UTF8&iwloc=&output=embed"></iframe>
          </div>
        )}

        {/* DEFAULT VIEW FOR OTHER ROOMS */}
        {!['Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <div style={{ background: '#0a0a0a', padding: '40px', border: '1px solid #1a1a1a' }}>
            <h3 style={{ color: colors.accent }}>{room} INITIALIZED</h3>
            <p style={{ color: '#444', marginTop: '15px' }}>Waiting for database stream...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const btnStyle = { background: '#32CD32', border: 'none', padding: '15px 30px', fontWeight: 'bold' as const, cursor: 'pointer' };
const navItem = (active: boolean, acc: string) => ({ padding: '15px 0', color: active ? acc : '#444', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' as const, borderLeft: active ? `3px solid ${acc}` : '3px solid transparent', paddingLeft: active ? '10px' : '0' });
const th = { padding: '15px', fontSize: '10px', textTransform: 'uppercase' as const };
const td = { padding: '20px 15px', fontSize: '13px' };
const jakeBtn = { background: '#32CD32', border: 'none', padding: '5px 10px', fontWeight: 'bold' as const, cursor: 'pointer', fontSize: '10px' };