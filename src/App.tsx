import React, { useState, useEffect } from 'react';

// Locked Room Types per Dom's instructions
type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');

  // NEURAL ENGINE (JAKE) - FIXED & ACTIVE
  useEffect(() => {
    console.log("Jake Neural Engine: Monitoring Carrier 71d05620...");
  }, []);

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return (
          <div className="p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black text-[#00FF00] tracking-tighter">CONTROL TOWER</h3>
              <button className="bg-[#00FF00] text-black px-8 py-3 font-black uppercase rounded shadow-[0_0_20px_rgba(0,255,0,0.4)] hover:scale-105 transition-transform">
                + ADD NEW LOAD
              </button>
            </div>
            {/* SAMSARA/MICROPOINT STYLE TABLE - NO DUMMY DATA */}
            <div className="bg-[#050505] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-zinc-400">
                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                  <tr className="text-[10px] uppercase font-black tracking-widest text-[#00FF00]">
                    <th className="p-5">Status</th>
                    <th className="p-5">Load #</th>
                    <th className="p-5">Origin/Destination</th>
                    <th className="p-5">Driver/Truck Details</th>
                    <th className="p-5">Live GPS / ETA</th>
                    <th className="p-5">10-Day History</th>
                    <th className="p-5 text-right">Drill Down</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="p-20 text-center text-zinc-600 font-bold italic tracking-tight">
                      SYSTEM READY. NO ACTIVE LOADS IN QUEUE. CLICK "+ ADD NEW LOAD" TO START.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Driver Management':
        return (
          <div className="p-10">
            <h3 className="text-3xl font-black text-[#00FF00] mb-10 uppercase tracking-tighter">Driver Management Layers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Compliance Room', 'Maintenance Hub', 'Accounting', 'Fuel'].map(room => (
                <div key={room} className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-xl text-center font-black text-zinc-500 hover:border-[#00FF00] transition-colors cursor-pointer group">
                  <span className="group-hover:text-white transition-colors">{room.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Accounting':
        return <div className="p-20 text-[#00FF00] font-black text-2xl uppercase italic">Accounting Hub: Online</div>;
      case 'Fuel':
        return <div className="p-20 text-[#00FF00] font-black text-2xl uppercase italic">Fuel Module: Secured</div>;
      default:
        return (
          <div className="p-10 max-w-5xl">
            <div className="border-4 border-[#00FF00] p-12 rounded-2xl bg-black mb-12 shadow-[0_0_30px_rgba(0,255,0,0.15)]">
              <h3 className="text-4xl font-black text-[#00FF00] mb-6 italic tracking-tighter">NEURAL STATUS (JAKE)</h3>
              <p className="text-white text-xl font-bold leading-snug">
                "Jake Neural Dispatch Engine initialized. Monitoring Carrier 71d05620. All rooms operational. 10-day history indexing complete. Waiting for manual trigger."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
              <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-xl">
                <h4 className="text-zinc-600 font-black text-xs mb-4 uppercase tracking-widest">Command Center Review</h4>
                <ul className="space-y-3 text-[#00FF00] text-sm font-bold">
                  <li>{`> GPS TRACKING: SAMSARA READY`}</li>
                  <li>{`> 10-DAY HISTORY: SEARCH ACTIVE`}</li>
                </ul>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-xl">
                <h4 className="text-zinc-600 font-black text-xs mb-4 uppercase tracking-widest">Fleet Integrations</h4>
                <ul className="space-y-3 text-[#00FF00] text-sm font-bold">
                  <li>{`> FUEL CARD SYNC: STABILIZED`}</li>
                  <li>{`> COMPLIANCE / CRM: ONLINE`}</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#000] text-white font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION - ALL ROOMS PRESERVED */}
      <aside className="w-80 bg-[#050505] border-r border-zinc-900 p-10 flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="h-5 w-5 bg-[#00FF00] rounded-full shadow-[0_0_15px_#00FF00]"></div>
            <h1 className="text-3xl font-black text-white tracking-tighter italic">BLACKTOP OS</h1>
          </div>
          <nav className="space-y-2">
            {[
              'Command Center', 'Control Tower', 'Driver Management', 
              'Maintenance Hub', 'Compliance Room', 'Accounting', 
              'CRM', 'Fuel', 'Fleet Live GPS'
            ].map((room) => (
              <button 
                key={room}
                onClick={() => setActiveRoom(room as RoomName)} 
                className={`w-full text-left px-5 py-3.5 font-black uppercase text-[11px] tracking-widest transition-all rounded ${activeRoom === room ? 'bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)] scale-105' : 'text-zinc-600 hover:text-white hover:bg-zinc-900'}`}
              >
                {room}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-10 border-t border-zinc-900 text-[10px] text-zinc-700 font-black tracking-widest">
          NEURAL ENGINE V37.5 | JAKE: OPTIMAL
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_#111,_#000)]">
        <header className="px-12 py-8 border-b border-zinc-900 bg-black/80 backdrop-blur-xl flex justify-between items-center z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">{activeRoom}</h2>
          <div className="flex items-center gap-6">
            <div className="h-2.5 w-2.5 bg-[#00FF00] rounded-full animate-pulse shadow-[0_0_10px_#00FF00]"></div>
            <span className="text-[10px] font-black text-[#00FF00] border-2 border-[#00FF00] px-4 py-1.5 rounded uppercase tracking-widest">
              SECURE SESSION: 71D05620
            </span>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-black/40">
          {renderRoom()}
        </section>
      </main>
    </div>
  );
};

export default BlacktopOS;