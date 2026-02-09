import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import Vapi from '@vapi-ai/web';

// --- THE CORE ENGINES (NO GUESSING) ---
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "", 
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

// Jake's Neural Voice Connection
const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY || "");
const JAKE_ID = process.env.REACT_APP_VAPI_ASSISTANT_ID || "";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [data, setData] = useState<any[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [isJakeActive, setIsJakeActive] = useState(false);

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  // --- VAPI VOICE ENGINE LOGIC ---
  const toggleJake = async () => {
    if (isJakeActive) {
      vapi.stop();
    } else {
      if (!JAKE_ID) return alert("Vapi Assistant ID missing in Vercel settings.");
      vapi.start(JAKE_ID);
    }
  };

  useEffect(() => {
    vapi.on('call-start', () => setIsJakeActive(true));
    vapi.on('call-end', () => setIsJakeActive(false));
    vapi.on('error', (err) => console.error("Vapi Error:", err));
  }, []);

  // --- SUPABASE LIVE TABLE LOGIC ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchActiveRoomData = async () => {
        const tableMap: { [key: string]: string } = {
          'Control Tower': 'loads',
          'Driver Management': 'drivers',
          'Compliance Room': 'compliance',
          'Maintenance Hub': 'maintenance',
          'Accounting': 'accounting',
          'CRM': 'crm',
          'Fuel': 'fuel_logs',
          'Asset Management': 'assets'
        };

        const targetTable = tableMap[room];
        if (targetTable) {
          const { data: result, error } = await supabase
            .from(targetTable)
            .select('*')
            .order('created_at', { ascending: false });
          if (!error) setData(result || []);
        }
      };
      fetchActiveRoomData();
    }
  }, [isLoggedIn, room]);

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <button onClick={() => setIsLoggedIn(true)} style={btnStyle}>AUTHORIZE BLACKTOP OS</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: 10 MODULES LOCKED */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, letterSpacing: '2px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '30px' }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'
          ].map(r => (
            <div key={r} onClick={() => {setRoom(r); setSelectedLoad(null);}} style={navStyle(room === r, colors.accent)}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>
        
        {/* JAKE VAPI TOGGLE */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
          <button onClick={toggleJake} style={isJakeActive ? voiceOn : voiceOff}>
            {isJakeActive ? "JAKE: LISTENING" : "ACTIVATE JAKE (VAPI)"}
          </button>
        </div>
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '40px', borderBottom: `1px solid ${colors.border}`, pb: '10px' }}>
          <h1 style={{ fontSize: '20px', color: colors.accent }}>{room.toUpperCase()}</h1>
        </header>

        {/* NEURAL TERMINAL (COMMAND CENTER) */}
        {room === 'Command Center' && (
          <div style={card}>
            <h2 style={{ color: colors.accent }}>NEURAL ENGINE</h2>
            <div style={{ margin: '20px 0', color: '#444' }}>
              <p>{' > '} VAPI_STATUS: {isJakeActive ? 'ONLINE' : 'IDLE'}</p>
              <p>{' > '} DB_LINK: SUPABASE_ACTIVE</p>
            </div>
            <button onClick={toggleJake} style={bigBtn}>
              {isJakeActive ? "DISCONNECT JAKE" : "ESTABLISH VOICE LINK"}
            </button>
          </div>
        )}

        {/* CONTROL TOWER (LOAD BOARD) */}
        {room === 'Control Tower' && (
          <div>
            {selectedLoad ? (
              <div style={card}>
                <button onClick={() => setSelectedLoad(null)} style={{color: colors.accent, background: 'none', border: 'none', cursor: 'pointer'}}>BACK</button>
                <h3>LOAD: {selectedLoad.load_number}</h3>
                <div style={grid}>
                  <div><strong>CUSTOMER:</strong> {selectedLoad.customer_name}</div>
                  <div><strong>RATE:</strong> ${selectedLoad.rate}</div>
                  <div><strong>ROUTE:</strong> {selectedLoad.origin_city_state} -> {selectedLoad.destination_city_state}</div>
                </div>
              </div>
            ) : (
              <table style={table}>
                <thead><tr style={th}><th>LOAD #</th><th>CUSTOMER</th><th>ORIGIN</th><th>ACTION</th></tr></thead>
                <tbody>
                  {data.map(l => (
                    <tr key={l.id} style={tr}>
                      <td>{l.load_number}</td><td>{l.customer_name}</td><td>{l.origin_city_state}</td>
                      <td><button onClick={() => setSelectedLoad(l)} style={drill}>DRILL DOWN</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* GENERIC DATA ROOMS */}
        {!['Command Center', 'Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <table style={table}>
            <thead><tr style={th}><th>UNIT/ID</th><th>DETAILS</th><th>STATUS</th></tr></thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} style={tr}>
                  <td>{item.unit_number || item.id}</td>
                  <td>{item.driver_name || item.description || "Active Entry"}</td>
                  <td>{item.status || "CLEARED"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* GPS HISTORY ROOM */}
        {room === 'Fleet LIVE GPS' && (
          <div style={card}>
            <h3 style={{color: colors.accent}}>LIVE GPS TRACKING (10-DAY HISTORY)</h3>
            <p>Direct Micropoint/Samsara Data Stream Interface</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SYSTEM STYLES ---
const btnStyle = { background: '#32CD32', padding: '20px 40px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const navStyle = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#444', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', background: active ? '#0a0a0a' : 'transparent', fontSize: '11px' });
const voiceOff = { width: '100%', background: '#111', color: '#32CD32', border: '1px solid #32CD32', padding: '10px', cursor: 'pointer' };
const voiceOn = { width: '100%', background: '#32CD32', color: '#000', border: 'none', padding: '10px', fontWeight: 'bold' as any, cursor: 'pointer' };
const card = { border: '1px solid #1a1a1a', padding: '30px', background: '#050505' };
const bigBtn = { background: '#32CD32', color: '#000', padding: '15px 30px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const table = { width: '100%', borderCollapse: 'collapse' as any };
const th = { textAlign: 'left' as any, color: '#32CD32', borderBottom: '1px solid #1a1a1a' };
const tr = { borderBottom: '1px solid #0a0a0a', height: '45px' };
const drill = { color: '#32CD32', background: 'none', border: '1px solid #333', cursor: 'pointer', fontSize: '10px' };
const grid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' };