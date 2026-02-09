import React, { useState } from 'react';

const Ledger = () => {
  const [entries] = useState([
    { id: 'INV-001', date: '2026-02-01', description: 'Load L1001 Payment', amount: 2400.00, status: 'Paid' },
    { id: 'INV-002', date: '2026-02-04', description: 'Driver Settlement - John Doe', amount: -1200.00, status: 'Pending' }
  ]);

  return (
    <div className="accounting-hub">
      <h2>Accounting & Financial Ledger</h2>
      <div className="stats-row">
        <div className="stat-card">Total Revenue: $2,400</div>
        <div className="stat-card">Pending Payouts: $1,200</div>
      </div>
      <table className="accounting-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td style={{ color: item.amount > 0 ? 'green' : 'red' }}>
                ${Math.abs(item.amount).toLocaleString()}
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;