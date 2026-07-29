import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiMessageSquare, FiEye } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forum-threads`);
      const data = await res.json();
      setThreads(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden forum threads:', error);
      setLoading(false);
    }
  };

  const filteredThreads = threads.filter(thread =>
    thread.title?.toLowerCase().includes(search.toLowerCase()) ||
    thread.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Community Forum</h1>
              <p className="text-slate-400">Discussie en uitwisseling met andere RAW professionals</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition">
              <FiPlus />
              <span>Nieuw Onderwerp</span>
            </button>
          </div>

          {/* Search */}
          <div className="mb-8 relative">
            <FiSearch className="absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Zoeken naar onderwerpen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Threads List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-slate-400 py-8">Laden...</div>
            ) : filteredThreads.length === 0 ? (
              <div className="text-center text-slate-400 py-8">Geen onderwerpen gevonden</div>
            ) : (
              filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {thread.pinned && (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            VASTGEZET
                          </span>
                        )}
                        {thread.category && (
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {thread.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{thread.title}</h3>
                      <p className="text-slate-400 line-clamp-2">{thread.content}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <div className="flex space-x-6">
                      <div className="flex items-center space-x-2">
                        <FiMessageSquare size={16} />
                        <span>{thread.replies_count || 0} antwoorden</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiEye size={16} />
                        <span>{thread.views || 0} weergaven</span>
                      </div>
                    </div>
                    <span>{new Date(thread.created_at).toLocaleDateString('nl-NL')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
