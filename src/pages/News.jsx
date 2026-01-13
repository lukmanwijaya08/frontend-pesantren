import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // MENGAMBIL DATA DARI API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`);
        const data = await response.json();
        setNewsList(data);
        setFilteredNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // LOGIKA PENCARIAN
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    
    const filtered = newsList.filter(item => 
      item.title.toLowerCase().includes(keyword) || 
      item.category.toLowerCase().includes(keyword)
    );
    setFilteredNews(filtered);
  };

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen pb-20">
      
      {/* HEADER */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kabar Al-Madani</h1>
          <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Informasi terkini, prestasi santri, dan artikel inspiratif dari lingkungan pondok pesantren.
          </p>
          
          {/* FORM PENCARIAN */}
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Cari berita atau artikel..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-4 pl-12 pr-6 rounded-full text-slate-700 shadow-lg focus:outline-none focus:ring-4 focus:ring-accent/50 transition"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>
      </section>

      {/* LIST BERITA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white rounded-xl h-96 animate-pulse border border-slate-200">
                <div className="bg-slate-200 h-48 rounded-t-xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
                  <div className="h-6 bg-slate-200 w-3/4 rounded"></div>
                  <div className="h-4 bg-slate-200 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <div key={news.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {news.date}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {news.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary mb-3 leading-snug group-hover:text-primary transition line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {news.excerpt}
                  </p>
                  
                  <Link 
                    to="/news/read" 
                    state={{ newsItem: news }}
                    className="mt-auto inline-flex items-center justify-center w-full py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition group-hover:shadow-md"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">Tidak ditemukan</h3>
            <p className="text-slate-500">
              Maaf, tidak ada berita yang cocok dengan kata kunci "{searchTerm}".
            </p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Tampilkan Semua Berita
            </button>
          </div>
        )}
      </section>

    </div>
  );
};

export default News;