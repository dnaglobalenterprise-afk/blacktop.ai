import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ status }) => {
  return (
    <nav style={{ 
      background: '#111', 
      padding: '15px 30px', 
      display: 'flex', 
      alignItems: 'center',
      gap: '25px', 
      borderBottom: '2px solid #ffcc00',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
    }}>
      <div style={{ color: '#ffcc00', fontWeight: '900', fontSize: '1.2rem', marginRight: '20px' }}>
        BLACKTOP COMMAND
      </div>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/control-tower" style={linkStyle}>Control Tower</Link>
      <Link to="/tracking" style={linkStyle}>Live GPS</Link>
      <Link to="/accounting" style={linkStyle}>Accounting</Link>
      <Link to="/compliance" style={linkStyle}>Compliance</Link>
      <Link to="/crm" style={linkStyle}>CRM & Fuel</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff00' }}></div>
        <span style={{ color: '#00ff00', fontSize: '0.9rem', fontFamily: 'monospace' }}>JAKE: {status}</span>
      </div>
    </nav>
  );
};

const linkStyle = { 
  color: '#fff', 
  textDecoration: 'none', 
  fontSize: '0.9rem', 
  fontWeight: '500',
  textTransform: 'uppercase'
};

export default Navigation;