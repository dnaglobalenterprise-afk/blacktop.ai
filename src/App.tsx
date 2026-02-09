import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Vapi from '@vapi-ai/web';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL || "", process.env.REACT_APP_SUPABASE_ANON_KEY || "");
const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY || "");
const JAKE_ID = process.env.REACT_APP_VAPI_ASSISTANT_ID || "";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [room, setRoom] = useState('Command Center');
  const [data, setData] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isJakeActive, setIsJakeActive] = useState(false);
  const [search, setSearch] = useState('');
  const [lateAlerts, setLateAlerts] = useState<any[]>([]);
  const [summary, setSummary] = useState({ loads: 0, complianceIssues: 0, maintenanceAlerts: 0, totalCarriers: 0 });

  const colors = { accent: '#32CD32', bg: '#000', sidebar: '#0a0a0a', border: '#1a1a1a' };

  // --- JAKE NEURAL LINK ---
  const toggleJake = () => isJakeActive ? vapi.stop() : vapi.start(JAKE_ID);
  useEffect(() => {
    vapi.on('call-start', () => setIsJakeActive(true));
    vapi.on('call-end', () => setIsJakeActive(false));
  }, []);

  // --- AGENCY MULTI-CARRIER & CRM SYNC ---
  const runAgencyIntelligence = async (loads: any[]) => {
    const alerts: any[] = [];
    for (const load of loads) {
      // 1. CRM FLOW: Auto-check/add Shipper & Receiver
      const { data: shipperExists } = await supabase.from('crm_contacts').select('name').eq('name', load.shipper_name).single();
      if (!shipperExists && load.shipper_name) {
        await supabase.from('crm_contacts').insert([{ name: load.shipper_name, address: load.shipper_address, phone: load.shipper_phone, type: 'Shipper' }]);
      }

      // 2. PROACTIVE LATE MONITORING
      const eta = new Date(load.eta).getTime();
      const del = new Date(load.delivery_date).getTime();
      if (load.status === 'Active' && eta > del) {
        alerts.push(load);
      }
    }
    setLateAlerts(alerts);
  };

  // --- MAIN DATA ENGINE ---
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const tableMap: any = {
          'Control Tower': 'loads', 'Driver Management': 'drivers', 'Asset Management': 'assets',
          'Maintenance Hub': 'maintenance', 'Compliance Room': 'compliance_files',
          'Accounting': 'financials', 'CRM': 'crm_contacts', 'Fuel': 'fuel_logs'
        };

        // Multi-Carrier Global Summary
        const { data: allLoads } = await supabase.from('loads').select('*');
        const { count: carrierCount } = await supabase.from('carriers').select('*', { count: 'exact', head: true });
        const { count: compCount } = await supabase.from('drivers').select('*', { count: 'exact', head: true }).eq('compliance_status', 'Expired');
        const { count: maintCount } = await supabase.from('maintenance').select('*', { count: 'exact', head: true }).eq('status', 'Overdue');
        
        if (allLoads) {
          setSummary({ loads: allLoads.length, complianceIssues: compCount || 0, maintenanceAlerts: maintCount || 0, totalCarriers: carrierCount || 0 });
          runAgencyIntelligence(allLoads);
        }

        const table = tableMap[room];
        if (table) {
          let query = supabase.from(table).select('*').order('created_at', { ascending: false });
          if (search) query = query.ilike(room.includes('Driver') ? 'driver_name' : 'unit_number', `%${search}%`);
          const { data: res } = await query;
          setData(res || []);
        }
      };
      fetchData();
    }
  }, [isLoggedIn, room, search]);

  if (!isLoggedIn) return <div style={authScreen}><button onClick={() => setIsLoggedIn(true)} style={btnStyle}>AUTHORIZE SYSTEM ACCESS</button></div>;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR: 10 CORE ROOMS */}
      <div style={{ width: '280px', background: colors.sidebar, borderRight: `1px solid ${colors.border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.accent, letterSpacing: '2px' }}>BLACKTOP OS</h2>
        <div style={{ flex: 1, marginTop: '20px' }}>
          {['Command Center', 'Control Tower', 'Driver Management', 'Asset Management', 'Maintenance Hub', 'Compliance Room', 'Accounting', 'CRM', 'Fuel', 'Fleet LIVE GPS'].map(r => (
            <div key={r} onClick={() => {setRoom(r); setSelectedItem(null);}} style={navItem(room === r, colors.accent)}>{r.toUpperCase()}</div>
          ))}
        </div>
        <button onClick={toggleJake} style={isJakeActive ? voiceOn : voiceOff}>{isJakeActive ? "JAKE: MONITORING" : "ACTIVATE JAKE"}</button>
      </div>

      {/* WORKSPACE */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>{room.toUpperCase()}</h1>
          {room !== 'Command Center' && <input placeholder="SEARCH ACROSS CARRIERS..." value={search} onChange={(e) => setSearch(e.target.value)} style={searchInput} />}
        </div>

        {/* COMMAND CENTER: AGENCY MULTI-CARRIER VIEW */}
        {room === 'Command Center' && (
          <div>
            <div style={detailGrid}>
              <div style={statBox}><h3>TOTAL CARRIERS</h3><p style={{fontSize: '24px', color: colors.accent}}>{summary.totalCarriers}</p></div>
              <div style={statBox}><h3>GLOBAL ACTIVE LOADS</h3><p style={{fontSize: '24px'}}>{summary.loads}</p></div>
              <div style={statBox}><h3 style={{color: '#ff4444'}}>LATE ALERTS</h3><p style={{fontSize: '24px'}}>{lateAlerts.length}</p></div>
            </div>
            
            <div style={terminalBox}>
               <h2 style={{color: colors.accent}}>JAKE NEURAL DISPATCHER</h2>
               <p>> MULTI-CARRIER SYNC: ACTIVE</p>
               <p>> FMCSA COMPLIANCE SCANNER: ONLINE</p>
               <p>> JAKE IS CURRENTLY MONITORING {summary.loads} LOADS ACROSS {summary.totalCarriers} CARRIERS.</p>
               <button onClick={toggleJake} style={bigActionBtn}>OPEN NEURAL COMMAND</button>
            </div>
          </div>
        )}

        {/* CONTROL TOWER: THE LOAD BOARD + DRILL DOWN */}
        {room === 'Control Tower' && (
          selectedItem ? (
            <div style={drillDownBox}>
              <button onClick={() => setSelectedItem(null)} style={backBtn}>{' < '} BACK TO GLOBAL BOARD</button>
              <h2 style={{color: colors.accent}}>LOAD: {selectedItem.load_number} ({selectedItem.carrier_name})</h2>
              <div style={detailGrid}>
                <section style={dataSection}>
                  <h3>PICKUP (SHIPPER)</h3>
                  <p><strong>NAME:</strong> {selectedItem.shipper_name}</p>
                  <p><strong>ADDR:</strong> {selectedItem.shipper_address}</p>
                  <p><strong>PHONE:</strong> {selectedItem.shipper_phone}</p>
                  <p><strong>DATE:</strong> {selectedItem.pickup_date}</p>
                </section>
                <section style={dataSection}>
                  <h3>DELIVERY (RECEIVER)</h3>
                  <p><strong>NAME:</strong> {selectedItem.consignee_name}</p>
                  <p><strong>ADDR:</strong> {selectedItem.consignee_address}</p>
                  <p><strong>PHONE:</strong> {selectedItem.consignee_phone}</p>
                  <p><strong>DATE:</strong> {selectedItem.delivery_date}</p>
                </section>
                <section style={dataSection}>
                  <h3>LOAD SPECS</h3>
                  <p><strong>COMMODITY:</strong> {selectedItem.commodity}</p>
                  <p><strong>WEIGHT:</strong> {selectedItem.weight} LBS</p>
                  <p><strong>PU NUMBERS:</strong> {selectedItem.pickup_numbers}</p>
                </section>
              </div>
            </div>
          ) : (
            <table style={tableStyle}>
              <thead><tr style={thStyle}><th>PU DATE</th><th>CARRIER</th><th>PU CITY</th><th>DEL CITY</th><th>DEL DATE</th><th>STATUS</th><th>ACTION</th></tr></thead>
              <tbody>
                {data.map(l => (
                  <tr key={l.id} style={trStyle}>
                    <td>{l.pickup_date}</td><td>{l.carrier_name}</td><td>{l.pickup_city}</td><td>{l.delivery_city}</td><td>{l.delivery_date}</td>
                    <td style={{color: lateAlerts.find(a => a.id === l.id) ? '#ff4444' : '#fff'}}>{l.status}</td>
                    <td><button onClick={() => setSelectedItem(l)} style={actionBtn}>DRILL DOWN</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {/* DATABASE ROOMS (DRIVER, ASSET, COMPLIANCE, CRM, FUEL, ACCOUNTING) */}
        {!['Command Center', 'Control Tower', 'Fleet LIVE GPS'].includes(room) && (
          <div>
            <button style={addEntryBtn}>+ ADD NEW {room.toUpperCase()} ENTRY</button>
            <table style={tableStyle}>
              <thead><tr style={thStyle}><th>ID/UNIT</th><th>ENTITY</th><th>COMPLIANCE/STATUS</th></tr></thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} style={trStyle}>
                    <td>{item.unit_number || item.id}</td>
                    <td>{item.driver_name || item.name || item.description}</td>
                    <td style={{color: item.compliance_status === 'Expired' ? '#ff4444' : '#fff'}}>{item.compliance_status || item.status || 'ACTIVE'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- PERMANENT UI STYLES ---
const authScreen = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' };
const btnStyle = { background: '#32CD32', padding: '20px 40px', fontWeight: 'bold' as any, border: 'none', cursor: 'pointer' };
const navItem = (active: boolean, acc: string) => ({ padding: '12px', color: active ? acc : '#444', cursor: 'pointer', borderLeft: active ? `3px solid ${acc}` : 'none', background: active ? '#0a0a0a' : 'transparent', fontSize: '11px', marginBottom: '2px' });
const voiceOff = { width: '100%', background: '#111', color: '#32CD32', border: '1px solid #32CD32', padding: '10px', cursor: 'pointer' };
const voiceOn = { width: '100%', background: '#32CD32', color: '#000', border: 'none', padding: '10px', fontWeight: 'bold' as any, cursor: 'pointer' };
const searchInput = { background: '#111', border: '1px solid #222', color: '#fff', padding: '10px', width: '300px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as any };
const thStyle = { textAlign: 'left' as any, color: '#32CD32', borderBottom: '2px solid #1a1a1a', padding: '10px' };
const trStyle = { borderBottom: '1px solid #0a0a0a', height: '50px' };
const actionBtn = { background: 'none', border: '1px solid #333', color: '#32CD32', padding: '5px', cursor: 'pointer', fontSize: '10px' };
const drillDownBox = { background: '#050505', padding: '30px', border: '1px solid #1a1a1a' };
const backBtn = { color: '#32CD32', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' };
const detailGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' };
const statBox = { background: '#0a0a0a', padding: '20px', border: '1px solid #1a1a1a' };
const terminalBox = { marginTop: '40px', padding: '30px', border: '1px solid #32CD32', background: '#050505' };
const bigActionBtn = { background: '#32CD32', color: '#000', border: 'none', padding: '15px 30px', fontWeight: 'bold' as any, cursor: 'pointer', marginTop: '20px' };
const addEntryBtn = { background: '#32CD32', color: '#000', border: 'none', padding: '10px 20px', marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold' as any };
const dataSection = { background: '#0a0a0a', padding: '15px', border: '1px solid #1a1a1a', fontSize: '12px' };