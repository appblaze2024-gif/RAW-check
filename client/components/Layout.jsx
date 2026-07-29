import React, { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Vragen', href: '/questions' },
    { label: 'UAV Database', href: '/uav' },
    { label: 'Knowledge Base', href: '/knowledge-base' },
    { label: 'Checklists', href: '/checklists' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'Forum', href: '/forum' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚁</span>
            <span className="text-xl font-bold text-white">RAW Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="text-slate-400 space-y-2">
                <li><Link href="/questions" className="hover:text-white">Vragen</Link></li>
                <li><Link href="/uav" className="hover:text-white">UAV Database</Link></li>
                <li><Link href="/knowledge-base" className="hover:text-white">Knowledge Base</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Hulpmiddelen</h3>
              <ul className="text-slate-400 space-y-2">
                <li><Link href="/checklists" className="hover:text-white">Checklists</Link></li>
                <li><Link href="/compliance" className="hover:text-white">Compliance</Link></li>
                <li><Link href="/reports" className="hover:text-white">Rapporten</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Community</h3>
              <ul className="text-slate-400 space-y-2">
                <li><Link href="/forum" className="hover:text-white">Forum</Link></li>
                <li><Link href="/users" className="hover:text-white">Gebruikers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Info</h3>
              <ul className="text-slate-400 space-y-2">
                <li><a href="#" className="hover:text-white">Over Ons</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400 text-center">
              &copy; 2024 RAW Systematiek Platform. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
