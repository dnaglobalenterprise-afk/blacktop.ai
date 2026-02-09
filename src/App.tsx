import React, { useState } from 'react';

// Define the Room types for the compiler
type RoomName = 'Command Center' | 'Control Tower' | 'Driver Management' | 'Maintenance Hub' | 'Compliance Room' | 'Accounting' | 'CRM' | 'Fuel' | 'Fleet Live GPS';

const BlacktopOS: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<RoomName>('Command Center');
  
  const rooms: RoomName[] = [
    'Command Center', 'Control Tower', 'Driver Management', 
    'Maintenance Hub', 'Compliance Room', 'Accounting', 
    'CRM', 'Fuel', 'Fleet Live GPS'
  ];

  const renderRoom = () => {
    switch(activeRoom) {
      case 'Control Tower':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-green-500 font-black tracking-tighter">CONTROL TOWER</h3>
              <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-black font-bold uppercase shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-transform active:scale-95">
                + Add New Load
              </button>
            </div>
            <div className="overflow-x-auto bg-zinc-900 rounded-lg p-4 border border-zinc-800 shadow-2xl">
              <table className="w-full text-sm text-left text-zinc-300">
                <thead>
                  <tr className="text-green-500 border-b border-zinc-800 uppercase text-[10px] font-black italic">
                    <th className="p-3">Load #</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Origin/Dest</th>
                    <th className="p-3">Driver/Truck</th>
                    <th className="p-3">ETA (GPS)</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                    <td className="p-3 font-bold text-white">#BT-1002</td>
                    <td className="p-3">Logistics Pro</td>
                    <td className="p-3">Miami &rarr; ATL</td>
                    <td className="p-3 text-zinc-400">Marcus / T-502</td>
                    <td className="p-3 text-green-400 font-mono text-xs">14:00 LIVE</td>
                    <td className="p-3 text-right">
                      <button className="bg-zinc-800 text-[10px] px-3 py-1 rounded border border-zinc-600 uppercase font-black hover:bg-zinc-700">
                        Drill Down
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Driver Management':
        return (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-green-500 font-black uppercase tracking-tighter">Driver Management</h3>
              <button className="bg-green-600 px-6 py-2 rounded font-bold text-black uppercase">+ Add Driver</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Compliance', 'Maintenance Hub', 'Accounting', 'Fuel'].map(label => (
                <div key={label} className="bg-zinc-900 p-8 rounded border border-zinc-800 text-center font-black text-zinc-500 hover:border-green-900 transition-colors">
                  {label.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-green-900/30 backdrop-blur-sm">
              <h3 className="text-green-500 font-black mb-4 uppercase tracking-widest italic">Neural Status (Jake)</h3>
              <p className="text-zinc-400 font-mono text-xs leading-relaxed">
                "System audit complete. Carrier ID 71d05620 identified. Neural audit functional. All rooms online."
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800">
              <h3 className="text-zinc-400 font-black mb-4 uppercase tracking-widest text-xs">Command Center Review</h3>
              <ul className="text-[10px] space-y-3 font-mono text-zinc-600 uppercase">
                <li>&gt; GPS TRACKING: SAMSARA READY</li>
                <li>&gt; 10-DAY HISTORY: SEARCH ACTIVE</li>
                <li>&gt; FUEL MODULE: STABILIZED</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between shadow-2xl z-20">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-green-500 rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <h1 className="text-xl font-black text-white tracking-tighter italic">BLACKTOP OS</h1>
          </div>
          <nav className="space-y-1">
            {rooms.map((room) => (
              <button 
                key={room}
                onClick={() => setActiveRoom(room)} 
                className={`w-full text-left px-3 py-2.5 rounded text-[10px] font-black uppercase tracking-tighter transition-all ${activeRoom === room ? 'bg-green-600 text-black shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'text-zinc-600 hover:text-zinc-200 hover:bg-zinc-900'}`}
              >
                {room}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-zinc-900">
          <div className="text-[9px] text-zinc-700 font-black uppercase tracking-widest">Neural Engine V37.2</div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
        <header className="px-10 py-6 flex justify-between items-center border-b border-zinc-900 bg-black/60 backdrop-blur-xl sticky top-0 z-10">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">{activeRoom}</h2>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
             <div className="text-[9px] font-mono bg-zinc-900 text-green-500 border border-green-900/50 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                System Secure: DEMO_MODE
             </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {renderRoom()}
        </div>
      </main>
    </div>
  );
};

export default BlacktopOS;