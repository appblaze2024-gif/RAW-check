import React, { useState, useEffect } from 'react';
import { FiSearch, FiBook, FiAward } from 'react-icons/fi';
import Layout from '../../components/Layout';

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/systematiek/knowledge-base`);
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Fout bij laden knowledge base:', error);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(articles.map(a => a.category).filter(Boolean))];

  let filtered = articles.filter(article =>
    article.topic?.toLowerCase().includes(search.toLowerCase()) ||
    article.content?.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== 'all') {
    filtered = filtered.filter(article => article.category === category);
  }

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-900 text-green-200';
      case 'intermediate': return 'bg-yellow-900 text-yellow-200';
      case 'advanced': return 'bg-red-900 text-red-200';
      default: return 'bg-slate-700 text-slate-200';
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Knowledge Base</h1>
            <p className="text-slate-400">Gecontroleerde informatie over RAW Systematiek</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Zoeken naar artikelen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Alle Categorieën' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-slate-400 py-8">Laden...</div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-8">Geen artikelen gevonden</div>
            ) : (
              filtered.map((article) => (
                <div
                  key={article.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FiBook className="w-6 h-6 text-blue-400" />
                    {article.is_verified && (
                      <FiAward className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{article.topic}</h3>

                  <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
                    {article.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(article.difficulty_level)}`}>
                      {article.difficulty_level?.toUpperCase() || 'INTERMEDIATE'}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {new Date(article.created_at).toLocaleDateString('nl-NL')}
                    </span>
                  </div>

                  {article.keywords && article.keywords.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.keywords.slice(0, 2).map((keyword, i) => (
                        <span key={i} className="bg-slate-700 text-slate-200 px-2 py-1 rounded-full text-xs">
                          {keyword}
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
