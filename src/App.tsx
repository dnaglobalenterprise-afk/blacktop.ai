import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Vapi from '@vapi-ai/web';

// --- SYSTEM CORE: DIRECT API HOOKS ---
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || ""; 
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
const VAPI_PUBLIC_KEY = process.env.REACT_APP_VAPI_PUBLIC_KEY || ""; // Set this in Vercel
const JAKE_ASSISTANT_ID = process.env.REACT_APP_VAPI_ASSISTANT_ID || ""; // Set this in Vercel

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const vapi = new Vapi(VAPI_PUBLIC_KEY);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [data, setData] = useState<any[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [isJakeActive, setIsJakeActive] = useState(false);

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  // --- VAPI VOICE ENGINE ---
  const handleJakeVoice = async () => {
    if (isJakeActive) {
      vapi.stop();
      setIsJakeActive(false);
    } else {
      vapi.start(JAKE_ASSISTANT_ID);
      setIsJakeActive(true);
    }
  };

  useEffect(() => {
    vapi.on('call-start', () => setIsJakeActive(true));
    vapi.on('call-end', () => setIsJakeActive(false));
  }, []);

  // --- SUPABASE LIVE DATA FLOW ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchSystemData = async () => {
        let table = "";
        // Mapping exactly to your Supabase tables
        if (room === 'Control Tower') table = 'loads';
        if (room === 'Driver Management') table = 'drivers';
        if (room === 'Accounting') table = 'accounting';
        if (room === 'Compliance Room') table = 'compliance';
        if (room === 'Fuel') table = 'fuel_logs';
        if (room === 'Maintenance Hub') table = 'maintenance';
        if (room === 'CRM') table = 'crm';
        if (room === 'Asset Management') table = 'assets';

        if (table) {
          const { data: dbResults, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
          if (!error) setData(dbResults || []);
        }
      };
      fetchSystemData();
    }
  }, [isLoggedIn, room]);

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <button onClick={() => setIsLoggedIn(true)} style={authBtnStyle}>AUTHORIZE BLACKTOP OS</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR NAVIGATION: 10 MODULES */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '20px' }}>
          {[
            'Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 
            'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'
          ].map(r => (
            <div key={r} onClick={() => {setRoom(r); setSelectedLoad(null);}} style={navItemStyle(room === r, colors.accent)}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>
        
        {/* VOICE AI STATUS */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
          <p style={{ color: colors.accent, fontSize: '10px', marginBottom: '10px' }}>NEURAL LINK: {isJakeActive ? 'ACTIVE' : 'READY'}</p>
          <button onClick={handleJakeVoice} style={isJakeActive ? voiceBtnOn : voiceBtnOff}>
            {isJakeActive ? "STOP JAKE" : "ACTIVATE JAKE"}
          </button>
        </div>
      </div>

      {/* MAIN SYSTEM WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px' }}>{room.toUpperCase()}</h1>
        </header>

        {/* ROOM 1: COMMAND CENTER (JAKE'S HUB) */}
        {room === 'Command Center' && (
          <div style={terminalStyle}>
            <h2 style={{ color: colors.accent }}>NEURAL TERMINAL (JAKE)</h2>
            <div style={terminalLogStyle}>
              <p>{' > '} VAPI VOICE LINK: {VAPI_PUBLIC_KEY ? 'CONFIGURED' : 'WAITING FOR KEY'}</p>
              <p>{' > '} SUPABASE: {SUPABASE_URL ? 'CONNECTED' : 'OFFLINE'}</p>
              <p>{' > '} STATUS: SYSTEM STABILIZED</p>
            </div>
            <button onClick={handleJakeVoice} style={bigActionBtn}>
              {isJakeActive ? "CLOSE NEURAL LINK" : "OPEN NEURAL LINK"}
            </button>
          </div>
        )}

        {/* ROOM 2: CONTROL TOWER (LOAD BOARD + DRILL-DOWN) */}
        {room === 'Control Tower' && (
          <div>
            {selectedLoad ? (
              <div style={drillContainer}>
                <button onClick={() => setSelectedLoad(null)} style={backBtn}>{' < '} BACK TO LOAD BOARD</button>
                <h2 style={{ color: colors.accent }}>LOAD DETAILS: {selectedLoad.load_number}</h2>
                <div style={detailGrid}>
                  <div style={statBox}><strong>CUSTOMER:</strong> {selectedLoad.customer_name}</div>
                  <div style={statBox}><strong>RATE:</strong> ${selectedLoad.rate}</div>
                  <div style={statBox}><strong>ORIGIN:</strong> {selectedLoad.origin_city_state}</div>
                  <div style={statBox}><strong>DESTINATION:</strong> {selectedLoad.destination_city_state}</div>
                  <div style={statBox}><strong>STATUS:</strong> {selectedLoad.status || 'ACTIVE'}</div>
                </div>
              </div>
            ) : (
              <table style={tableStyle}>
                <thead><tr style={thStyle}><th>LOAD #</th><th>CUSTOMER</th><th>ORIGIN</th><th>RATE</th><th>ACTION</th></tr></thead>
                <tbody>
                  {data.map(l => (
                    <tr key={l.id} style={trStyle}>
                      <td>{l.load_number}</td><td>{l.customer_name}</td><td>{l.origin_city_state}</td><td>${l.rate}</td>
                      <td><button onClick={() => setSelectedLoad(l)} style={drillBtn}>DRILL DOWN</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ALL OTHER ROOMS: LIVE SUPABASE TABLES */}
        {!['Command Center', 'Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <table style={tableStyle}>
            <thead><tr style={thStyle}><th>ID / UNIT</th><th>DETAILS</th><th>STATUS</th></tr></thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} style={trStyle}>
                  <td>{item.unit_number || item.load_number || item.id}</td>
                  <td>{item.driver_name || item.description || item.customer_name || 'System Entry'}</td>
                  <td>{item.status || 'ACTIVE'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ROOM 10: FLEET LIVE GPS */}
        {room === 'Fleet LIVE GPS' && (
          <div style={gpsTerminal}>
            <h3 style={{ color: colors.accent }}>GPS ENGINE (SAMSARA/MICROPONT)</h3>
            <p style={{ color: '#444' }}>10-DAY HISTORY BUFFER SEARCH ACTIVE</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLING (LOCKED) ---
const authBtnStyle = { background: '#32CD32', padding: '20px 40px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const navItemStyle = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#555', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', background: active ? '#111' : 'transparent', fontSize: '11px', marginBottom: '4px' });
const voiceBtnOff = { width: '100%', background: '#222', color: '#32CD32', border: '1px solid #32CD32', padding: '10px', cursor: 'pointer', fontSize: '10px' };
const voiceBtnOn = { width: '100%', background: '#32CD32', color: '#000', border: 'none', padding: '10px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' as any };
const terminalStyle = { border: '1px solid #32CD32', padding: '40px', background: '#050505', height: '50vh' };
const terminalLogStyle = { background: '#000', padding: '20px', border: '1px solid #111', color: '#32CD32' };
const bigActionBtn = { marginTop: '30px', padding: '15px 30px', background: '#32CD32', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as any };
const thStyle = { textAlign: 'left' as any, color: '#32CD32', borderBottom: '2px solid #222', padding: '10px' };
const trStyle = { borderBottom: '1px solid #111', height: '50px' };
const drillBtn = { background: 'none', border: '1px solid #333', color: '#32CD32', padding: '5px 10px', cursor: 'pointer' };
const drillContainer = { background: '#111', padding: '30px', border: '1px solid #222' };
const backBtn = { color: '#32CD32', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' };
const detailGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' };
const statBox = { background: '#000', padding: '20px', border: '1px solid #222' };
const gpsTerminal = { height: '500px', border: '1px solid #222', display: 'flex', flexDirection: 'column' as any, alignItems: 'center', justifyContent: 'center' };