import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [stats, setStats] = useState({
    questions: 0,
    uavs: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://raw-platform-api.onrender.com/api';

      const [questionsRes, uavRes, usersRes] = await Promise.all([
        fetch(`${apiUrl}/questions`).catch(() => ({ json: () => [] })),
        fetch(`${apiUrl}/uav`).catch(() => ({ json: () => [] })),
        fetch(`${apiUrl}/users`).catch(() => ({ json: () => [] })),
      ]);

      const questions = await questionsRes.json();
      const uavs = await uavRes.json();
      const users = await usersRes.json();

      setStats({
        questions: Array.isArray(questions) ? questions.length : 0,
        uavs: Array.isArray(uavs) ? uavs.length : 0,
        users: Array.isArray(users) ? users.length : 0,
      });
    } catch (error) {
      console.error('Fout bij het laden van statistieken:', error);
      setStats({ questions: 0, uavs: 0, users: 0 });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: '📋 RAW Vragen',
      description: 'Stel vragen over RAW systematiek en ontvang gedetailleerde antwoorden',
      link: '/questions'
    },
    {
      title: '🚁 UAV Database',
      description: 'Uitgebreide database met UAV specificaties en mogelijkheden',
      link: '/uav'
    },
    {
      title: '📚 Knowledge Base',
      description: 'Gecontroleerde kennisbank met RAW systematiek informatie',
      link: '/knowledge-base'
    },
    {
      title: '✅ Checklists',
      description: 'Downloadbare checklists voor RAW activiteiten',
      link: '/checklists'
    },
    {
      title: '⚖️ Compliance',
      description: 'Regelgeving en compliance informatie per jurisdictie',
      link: '/compliance'
    },
    {
      title: '💬 Community Forum',
      description: 'Discussie en uitwisseling met andere RAW professionals',
      link: '/forum'
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              RAW Systematiek Platform
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Uitgebreid kenniscentrum voor UAV en RAW vraagstukken
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-4xl font-bold text-blue-400">{stats.questions}</div>
                <div className="text-slate-300 mt-2">RAW Vragen</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-4xl font-bold text-green-400">{stats.uavs}</div>
                <div className="text-slate-300 mt-2">UAV Modellen</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-400">{stats.users}</div>
                <div className="text-slate-300 mt-2">Gebruikers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Onderdelen van het Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <a
                  key={index}
                  href={feature.link}
                  className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition cursor-pointer border border-slate-700"
                >
                  <h3 className="text-2xl mb-4">{feature.title.split(' ')[0]}</h3>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title.slice(2)}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Klaar om te beginnen?</h2>
            <p className="text-slate-300 mb-6">
              Sluit je aan bij onze community van RAW professionals en maak gebruik van het
              uitgebreide kenniscentrum
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Registreer Nu
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
