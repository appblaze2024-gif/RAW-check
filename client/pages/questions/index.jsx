import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [search, filter, questions]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`);
      const data = await res.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden vragen:', error);
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (filter !== 'all') {
      filtered = filtered.filter(q => q.status === filter);
    }

    if (search) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">RAW Vragen</h1>
              <p className="text-slate-400">Stel je vragen en help anderen</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition">
              <FiPlus />
              <span>Nieuwe Vraag</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Zoeken naar vragen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">Alle Statussen</option>
                <option value="open">Open</option>
                <option value="in_progress">In Behandeling</option>
                <option value="resolved">Opgelost</option>
                <option value="closed">Gesloten</option>
              </select>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-slate-400 py-8">Laden...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center text-slate-400 py-8">Geen vragen gevonden</div>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{question.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{question.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`font-bold ${getPriorityColor(question.priority)}`}>
                          {question.priority?.toUpperCase() || 'MEDIUM'}
                        </span>
                        <span className="text-slate-500">
                          {new Date(question.created_at).toLocaleDateString('nl-NL')}
                        </span>
                      </div>
                    </div>
                    <span className={`${getStatusColor(question.status)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {question.status?.toUpperCase().replace('_', ' ') || 'OPEN'}
                    </span>
                  </div>
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {question.tags.map((tag, i) => (
                        <span key={i} className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs">
                          {tag}
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
