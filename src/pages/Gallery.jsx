import React, { useState, useEffect } from 'react';
import { Image, X, ZoomIn } from 'lucide-react';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null); 
  const categories = ['Semua', 'Kegiatan', 'Fasilitas', 'Ekstrakurikuler', 'Prestasi'];
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/galleries`);
        const data = await response.json();
        setGalleries(data);
        setFilteredGalleries(data); 
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data galeri:", error);
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    if (category === 'Semua') {
      setFilteredGalleries(galleries);
    } else {
      const filtered = galleries.filter(item => item.category === category);
      setFilteredGalleries(filtered);
    }
  };

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen pb-20">
      
      {/* HEADER */}
      <section className="bg-secondary text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-xl text-slate-200">Merekam jejak langkah dan kenangan indah di Pondok Pesantren Al-Madani.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        
        {/* TOMBOL FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
                ${activeFilter === cat 
                  ? 'bg-primary text-white border-primary shadow-lg transform scale-105' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID GALERI */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className="bg-slate-200 h-64 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredGalleries.length > 0 ? (

          <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredGalleries.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                  <ZoomIn size={32} className="mb-2 opacity-80" />
                  <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                  <span className="text-xs bg-primary px-2 py-1 rounded mt-2">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <div className="text-center py-20 text-slate-400">
            <Image size={48} className="mx-auto mb-4 opacity-50"/>
            <p>Tidak ada foto ditemukan untuk kategori ini.</p>
          </div>
        )}
      </section>

      {/* MODAL ZOOM (POPUP) */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full max-h-screen">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-primary transition"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-sm opacity-80">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;