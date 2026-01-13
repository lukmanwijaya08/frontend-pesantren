import React, { useState, useEffect } from 'react';
import { MapPin, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/facilities`);
        const data = await response.json();
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data fasilitas:", error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen pb-20">
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fasilitas Pesantren</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Menunjang kenyamanan dan keberhasilan santri dalam menuntut ilmu dengan sarana prasarana yang memadai.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-primary transition font-medium">
            <ArrowLeft size={18} className="mr-2" /> Kembali ke Beranda
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200">
                <div className="h-48 bg-slate-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : facilities.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-8">
            {facilities.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-3 flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    {item.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description || "Fasilitas penunjang kegiatan santri."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (

          <div className="text-center py-20 text-slate-500">
            <Info size={48} className="mx-auto mb-4 opacity-50"/>
            <p>Belum ada data fasilitas yang ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facilities;