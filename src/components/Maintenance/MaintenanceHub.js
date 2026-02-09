import React from 'react';

const MaintenanceHub = () => {
  const schedule = [
    { truck: 'T-502', service: 'Oil Change', dueDate: '2026-03-15', priority: 'Low' },
    { truck: 'T-881', service: 'Brake Inspection', dueDate: '2026-02-10', priority: 'High' }
  ];

  return (
    <div className="maintenance-hub">
      <h2>Fleet Maintenance & Repair Hub</h2>
      <div className="maintenance-list">
        {schedule.map((item, i) => (
          <div key={i} className={`maintenance-item ${item.priority.toLowerCase()}`}>
            <strong>{item.truck}</strong> - {item.service}
            <span>Due: {item.dueDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceHub;