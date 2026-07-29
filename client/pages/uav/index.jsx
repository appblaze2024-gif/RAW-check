import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function UAVDatabase() {
  const [uavs, setUavs] = useState([]);
  const [filteredUavs, setFilteredUavs] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUavs();
  }, []);

  useEffect(() => {
    filterUavs();
  }, [search, typeFilter, uavs]);

  const fetchUavs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uav`);
      const data = await res.json();
      setUavs(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden UAV\'s:', error);
      setLoading(false);
    }
  };

  const filterUavs = () => {
    let filtered = uavs;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(uav => uav.type === typeFilter);
    }

    if (search) {
      filtered = filtered.filter(uav =>
        uav.model_name.toLowerCase().includes(search.toLowerCase()) ||
        uav.manufacturer?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUavs(filtered);
  };

  const uavTypes = ['all', ...new Set(uavs.map(u => u.type).filter(Boolean))];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">UAV Database</h1>
            <p className="text-slate-400">Uitgebreide informatie over UAV modellen en specificaties</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Zoeken naar UAV model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {uavTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Alle Typen' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* UAV Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-slate-400 py-8">Laden...</div>
            ) : filteredUavs.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-8">Geen UAV\'s gevonden</div>
            ) : (
              filteredUavs.map((uav) => (
                <div
                  key={uav.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{uav.model_name}</h3>
                    <p className="text-slate-400 text-sm mb-2">{uav.manufacturer}</p>
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {uav.type || 'Onbekend'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-6">
                    {uav.max_flight_time && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vluchtduur:</span>
                        <span className="text-white font-bold">{uav.max_flight_time} min</span>
                      </div>
                    )}
                    {uav.max_altitude && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Hoogte:</span>
                        <span className="text-white font-bold">{uav.max_altitude} m</span>
                      </div>
                    )}
                    {uav.max_distance && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Afstand:</span>
                        <span className="text-white font-bold">{uav.max_distance} m</span>
                      </div>
                    )}
                    {uav.weight && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gewicht:</span>
                        <span className="text-white font-bold">{uav.weight} g</span>
                      </div>
                    )}
                  </div>

                  {uav.compliance_certifications && uav.compliance_certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uav.compliance_certifications.slice(0, 3).map((cert, i) => (
                        <span key={i} className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
