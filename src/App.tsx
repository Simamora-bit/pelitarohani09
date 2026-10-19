/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  Send, 
  MessageCircle, 
  ChevronRight,
  Menu,
  X,
  Search,
  Quote,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { askSpiritualAI, searchBibleVerse } from './services/geminiService';
import { SPIRITUAL_CONTENT, ContentItem } from './constants';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const searchEndRef = useRef<HTMLDivElement>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer('');
    const result = await askSpiritualAI(question);
    setAnswer(result);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults('');
    const result = await searchBibleVerse(searchQuery);
    setSearchResults(result);
    setIsSearching(false);
  };

  useEffect(() => {
    if (answer && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answer]);

  useEffect(() => {
    if (searchResults && searchEndRef.current) {
      searchEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]);

  const navItems = ['Home', 'Renungan', 'Ayat', 'Doa', 'Akhir Zaman'];

  const filteredContent = SPIRITUAL_CONTENT.filter(item => item.category === activeTab);

  const renderContent = () => {
    if (selectedItem) {
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <button 
            onClick={() => setSelectedItem(null)}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke {activeTab}
          </button>

          <article className="glass-card p-8 md:p-12 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              {activeTab === 'Renungan' && <BookOpen className="w-64 h-64" />}
              {activeTab === 'Doa' && <Heart className="w-64 h-64" />}
              {activeTab === 'Ayat' && <Quote className="w-64 h-64" />}
              {activeTab === 'Akhir Zaman' && <AlertTriangle className="w-64 h-64" />}
            </div>

            <div className="space-y-4 relative">
              <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">
                {selectedItem.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">{selectedItem.title}</h2>
              <p className="text-white/40 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" /> 5 Menit Membaca • Rey Simamora
              </p>
            </div>

            {selectedItem.verse && (
              <div className="bg-white/5 border-l-4 border-gold p-6 italic text-lg text-white/90 font-serif">
                "{selectedItem.verse}"
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                {selectedItem.content}
              </p>
              <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                <h4 className="text-gold font-bold uppercase tracking-widest text-sm">Penjelasan & Aplikasi</h4>
                <p className="text-white/60 leading-relaxed">
                  Pesan ini mengingatkan kita bahwa dalam setiap aspek kehidupan, Tuhan memiliki rencana yang indah. 
                  Mari kita terapkan nilai-nilai ini dalam interaksi kita sehari-hari, menunjukkan kasih dan kesetiaan 
                  sebagaimana Kristus telah menunjukkannya kepada kita.
                </p>
              </div>
            </div>
          </article>
        </motion.div>
      );
    }

    if (activeTab === 'Home') {
      return (
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="relative rounded-3xl overflow-hidden aspect-[21/9] flex items-center justify-center text-center p-6">
            <img 
              src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=2000" 
              alt="Spiritual Background"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative space-y-4"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-gold/80">Renungan Hari Ini</span>
              <h2 className="text-4xl md:text-5xl font-serif italic">Tuhan Selalu Menyertai Hidupmu</h2>
              <p className="text-white/60 max-w-lg mx-auto">"Kasih sejati tidak mencari keuntungan diri"</p>
            </motion.div>
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              icon={<BookOpen className="w-5 h-5" />}
              title="Renungan"
              content="Apapun yang terjadi, Tuhan tidak pernah meninggalkanmu. Tetap percaya dan berjalan dalam iman."
              onClick={() => setActiveTab('Renungan')}
              delay={0.1}
            />
            <Card 
              icon={<Quote className="w-5 h-5" />}
              title="Ayat Hari Ini"
              content="Mazmur 119:105 - 'Firman-Mu adalah pelita bagi kakiku dan terang bagi jalanku.'"
              highlight
              onClick={() => setActiveTab('Ayat')}
              delay={0.2}
            />
            <Card 
              icon={<Heart className="w-5 h-5" />}
              title="Doa"
              content="Tuhan, kuatkan aku hari ini dan tuntun langkahku sesuai kehendak-Mu. Amin."
              onClick={() => setActiveTab('Doa')}
              delay={0.3}
            />
            <Card 
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Akhir Zaman"
              content="Berjaga-jagalah dan tetap setia, karena waktu Tuhan semakin dekat."
              onClick={() => setActiveTab('Akhir Zaman')}
              delay={0.4}
            />
          </div>

          {/* Bible Search Section */}
          <section className="glass-card p-8 space-y-6 relative group">
            <div className="absolute top-0 left-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Search className="w-32 h-32" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <Search className="w-5 h-5" />
                <h3 className="text-xl font-bold">Cari Ayat Alkitab</h3>
              </div>
              <p className="text-white/60 text-sm">Cari ayat berdasarkan topik, kata kunci, atau referensi (misal: "kasih", "takut", "Yohanes 3:16").</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Masukkan kata kunci atau topik..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-gold text-dark-bg rounded-lg font-bold hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {searchResults && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/5 rounded-xl p-6 border-l-4 border-gold-light"
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold-light/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-gold-light" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-white/90 leading-relaxed whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                        {searchResults.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('[') ? 'font-bold text-gold' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>
                      <div ref={searchEndRef} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* AI Section */}
          <section className="glass-card p-8 space-y-6 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="w-32 h-32" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-xl font-bold">Tanya AI Rohani</h3>
              </div>
              <p className="text-white/60 text-sm">Butuh bimbingan atau ayat Alkitab? Tanyakan apa saja kepada AI kami.</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Tanya tentang Alkitab atau pergumulan hidup..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button 
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-gold text-dark-bg rounded-lg font-bold hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {answer && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/5 rounded-xl p-6 border-l-4 border-gold"
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{answer}</p>
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-gold">{activeTab}</h2>
          <p className="text-white/60">Kumpulan {activeTab.toLowerCase()} pilihan untuk menguatkan imanmu.</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="glass-card p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:border-gold/30 transition-all group"
            >
              <div className="w-full md:w-48 h-32 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                {activeTab === 'Renungan' && <BookOpen className="w-12 h-12 text-gold/40 group-hover:text-gold" />}
                {activeTab === 'Doa' && <Heart className="w-12 h-12 text-gold/40 group-hover:text-gold" />}
                {activeTab === 'Ayat' && <Quote className="w-12 h-12 text-gold/40 group-hover:text-gold" />}
                {activeTab === 'Akhir Zaman' && <AlertTriangle className="w-12 h-12 text-gold/40 group-hover:text-gold" />}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-white/60 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest pt-2">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActiveTab('Home');
              setSelectedItem(null);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg shadow-gold/20">
              <Sparkles className="w-5 h-5 text-dark-bg" />
            </div>
            <h1 className="text-xl font-bold tracking-tight gold-gradient">Pelita Rohani</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setSelectedItem(null);
                }}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  activeTab === item ? 'text-gold' : 'text-white/60'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button 
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark-bg pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item);
                    setSelectedItem(null);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-serif text-left border-b border-white/5 pb-4 ${
                    activeTab === item ? 'text-gold' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {renderContent()}
      </main>

      <footer className="border-t border-white/5 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 gold-gradient font-serif text-2xl">
            <Sparkles className="w-6 h-6 text-gold" />
            Pelita Rohani
          </div>
          <p className="text-white/40 text-sm">©2026 - Rey Simamora | Membawa Terang dalam Kegelapan</p>
          <div className="flex justify-center gap-6 pt-4">
            <a href="#" className="text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-widest">Terms</a>
            <a href="#" className="text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-widest">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/6285191447806" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-dark-bg px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Hubungi Kami
        </span>
      </a>
    </div>
  );
}

function Card({ icon, title, content, highlight = false, delay = 0, onClick }: { 
  icon: React.ReactNode, 
  title: string, 
  content: string, 
  highlight?: boolean,
  delay?: number,
  onClick?: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onClick}
      className={`glass-card p-6 space-y-4 hover:border-gold/30 transition-colors group cursor-pointer ${highlight ? 'ring-1 ring-gold/20' : ''}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${highlight ? 'bg-gold text-dark-bg' : 'bg-white/5 text-gold group-hover:bg-gold group-hover:text-dark-bg'}`}>
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className={`text-lg font-bold ${highlight ? 'text-gold' : 'text-white'}`}>{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{content}</p>
      </div>
      <button className="flex items-center gap-1 text-xs font-bold text-gold uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Buka Halaman <ChevronRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
}
