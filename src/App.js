import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Truck, Users, FileText, AlertTriangle, 
  BrainCircuit, Zap, CheckCircle, Clock, Sun, Moon, 
  ArrowLeft, Save, DollarSign, ChevronRight, Bell, 
  LogOut, MessageSquare, Search, Wrench, Shield, 
  Fuel, Activity, Download, Map as MapIcon, PhoneCall, Globe, CloudRain,
  Mic, Settings, UserCheck, TrendingUp, Navigation
} from 'lucide-react';

const UI_THEME = {
  sidebar: '#1a1c1e', header: '#ffffff', accent: '#0078d4', 
  bg: '#f3f4f6', text: '#1f2937', danger: '#d32f2f', 
  warning: '#ed6c02', success: '#2e7d32', ai: '#7c3aed'
};

function App() {
  const [view, setView] = useState('BRIEFING'); 
  const [activeLayer, setActiveLayer] = useState('DASHBOARD');
  const [opSubView, setOpSubView] = useState('WORLD'); 

  // --- AI ENGINE: ROUTE SCOUTER LOGIC ---
  const calculateProfitability = (rate, miles) => {
    const fuelPrice = 4.10; // Real-time placeholder
    const mpg = 6.5;
    const driverPay = miles * 0.60;
    const fuelCost = (miles / mpg) * fuelPrice;
    const net = rate - fuelCost - driverPay;
    const rpm = net / miles;

    if (rpm > 2.50) return { label: 'DIAMOND', color: '#0ea5e9' };
    if (rpm > 1.80) return { label: 'GOLD', color: '#eab308' };
    return { label: 'SILVER', color: '#94a3b8' };
  };

  const [data] = useState({ 
    loads: [
      { id: 'L-4022', customer: 'CH Robinson', origin: 'Laredo, TX', dest: 'Chicago, IL', rate: 3200, miles: 1350, appt: '14:00', currentEta: '15:30', status: 'LATE' },
      { id: 'L-4023', customer: 'TQL', origin: 'Atlanta, GA', dest: 'Miami, FL', rate: 1800, miles: 660, appt: '08:00', currentEta: '07:15', status: 'ON-TIME' }
    ],
    // MOTIVE ELD INTEGRATION PLACEHOLDER
    motiveLogs: [
      { driver: 'Mike S.', dutyStatus: 'Driving', hoursUsed: 9.5, violationRisk: 'HIGH' }
    ],
    config: {
      twilioNumber: '+1 (555) 000-0000',
      weatherApiKey: 'PASTE_KEY_HERE',
      mapsApiKey: 'PASTE_KEY_HERE'
    }
  });

  const NavBtn = ({ icon, label, active, onClick }) => (
    <div onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 25px', cursor: 'pointer',
      background: active ? '#2d3135' : 'transparent',
      borderLeft: active ? `4px solid ${UI_THEME.accent}` : '4px solid transparent',
      color: active ? '#fff' : '#9ca3af'
    }}>
      {icon} <span style={{ fontSize: '14px', fontWeight: active ? '600' : 'normal' }}>{label}</span>
    </div>
  );

  if (view === 'BRIEFING') {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', padding: '40px 20px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ marginBottom: '30px', textAlign: 'center' }}>
            <BrainCircuit size={40} color={UI_THEME.ai} style={{ marginBottom: '15px' }} />
            <h1 style={{ fontSize: '28px' }}>Intelligence Briefing</h1>
          </header>

          <div 
            onClick={() => { setActiveLayer('OPERATIONS'); setOpSubView('LOADS'); setView('TERMINAL'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '12px', border: '2px solid', borderColor: UI_THEME.warning, background: '#422006', cursor: 'pointer', marginBottom: '20px' }}
          >
            <AlertTriangle color={UI_THEME.warning} size={24} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>SERVICE ALERT: Unit 102 Delayed</div>
              <div style={{ fontSize: '14px' }}>ETA is 15:30 for a 14:00 Appt. AI is triggering Twilio call to Broker.</div>
            </div>
            <ChevronRight size={20} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: '#1e293b', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><TrendingUp size={18} color={UI_THEME.success}/> Route Scouter</h3>
              <p style={{fontSize: '13px', color: '#94a3b8'}}>3 Diamond loads detected on DAT. AI auto-bidding active.</p>
            </div>
            <div style={{ background: '#1e293b', padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Shield size={18} color={UI_THEME.danger}/> Motive Audit</h3>
              <p style={{fontSize: '13px', color: '#94a3b8'}}>Nightly audit: 1 HOS violation prevented via ignition lock.</p>
            </div>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button onClick={() => setView('TERMINAL')} style={{ background: UI_THEME.ai, color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Enter Command Center</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: UI_THEME.bg, fontFamily: 'sans-serif' }}>
      <aside style={{ width: '280px', background: UI_THEME.sidebar, color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '25px', fontSize: '20px', fontWeight: 'bold' }}>BLACKTOP AI</div>
        <nav style={{ flex: 1, paddingTop: '20px' }}>
          <NavBtn icon={<LayoutDashboard size={20}/>} label="Command Center" active={activeLayer === 'DASHBOARD'} onClick={() => setActiveLayer('DASHBOARD')} />
          <NavBtn icon={<Globe size={20}/>} label="Operations World" active={activeLayer === 'OPERATIONS'} onClick={() => {setActiveLayer('OPERATIONS'); setOpSubView('WORLD');}} />
          <NavBtn icon={<Fuel size={20}/>} label="Fuel & Audit" active={activeLayer === 'FUEL'} onClick={() => setActiveLayer('FUEL')} />
          <NavBtn icon={<FileText size={20}/>} label="Accounting" active={activeLayer === 'ACCOUNTING'} onClick={() => setActiveLayer('ACCOUNTING')} />
          <NavBtn icon={<Shield size={20}/>} label="Compliance" active={activeLayer === 'COMPLIANCE'} onClick={() => setActiveLayer('COMPLIANCE')} />
        </nav>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: '65px', background: '#fff', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button onClick={() => setView('BRIEFING')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}><ArrowLeft size={16}/> Briefing</button>
             <h3 style={{margin: 0}}>{activeLayer} {opSubView !== 'WORLD' ? `/ ${opSubView}` : ''}</h3>
          </div>
          <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
            <div style={{background: '#fef3c7', color: '#92400e', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'}}>
              TWILIO ACTIVE: {data.config.twilioNumber}
            </div>
            <Bell size={20} color="#666" />
          </div>
        </header>

        <section style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          
          {activeLayer === 'OPERATIONS' && opSubView === 'WORLD' && (
            <div style={{ textAlign: 'center' }}>
               <div style={{ background: '#1e293b', height: '400px', borderRadius: '25px', marginBottom: '30px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* REAL-TIME WEATHER/TRAFFIC MAP SIMULATION */}
                  <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '10px', color: '#fff', textAlign: 'left', fontSize: '12px', zIndex: 10}}>
                    <div style={{fontWeight: 'bold', borderBottom: '1px solid #444', marginBottom: '5px'}}>AI MONITORING</div>
                    <div style={{display:'flex', gap:'5px', color: UI_THEME.danger}}>● Storm Cell: Cheyenne, WY</div>
                    <div style={{display:'flex', gap:'5px', color: UI_THEME.warning}}>● Delay: I-55 Chicago Traffic</div>
                  </div>
                  <div style={{color: '#fff', textAlign:'center'}}>
                    <Navigation size={48} color={UI_THEME.accent} style={{marginBottom:'10px'}} />
                    <h2>Active Intelligence Map</h2>
                    <p>Motive ELD + OpenWeather API Integrated</p>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                 <div onClick={() => setOpSubView('EQUIPMENT')} style={styles.worldCard}><Truck color={UI_THEME.accent} size={32}/> <h3>Equipment</h3></div>
                 <div onClick={() => setOpSubView('DRIVERS')} style={styles.worldCard}><Users color={UI_THEME.success} size={32}/> <h3>Drivers</h3></div>
                 <div onClick={() => setOpSubView('MAINTENANCE')} style={styles.worldCard}><Wrench color={UI_THEME.warning} size={32}/> <h3>Maintenance</h3></div>
                 <div onClick={() => setOpSubView('LOADS')} style={styles.worldCard}><Zap color={UI_THEME.ai} size={32}/> <h3>Route Scouter</h3></div>
               </div>
            </div>
          )}

          {activeLayer === 'OPERATIONS' && opSubView === 'LOADS' && (
            <div>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back to World</button>
              <h3>AI Route Scouter (Live DAT/Broker Feeds)</h3>
              <table style={styles.mainTable}>
                <thead><tr style={{background:'#f8f9fa'}}><th style={{padding:'15px'}}>LOAD ID</th><th>ROUTE</th><th>APPT</th><th>PREDICTED ETA</th><th>PROFIT GRADE</th></tr></thead>
                <tbody>
                  {data.loads.map(l => {
                    const grade = calculateProfitability(l.rate, l.miles);
                    const isLate = l.currentEta > l.appt;
                    return (
                      <tr key={l.id} style={{borderBottom:'1px solid #eee', background: isLate ? '#fffbeb' : '#fff'}}>
                        <td style={{padding:'15px', fontWeight:'bold'}}>{l.id}</td>
                        <td>{l.origin} → {l.dest}</td>
                        <td>{l.appt}</td>
                        <td style={{color: isLate ? UI_THEME.danger : UI_THEME.success, fontWeight:'bold'}}>{l.currentEta} {isLate && '(DELAYED)'}</td>
                        <td><span style={{background: grade.color, color:'#fff', padding:'4px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'bold'}}>{grade.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ... Maintenance, Fuel, and Compliance logic ... */}
          {activeLayer === 'DASHBOARD' && (
             <div style={{textAlign:'center', marginTop:'100px'}}>
               <BrainCircuit size={64} color={UI_THEME.ai} />
               <h2>Blacktop Intelligence Core</h2>
               <p>Twilio Voice + Motive ELD APIs standing by.</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  worldCard: { background: '#fff', padding: '25px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' },
  mainTable: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden' },
  backLink: { background: 'none', border: 'none', color: UI_THEME.accent, cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' },
};

export default App;