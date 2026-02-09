import React, { useState } from 'react';

const LoadBoard = () => {
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [loads, setLoads] = useState([
    { id: 'L1001', driver: 'John Doe', truck: 'T-502', origin: 'Chicago', dest: 'Dallas', status: 'In Transit', rate: 2400 },
    { id: 'L1022', driver: 'Adina S.', truck: 'T-881', origin: 'Atlanta', dest: 'Miami', status: 'Pending', rate: 1850 }
  ]);

  const triggerJakeProcess = (loadId) => {
    alert(`Jake is now processing settlement for ${loadId}...`);
    // Logic: In a real app, this sends a POST request to your /accounting API
    setLoads(loads.map(l => l.id === loadId ? { ...l, status: 'Delivered' } : l));
  };

  return (
    <div className="control-tower">
      <h2 style={{color: '#ffcc00'}}>Control Tower: Active Load Board</h2>
      <div className="grid-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Driver</th><th>Truck</th><th>Route</th><th>Status</th><th>Rate</th><th>Intelligence</th>
            </tr>
          </thead>
          <tbody>
            {loads.map(load => (
              <tr key={load.id}>
                <td>{load.id}</td>
                <td>{load.driver}</td>
                <td>{load.truck}</td>
                <td>{load.origin} → {load.dest}</td>
                <td><b style={{color: load.status === 'Delivered' ? '#00ff00' : '#ffcc00'}}>{load.status}</b></td>
                <td>${load.rate}</td>
                <td>
                  <button onClick={() => triggerJakeProcess(load.id)}>Process Settlement</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadBoard;