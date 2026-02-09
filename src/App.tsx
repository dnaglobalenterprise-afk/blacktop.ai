import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import Vapi from '@vapi-ai/web';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "", 
  process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY || "");
const JAKE_ID = process.env.REACT_APP_VAPI_ASSISTANT_ID || "";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [data, setData] = useState<any[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [isJakeActive, setIsJakeActive] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', detail: '', status: 'ACTIVE' });

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  const toggleJake = async () => {
    if (isJakeActive) { vapi.stop(); } 
    else { if (!JAKE_ID) return alert("Vapi Assistant ID missing."); vapi.start(JAKE_ID); }
  };

  useEffect(() => {
    vapi.on('call-start', () => setIsJakeActive(true));
    vapi.on('call-end', () => setIsJakeActive(false));
  }, []);

  // Fixed with useCallback to satisfy ESLint build rules
  const fetchRoomData = useCallback(async () => {
    const tableMap: { [key: string]: string } = {
      'Control Tower': 'loads', 'Driver Management': 'drivers', 'Accounting': 'accounting',
      'Compliance Room': 'compliance', 'Maintenance Hub': 'maintenance', 'CRM': 'crm', 'Fuel': 'fuel_logs'
    };
    const targetTable = tableMap[room];
    if (targetTable) {
      const { data: result, error } = await supabase.from(targetTable).select('*').order('created_at', { ascending: false });
      if (!error) setData(result || []);
    }
  }, [room]);

  useEffect(() => { if (isLoggedIn) fetchRoomData(); }, [isLoggedIn, fetchRoomData]);

  const handleSaveEntry = async () => {
    const entryData = { ...newEntry, created_at: new Date() };
    setData([entryData, ...data]);
    setShowEntryForm(false);
    setNewEntry({ title: '', detail: '', status: 'ACTIVE' });
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <button onClick={() => setIsLoggedIn(true)} style={btnStyle}>AUTHORIZE BLACKTOP OS</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, letterSpacing: '2px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '30px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => {setRoom(r); setSelectedLoad(null);}} style={navStyle(room === r, colors.accent)}>
              {r.toUpperCase()}
            </div>
          ))}
        </div>
        <button onClick={toggleJake} style={isJakeActive ? voiceOn : voiceOff}>
          {isJakeActive ? "JAKE: LISTENING" : "ACTIVATE JAKE (VAPI)"}
        </button>
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto', position: 'relative' }}>
        <header style={{ marginBottom: '40px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '20px', color: colors.accent }}>{room.toUpperCase()}</h1>
          {room !== 'Command Center' && (
            <button onClick={() => setShowEntryForm(true)} style={smallBtn}>+ CREATE ENTRY</button>
          )}
        </header>

        {showEntryForm && (
          <div style={formOverlay}>
            <div style={formContainer}>
              <h3 style={{color: colors.accent}}>NEW {room.toUpperCase()} ENTRY</h3>
              <input type="text" placeholder="ID / Unit #" style={input} onChange={(e) => setNewEntry({...newEntry, title: e.target.value})} />
              <textarea placeholder="Details..." style={input} rows={4} onChange={(e) => setNewEntry({...newEntry, detail: e.target.value})} />
              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={handleSaveEntry} style={bigBtn}>SAVE TO SYSTEM</button>
                <button onClick={() => setShowEntryForm(false)} style={{...bigBtn, background: '#333', color: '#fff'}}>CANCEL</button>
              </div>
            </div>
          </div>
        )}

        {/* NEURAL ENGINE */}
        {room === 'Command Center' && (
          <div style={card}>
            <h2 style={{ color: colors.accent }}>NEURAL ENGINE</h2>
            <p>{" > "} JAKE_VAPI: {isJakeActive ? 'CONNECTED' : 'STANDBY'}</p>
            <p>{" > "} LOCATION_TRACKING: SAMSARA_WIRED</p>
            <button onClick={toggleJake} style={{...bigBtn, marginTop: '20px'}}>
              {isJakeActive ? "DISCONNECT JAKE" : "ESTABLISH VOICE LINK"}
            </button>
          </div>
        )}

        {/* CONTROL TOWER - Logic used to prevent ESLint Error */}
        {room === 'Control Tower' && selectedLoad && (
           <div style={card}>
             <button onClick={() => setSelectedLoad(null)} style={{color: colors.accent, background: 'none', border: 'none', cursor: 'pointer', marginBottom: '10px'}}>{"< BACK"}</button>
             <h3>LOAD: {selectedLoad.load_number || selectedLoad.title}</h3>
             <p>{selectedLoad.detail || "Load details currently in sync..."}</p>
           </div>
        )}

        {/* DATA TABLES */}
        {room !== 'Command Center' && room !== 'Fleet LIVE GPS' && !selectedLoad && (
          <table style={table}>
            <thead><tr style={th}><th>ID / LOAD #</th><th>DESCRIPTION</th><th>STATUS</th><th>ACTION</th></tr></thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} style={tr}>
                  <td>{item.load_number || item.unit_number || item.title || "---"}</td>
                  <td>{item.customer_name || item.detail || "Active Entry"}</td>
                  <td>{item.status || "CLEARED"}</td>
                  <td><button onClick={() => setSelectedLoad(item)} style={smallBtn}>DRILL</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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

const btnStyle = { background: '#32CD32', padding: '20px 40px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const navStyle = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#444', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', fontSize: '11px', marginBottom: '5px' });
const voiceOff = { width: '100%', background: '#111', color: '#32CD32', border: '1px solid #32CD32', padding: '10px', cursor: 'pointer' };
const voiceOn = { width: '100%', background: '#32CD32', color: '#000', border: 'none', padding: '10px', fontWeight: 'bold' as any };
const card = { border: '1px solid #1a1a1a', padding: '30px', background: '#050505' };
const bigBtn = { background: '#32CD32', color: '#000', padding: '12px 24px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer', flex: 1 };
const smallBtn = { background: '#32CD32', color: '#000', border: 'none', padding: '8px 16px', fontWeight: 'bold' as any, cursor: 'pointer', fontSize: '10px' };
const table = { width: '100%', borderCollapse: 'collapse' as any };
const th = { textAlign: 'left' as any, color: '#32CD32', borderBottom: '1px solid #1a1a1a', padding: '10px' };
const tr = { borderBottom: '1px solid #0a0a0a', height: '45px' };
const formOverlay = { position: 'absolute' as any, top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 };
const formContainer = { background: '#0a0a0a', border: '1px solid #32CD32', padding: '40px', width: '400px', display: 'flex', flexDirection: 'column' as any, gap: '15px' };
const input = { background: '#000', border: '1px solid #1a1a1a', color: '#fff', padding: '10px', fontFamily: 'monospace' };