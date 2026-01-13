import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Gagal load settings:", err));

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Program', path: '/program' },
    { name: 'Fasilitas', path: '/facilities' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Berita', path: '/news' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
          {settings?.site_logo ? (
             <img src={settings.site_logo} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
             <span className={`font-bold text-2xl ${scrolled ? 'text-primary' : 'text-white'}`}>
                <span className="text-accent">Al-Madani</span>
             </span>
          )}
          
          {/* NAMA WEBSITE */}
          {settings?.site_logo && (
            <span className={scrolled ? 'text-secondary' : 'text-white shadow-black drop-shadow-md'}>
              {settings?.site_name || "Boarding School"}
            </span>
          )}
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.path} 
              className={`font-medium transition hover:text-accent ${
                scrolled ? 'text-slate-600' : 'text-white/90 hover:text-white drop-shadow-md'
              } ${location.pathname === link.path ? 'text-primary font-bold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/register" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            PPDB Online
          </Link>
        </div>

        {/* HAMBURGER MOBILE */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-secondary">
          {isOpen ? <X size={28} className={scrolled ? 'text-secondary' : 'text-white'} /> : <Menu size={28} className={scrolled ? 'text-secondary' : 'text-white'} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-slate-100 animate-fade-in-down">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.path} 
                className={`font-medium p-2 rounded hover:bg-slate-50 ${location.pathname === link.path ? 'text-primary bg-primary/5' : 'text-slate-600'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/register" className="bg-primary text-white text-center py-3 rounded-xl font-bold" onClick={() => setIsOpen(false)}>
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;