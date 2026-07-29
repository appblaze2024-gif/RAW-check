import React, { useState, useEffect } from 'react';
import { FiDownload, FiPlus } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function Checklists() {
  const [checklists, setChecklists] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/systematiek/checklists`);
      const data = await res.json();
      setChecklists(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden checklists:', error);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(checklists.map(c => c.category).filter(Boolean))];

  const filtered = category === 'all'
    ? checklists
    : checklists.filter(c => c.category === category);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Checklists</h1>
              <p className="text-slate-400">Download en gebruik checklists voor RAW operaties</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition">
              <FiPlus />
              <span>Nieuwe Checklist</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Alle Categorieën' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Checklists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-slate-400 py-8">Laden...</div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-8">Geen checklists gevonden</div>
            ) : (
              filtered.map((checklist) => (
                <div
                  key={checklist.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition flex flex-col"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{checklist.name}</h3>

                  <p className="text-slate-400 text-sm mb-4 flex-grow">
                    {checklist.description}
                  </p>

                  {checklist.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {checklist.category}
                      </span>
                    </div>
                  )}

                  {checklist.items && (
                    <div className="mb-4 p-3 bg-slate-700 rounded">
                      <p className="text-sm text-slate-300 mb-2 font-bold">Aantal items:</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {Array.isArray(checklist.items) ? checklist.items.length : 0}
                      </p>
                    </div>
                  )}

                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition">
                    <FiDownload />
                    <span>Download</span>
                  </button>

                  {checklist.is_template && (
                    <div className="mt-2 text-center text-xs text-yellow-400">
                      Template beschikbaar
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
