import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [slides, setSlides] = useState([]); 
  const [latestNews, setLatestNews] = useState([]);
  const [extras, setExtras] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const [resSlides, resNews, resExtras, resTesti, resSettings] = await Promise.all([
           fetch(`${baseUrl}/sliders`),
           fetch(`${baseUrl}/posts`),
           fetch(`${baseUrl}/extracurriculars`),
           fetch(`${baseUrl}/testimonials`),
           fetch(`${baseUrl}/settings`)
        ]);

        const dataSlides = await resSlides.json();
        if (dataSlides.length > 0) {
            setSlides(dataSlides);
        } else {
            setSlides([
                { 
                  id: 1, 
                  image: "https://images.unsplash.com/photo-1563968743333-044cef800494?auto=format&fit=crop&w=1200&q=80", 
                  title: "Selamat Datang", 
                  description: "Website Resmi Pondok Pesantren Al-Madani" 
                }
            ]);
        }

        const dataNews = await resNews.json();
        const dataExtras = await resExtras.json();
        const dataTesti = await resTesti.json();
        const dataSettings = await resSettings.json();

        setLatestNews(dataNews.slice(0, 3));
        setExtras(dataExtras);
        setTestimonials(dataTesti);
        setSettings(dataSettings);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  const prevSlide = () => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);

  return (
    <div className="animate-fade-in font-sans">
      
      {/* HERO SLIDER  */}
      <section className="relative h-[600px] overflow-hidden bg-slate-900">
        {slides.map((slide, index) => (
          <div key={slide.id || index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
             <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in-up">
                    {slide.title}
                </h1>
                {slide.description && (
                    <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md animate-fade-in-up delay-100">
                        {slide.description}
                    </p>
                )}

                <Link to="/register" className="bg-accent hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold transition shadow-lg animate-bounce mt-4">
                    Daftar Sekarang
                </Link>
             </div>
          </div>
        ))}
        
        {slides.length > 1 && (
            <>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition">
                    <ChevronLeft size={32} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-sm transition">
                    <ChevronRight size={32} />
                </button>
            </>
        )}
      </section>

      {/* SECTION NEWS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary mb-8">Kabar Pesantren</h2>
            {latestNews.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                {latestNews.map(news => (
                    <div key={news.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition">
                        <img src={news.image} className="h-48 w-full object-cover" alt={news.title} />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                <Calendar size={12} /> {news.date}
                            </div>
                            <h3 className="font-bold text-lg mb-2 line-clamp-2 text-secondary">{news.title}</h3>
                            <Link to="/news/read" state={{newsItem: news}} className="text-primary text-sm font-bold hover:underline">Baca Selengkapnya &rarr;</Link>
                        </div>
                    </div>
                ))}
                </div>
            ) : <p className="text-center text-slate-400">Belum ada berita.</p>}
        </div>
      </section>

      {/* FASILITAS HIGHLIGHT */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
             <img 
                src={settings?.home_facility_image || "https://images.unsplash.com/photo-1598195822336-1e9634d580e0?auto=format&fit=crop&w=800&q=80"} 
                className="rounded-2xl shadow-2xl border-4 border-white/20 w-full h-64 md:h-80 object-cover" 
                alt="Fasilitas Pondok" 
             />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
                {settings?.home_facility_title || "Fasilitas Pondok Modern"}
            </h2>
            <p className="text-slate-200 text-lg leading-relaxed">
                {settings?.home_facility_desc || "Kami menyediakan lingkungan belajar yang kondusif..."}
            </p>
            <Link to="/facilities" className="inline-block bg-accent hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-medium transition shadow-lg">
              Lihat Fasilitas Selengkapnya
            </Link>
          </div>
        </div>
      </section>

      {/* EKSTRAKURIKULER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary">Ekstrakurikuler</h2>
            <p className="text-slate-500 mt-2">Mengasah Bakat dan Minat Santri</p>
          </div>
          
          {extras.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {extras.slice(0, 4).map((ekstra) => (
                <div key={ekstra.id} className="relative group overflow-hidden rounded-xl cursor-pointer aspect-square">
                    <img 
                        src={ekstra.image} 
                        alt={ekstra.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white text-lg font-bold">{ekstra.name}</h3>
                    </div>
                </div>
                ))}
            </div>
          ) : (
             <p className="text-center text-slate-400">Belum ada data ekskul.</p>
          )}
        </div>
      </section>

      {/* SECTION TESTIMONI */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-16">Apa Kata Alumni?</h2>
          {testimonials.length > 0 ? (
             <div className="grid md:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testi) => (
                <div key={testi.id} className="bg-white p-8 rounded-2xl shadow-sm relative mt-6 border border-slate-100">
                    <div className="absolute -top-6 left-8 bg-primary text-white p-3 rounded-full"><Quote size={24} fill="currentColor" /></div>
                    <p className="text-slate-600 italic mb-6 pt-4 text-sm md:text-base">"{testi.content}"</p>
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                        {testi.image ? (
                            <img src={testi.image} className="w-10 h-10 rounded-full object-cover" alt={testi.name} />
                        ) : (
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-secondary">{testi.name.charAt(0)}</div>
                        )}
                        <div>
                            <h4 className="font-bold text-secondary text-sm">{testi.name}</h4>
                            <span className="text-xs text-slate-500 block">{testi.role}</span>
                        </div>
                    </div>
                </div>
                ))}
             </div>
          ) : (
             <p className="text-center text-slate-400">Belum ada testimoni.</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;