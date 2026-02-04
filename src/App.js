import React, { useState } from 'react';
import { 
  LayoutDashboard, Truck, Users, FileText, 
  BrainCircuit, Zap, ArrowLeft, Bell, 
  Wrench, Shield, Fuel, Navigation, Mic, Plus
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

  // --- LIVE INPUT STATE ---
  const [inputRate, setInputRate] = useState('');
  const [inputMiles, setInputMiles] = useState('');

  const calculateProfitability = (rate, miles) => {
    if (!rate || !miles) return { label: 'WAITING', color: '#94a3b8' };
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

  const handleHaggle = () => {
    alert(`Blacktop AI: Sending automated negotiation. Requesting rate increase to hit 25% Diamond margin.`);
  };

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
            <h1 style={{ fontSize: '28px' }}>Blacktop AI Briefing</h1>
          </header>
          <div onClick={() => setView('TERMINAL')} style={{ background: '#1e293b', padding: '40px', borderRadius: '15px', border: '1px solid #334155', cursor: 'pointer', textAlign: 'center' }}>
            <Zap size={48} color={UI_THEME.ai} style={{marginBottom: '20px'}} />
            <h2>Enter Command Center</h2>
            <p style={{color: '#94a3b8'}}>Ready to analyze live market loads.</p>
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
          <NavBtn icon={<Navigation size={20}/>} label="Operations World" active={activeLayer === 'OPERATIONS'} onClick={() => {setActiveLayer('OPERATIONS'); setOpSubView('WORLD');}} />
          <NavBtn icon={<Fuel size={20}/>} label="Fuel & Audit" active={activeLayer === 'FUEL'} onClick={() => setActiveLayer('FUEL')} />
          <NavBtn icon={<FileText size={20}/>} label="Accounting" active={activeLayer === 'ACCOUNTING'} onClick={() => setActiveLayer('ACCOUNTING')} />
          <NavBtn icon={<Shield size={20}/>} label="Compliance" active={activeLayer === 'COMPLIANCE'} onClick={() => setActiveLayer('COMPLIANCE')} />
        </nav>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: '65px', background: '#fff', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button onClick={() => setView('BRIEFING')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}><ArrowLeft size={16}/> Briefing</button>
             <h3 style={{margin: 0}}>{activeLayer}</h3>
          </div>
          <Bell size={20} color="#666" />
        </header>

        <section style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          
          {activeLayer === 'OPERATIONS' && opSubView === 'WORLD' && (
            <div style={{ textAlign: 'center' }}>
               <div style={{ background: '#1e293b', height: '300px', borderRadius: '25px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <div style={{textAlign:'center'}}>
                    <Navigation size={48} color={UI_THEME.accent} />
                    <h2>Active Fleet World</h2>
                    <p>Live Weather & ELD Overlays</p>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                 <div onClick={() => setOpSubView('LOADS')} style={styles.worldCard}><Zap color={UI_THEME.ai} size={32}/> <h3>Route Scouter</h3></div>
                 <div onClick={() => setOpSubView('EQUIPMENT')} style={styles.worldCard}><Truck color={UI_THEME.accent} size={32}/> <h3>Equipment</h3></div>
                 <div onClick={() => setOpSubView('DRIVERS')} style={styles.worldCard}><Users color={UI_THEME.success} size={32}/> <h3>Drivers</h3></div>
                 <div onClick={() => setOpSubView('MAINTENANCE')} style={styles.worldCard}><Wrench color={UI_THEME.warning} size={32}/> <h3>Maintenance</h3></div>
               </div>
            </div>
          )}

          {activeLayer === 'OPERATIONS' && opSubView === 'LOADS' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <button onClick={() => setOpSubView('WORLD')} style={styles.backLink}>← Back to World</button>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Plus size={20} color={UI_THEME.accent}/> New Load Analysis</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={styles.label}>Broker Rate ($)</label>
                  <input type="number" value={inputRate} onChange={(e) => setInputRate(e.target.value)} placeholder="e.g. 3500" style={styles.input} />
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={styles.label}>Total Miles</label>
                  <input type="number" value={inputMiles} onChange={(e) => setInputMiles(e.target.value)} placeholder="e.g. 1200" style={styles.input} />
                </div>

                <div style={{ padding: '20px', borderRadius: '12px', background: '#f8f9fa', textAlign: 'center', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px', fontWeight: 'bold' }}>AI PROFIT GRADE</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: currentGrade.color }}>{currentGrade.label}</div>
                  
                  {currentGrade.needsHaggle && (
                    <button onClick={handleHaggle} style={{ marginTop: '15px', width: '100%', background: UI_THEME.ai, color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <Mic size={18}/> Haggle for Diamond
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeLayer === 'DASHBOARD' && (
             <div style={{textAlign:'center', marginTop:'100px'}}>
               <BrainCircuit size={64} color={UI_THEME.ai} />
               <h2>Blacktop AI is Online</h2>
               <p>Logic Core: Ready for Partners.</p>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  worldCard: { background: '#fff', padding: '25px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' },
  backLink: { background: 'none', border: 'none', color: UI_THEME.accent, cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' },
  label: { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#444' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', boxSizing: 'border-box' }
};

export default App;