import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Users, FileText, 
  BrainCircuit, Zap, ArrowLeft, Bell, 
  Wrench, Shield, Fuel, Navigation, Mic, Plus, Clipboard
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

  // --- LIVE DATA STORE ---
  const [inputRate, setInputRate] = useState('');
  const [inputMiles, setInputMiles] = useState('');
  
  const [fleet] = useState({
    drivers: [
      { id: 'D-01', name: 'Mike S.', status: 'Active', phone: '555-0101' },
      { id: 'D-02', name: 'Sarah L.', status: 'Resetting', phone: '555-0102' }
    ],
    equipment: [
      { id: '101', type: 'Sleeper', make: 'Freightliner', year: '2023' },
      { id: '102', type: 'Day Cab', make: 'Peterbilt', year: '2022' }
    ],
    maintenance: [
      { unit: '101', service: 'Oil Change', status: 'Upcoming', date: 'Feb 10' }
    ]
  });

  const calculateProfitability = (rate, miles) => {
    if (!rate || !miles) return { label: 'AWAITING DATA', color: '#94a3b8' };
    const fuelPrice = 4.10; 
    const mpg = 6.5;
    const driverPay = miles * 0.60;
    const fuelCost = (miles / mpg) * fuelPrice;
    const net = rate - fuelCost - driverPay;
    const rpm = net / miles;

    if (rpm > 2.50) return { label: 'DIAMOND', color: '#0ea5e9', needsHaggle: false };
    if (rpm > 1.80) return { label: 'GOLD', color: '#eab308', needsHaggle: true };
    return { label: 'SILVER', color: '#94a3b8', needsHaggle: true };
  };

  const currentGrade = calculateProfitability(Number(inputRate), Number(inputMiles));

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
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <BrainCircuit size={50} color={UI_THEME.ai} />
          <h1>Blacktop Command</h1>
          <button onClick={() => setView('TERMINAL')} style={{ background: UI_THEME.ai, color: '#fff', border: 'none', padding: '20px 60px', borderRadius: '35px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' }}>START DISPATCH</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: UI_THEME.bg, fontFamily: 'sans-serif' }}>
      <aside style={{ width: '280px', background: UI_THEME.sidebar, color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '25px', fontSize: '20px', fontWeight: 'bold' }}>BLACKTOP AI</div>
        <nav style={{ flex: 1 }}>
          <NavBtn icon={<LayoutDashboard size={20}/>} label="Command Center" active={activeLayer === 'DASHBOARD'} onClick={() => setActiveLayer('DASHBOARD')} />
          <NavBtn icon={<Navigation size={20}/>} label="Operations World" active={activeLayer === 'OPERATIONS'} onClick={() => {setActiveLayer('OPERATIONS'); setOpSubView('WORLD');}} />
          <NavBtn icon={<Fuel size={20}/>} label="Fuel & Audit" active={activeLayer === 'FUEL'} onClick={() => setActiveLayer('FUEL')} />
          <NavBtn icon={<Shield size={20}/>} label="Compliance" active={activeLayer === 'COMPLIANCE'} onClick={() => setActiveLayer('COMPLIANCE')} />
        </nav>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: '65px', background: '#fff', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between' }}>
          <button onClick={() => setView('BRIEFING')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}><ArrowLeft size={16}/></button>
          <h3 style={{margin:0}}>{activeLayer} {opSubView !== 'WORLD' ? `/ ${opSubView}` : ''}</h3>
          <Bell size={20} />
        </header>

        <section style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {activeLayer === 'OPERATIONS' && opSubView === 'WORLD' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div onClick={() => setOpSubView('LOADS')} style={styles.worldCard}><Zap color={UI_THEME.ai} size={32}/> <h3>Route Scouter</h3></div>
              <div onClick={() => setOpSubView('EQUIPMENT')} style={styles.worldCard}><Truck color={UI_THEME.accent} size={32}/> <h3>Equipment</h3></div>
              <div onClick={() => setOpSubView('DRIVERS')} style={styles.worldCard}><Users color={UI_THEME.success} size={32}/> <h3>Drivers</h3></div>
              <div onClick={() => setOpSubView('MAINTENANCE')} style={styles.worldCard}><Wrench color={UI_THEME.warning} size={32}/> <h3>Maintenance</h3></div>
            </div>
          )}

          {opSubView === 'LOADS' && activeLayer === 'OPERATIONS' && (
            <div style={{maxWidth:'500px', margin:'0 auto', background:'#fff', padding:'25px', borderRadius:'15px'}}>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back</button>
              <h3>AI Scouter</h3>
              <input type="number" placeholder="Rate ($)" value={inputRate} onChange={e => setInputRate(e.target.value)} style={styles.input} />
              <input type="number" placeholder="Miles" value={inputMiles} onChange={e => setInputMiles(e.target.value)} style={styles.input} />
              <div style={{background: currentGrade.color, color:'#fff', padding:'20px', borderRadius:'10px', textAlign:'center', marginTop:'15px'}}>
                <strong>{currentGrade.label}</strong>
              </div>
            </div>
          )}

          {opSubView === 'EQUIPMENT' && activeLayer === 'OPERATIONS' && (
            <div>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back</button>
              <table style={styles.table}>
                <thead><tr><th>UNIT</th><th>MAKE</th><th>TYPE</th></tr></thead>
                <tbody>{fleet.equipment.map(e => <tr key={e.id}><td>{e.id}</td><td>{e.make}</td><td>{e.type}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          {opSubView === 'DRIVERS' && activeLayer === 'OPERATIONS' && (
            <div>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back</button>
              <table style={styles.table}>
                <thead><tr><th>NAME</th><th>STATUS</th><th>PHONE</th></tr></thead>
                <tbody>{fleet.drivers.map(d => <tr key={d.id}><td>{d.name}</td><td>{d.status}</td><td>{d.phone}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          {opSubView === 'MAINTENANCE' && activeLayer === 'OPERATIONS' && (
            <div>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back</button>
              <table style={styles.table}>
                <thead><tr><th>UNIT</th><th>SERVICE</th><th>STATUS</th></tr></thead>
                <tbody>{fleet.maintenance.map((m, i) => <tr key={i}><td>{m.unit}</td><td>{m.service}</td><td>{m.status}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          {activeLayer === 'DASHBOARD' && (
            <div style={{textAlign:'center', marginTop:'50px'}}>
              <BrainCircuit size={60} color={UI_THEME.ai} />
              <h2>Command Center Active</h2>
              <p>Fleet Intelligence Sync Complete.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  worldCard: { background: '#fff', padding: '30px', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  backLink: { background: 'none', border: 'none', color: UI_THEME.accent, cursor: 'pointer', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' },
  table: { width: '100%', background: '#fff', borderRadius: '10px', borderCollapse: 'collapse', textAlign: 'left' }
};

export default App;