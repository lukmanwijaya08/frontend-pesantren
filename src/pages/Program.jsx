import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [resProg, resExtra] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_BASE_URL}/programs`),
                fetch(`${import.meta.env.VITE_API_BASE_URL}/extracurriculars`)
            ]);
            setPrograms(await resProg.json());
            setExtras(await resExtra.json());
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen pb-20">
      
      {/* Header Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Pendidikan</h1>
          <p className="text-xl text-slate-100 max-w-2xl mx-auto">
            Memadukan kurikulum nasional dan kepesantrenan.
          </p>
        </div>
      </section>

      {/* Program Akademik */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? <p className="text-center">Memuat...</p> : programs.length > 0 ? (
          <div className="space-y-20">
            {programs.map((program, index) => (
              <div key={program.id} className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                  <img src={program.image} alt={program.title} className="w-full h-80 md:h-[400px] object-cover rounded-3xl shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-secondary">{program.title}</h2>
                  <div className="prose text-slate-600" dangerouslySetInnerHTML={{ __html: program.description }} />
                  <Link to="/register" className="inline-flex items-center bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition">
                      Daftar Sekarang <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-center">Belum ada data program.</p>}
      </section>

      {/* SECTION EKSTRAKURIKULER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <span className="text-primary font-bold uppercase tracking-wider text-sm">Pengembangan Diri</span>
                <h2 className="text-3xl font-bold text-secondary mt-2">Kegiatan Ekstrakurikuler</h2>
                <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
            </div>

            {extras.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {extras.map((extra) => (
                        <div key={extra.id} className="group text-center">
                            <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 shadow-md border border-slate-100">
                                <img src={extra.image} alt={extra.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                            </div>
                            <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition">{extra.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-slate-400">Data ekstrakurikuler belum ditambahkan.</p>
            )}
        </div>
      </section>

    </div>
  );
};

export default Program;