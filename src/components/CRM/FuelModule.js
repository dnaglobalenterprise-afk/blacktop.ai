import React from 'react';

const FuelModule = () => {
  const fuelLogs = [
    { truck: 'T-502', date: '2026-02-05', station: 'Loves #442', gallons: 120, total: 450.00 },
    { truck: 'T-881', date: '2026-02-05', station: 'Pilot #102', gallons: 95, total: 360.25 }
  ];

  return (
    <div className="fuel-module">
      <h3>Fuel Management Layer</h3>
      <div className="fuel-grid">
        {fuelLogs.map((log, index) => (
          <div key={index} className="fuel-card">
            <h4>Truck: {log.truck}</h4>
            <p>Station: {log.station}</p>
            <p>Gallons: {log.gallons}</p>
            <p><strong>Cost: ${log.total}</strong></p>
          </div>
        ))}
      </div>
      <button className="add-fuel-btn">+ Add Fuel Transaction</button>
    </div>
  );
};

export default FuelModule;