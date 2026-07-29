import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function Compliance() {
  const [regulations, setRegulations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/systematiek/compliance`);
      const data = await res.json();
      setRegulations(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden compliance informatie:', error);
      setLoading(false);
    }
  };

  const filteredRegulations = regulations.filter(reg =>
    reg.title?.toLowerCase().includes(search.toLowerCase()) ||
    reg.regulation_code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Regelgeving & Compliance</h1>
            <p className="text-slate-400">Overzicht van regelgeving per jurisdictie</p>
          </div>

          {/* Search */}
          <div className="mb-8 relative">
            <FiSearch className="absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Zoeken naar regelgeving..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Regulations List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-slate-400 py-8">Laden...</div>
            ) : filteredRegulations.length === 0 ? (
              <div className="text-center text-slate-400 py-8">Geen regelgeving gevonden</div>
            ) : (
              filteredRegulations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{reg.title}</h3>
                      <div className="flex space-x-4 mb-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {reg.regulation_code}
                        </span>
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {reg.jurisdiction}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{reg.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-slate-400">Effectief vanaf:</span>
                      <p className="text-white font-bold">
                        {reg.effective_date ? new Date(reg.effective_date).toLocaleDateString('nl-NL') : 'N.v.t.'}
                      </p>
                    </div>
                    {reg.end_date && (
                      <div>
                        <span className="text-slate-400">Einddatum:</span>
                        <p className="text-white font-bold">
                          {new Date(reg.end_date).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                    )}
                  </div>

                  {reg.affected_uav_types && reg.affected_uav_types.length > 0 && (
                    <div className="mb-4">
                      <p className="text-slate-400 text-sm mb-2">Betrokken UAV typen:</p>
                      <div className="flex flex-wrap gap-2">
                        {reg.affected_uav_types.map((type, i) => (
                          <span key={i} className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Details Bekijken
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
