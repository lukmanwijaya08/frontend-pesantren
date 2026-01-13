import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, Users, BookOpen, UserCheck } from 'lucide-react';

const About = () => {
  const [settings, setSettings] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/teachers`)
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Memuat data...</div>;

  return (
    <div className="animate-fade-in">
      
      {/* HEADER */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1920&q=80" 
            alt="Pondok Pesantren" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl max-w-2xl mx-auto font-light">Mengenal lebih dekat Pondok Pesantren Al-Madani.</p>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
             {settings?.about_image ? (
                <img 
                  src={settings.about_image} 
                  alt="Pimpinan Pondok" 
                  className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                />
             ) : (
                <div className="h-[500px] bg-slate-200 rounded-2xl flex items-center justify-center">Foto belum diupload</div>
             )}
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-secondary flex items-center gap-3">
              <BookOpen className="text-primary" /> Sejarah Singkat
            </h2>
            <div 
              className="prose prose-lg text-slate-600"
              dangerouslySetInnerHTML={{ __html: settings?.history || "<p>Sejarah belum diisi.</p>" }}
            />
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-2">Visi & Misi</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-primary text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Visi</h3>
              <div 
                className="text-lg font-serif italic text-slate-700"
                dangerouslySetInnerHTML={{ __html: settings?.vision || "Visi belum diisi." }}
              />
            </div>

            {/* Misi */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-accent">
              <h3 className="text-2xl font-bold text-secondary mb-6 text-center">Misi</h3>
              <div 
                className="prose text-slate-700"
                dangerouslySetInnerHTML={{ __html: settings?.mission || "Misi belum diisi." }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR GURU */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary text-center mb-12 flex items-center justify-center gap-3">
            <UserCheck className="text-primary" /> Dewan Asatidz & Ustadzah
          </h2>
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 group text-center">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-secondary mb-1">{teacher.name}</h3>
                    <p className="text-primary text-sm font-medium">{teacher.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">Belum ada data guru.</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default About;