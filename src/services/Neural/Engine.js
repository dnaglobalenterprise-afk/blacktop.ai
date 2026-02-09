import React, { useState, useEffect } from 'react';

const NeuralEngine = () => {
  const [jakeStatus, setJakeStatus] = useState("Analyzing Inbox...");
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const simulateJake = setInterval(() => {
      const events = [
        "Jake detected new load request from Email: Chicago to Miami",
        "Jake cross-referencing Driver Hours (HOS) for T-502",
        "Neural Link: Fuel prices updated for Pilot #102",
        "Jake updating ETA for Load L1001 based on traffic"
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setProcessedData(prev => [randomEvent, ...prev].slice(0, 10));
      setJakeStatus("Active - Processing Real-time Stream");
    }, 5000);

    return () => clearInterval(simulateJake);
  }, []);

  return (
    <div className="neural-engine">
      <h2 style={{ color: '#00ff00' }}>Jake's Neural Command: {jakeStatus}</h2>
      <div className="log-window">
        {processedData.map((log, i) => (
          <div key={i} style={{ marginBottom: '5px' }}>{`> ${log}`}</div>
        ))}
      </div>
    </div>
  );
};

export default NeuralEngine;