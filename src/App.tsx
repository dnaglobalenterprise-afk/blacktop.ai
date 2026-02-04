import React, { useState } from 'react';
import axios from 'axios';
import { AgentControl } from './components/AgentControl';

const MapView: React.FC<{ driver?: any }> = ({ driver }) => (
  <div style={{ height: '300px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', position: 'relative', overflow: 'hidden', marginBottom: '20px' }}>
    <div style={{ position: 'absolute', color: '#00ff00', padding: '10px', fontSize: '10px', fontFamily: 'monospace' }}>
      LIVE GPS FEED_V2.0
    </div>
    {/* 🗺️ Simple Map Placeholder with "moving" truck logic */}
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#00ff00', textAlign: 'center' }}>
        {driver ? (
          <div>
            <div style={{ fontSize: '24px' }}>🚚</div>
            <p>{driver.name} - EN ROUTE</p>
            <p style={{ fontSize: '10px' }}>LAT: {driver.last_lat || '35.22'} | LNG: {driver.last_lng || '-80.84'}</p>
          </div>
        ) : (
          <p style={{ color: '#444' }}>SEARCH A DRIVER TO TRACK LOCATION</p>
        )}
      </div>
    </div>
  </div>
);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/search?q=${searchTerm}`);
      setResults(res.data);
    } catch (err) {
      alert("API Connection Lost.");
    }
  };

  const activeTarget = results?.drivers?.[0]?.name || results?.customers?.[0]?.name;

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ff00', textAlign: 'center', textShadow: '0 0 10px #00ff00' }}>BLACKTOP AI COMMAND</h1>
      
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search Fleet or Brokers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '50%', padding: '12px', background: '#111', color: '#00ff00', border: '1px solid #00ff00' }}
          />
          <button type="submit" style={{ padding: '12px 24px', background: '#00ff00', fontWeight: 'bold', cursor: 'pointer' }}>INITIATE SEARCH</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 2 }}>
          <MapView driver={results?.drivers?.[0]} />
          
          <div style={{ padding: '20px', background: '#111', border: '1px solid #333', borderRadius: '8px' }}>
            <h3 style={{ color: '#00ff00', marginTop: 0 }}>Active Compliance Monitor</h3>
            {results?.drivers?.[0] ? (
              <div>
                <p>Driver: {results.drivers[0].name}</p>
                <p>Incidents: {results.drivers[0].incidents}</p>
              </div>
            ) : <p>Standing by...</p>}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <AgentControl activeTarget={activeTarget} />
          <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #444', fontSize: '12px' }}>
            <p style={{ color: '#00ff00' }}>AI THOUGHT LOG:</p>
            <p>&gt; Monitoring weather patterns in Midwest...</p>
            <p>&gt; {results?.drivers?.[0] ? `Analyzing safety risk for ${results.drivers[0].name}...` : 'Ready for input...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;