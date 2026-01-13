import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`);
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Gagal mengambil data footer:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 font-sans border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">Al-Madani</span> Boarding School
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Membentuk generasi Qur'ani yang berakhlak mulia, cerdas, dan siap bersaing di era global.
            </p>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-sm">{settings?.address || "Alamat belum diatur"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <span className="text-sm">{settings?.phone || "No. Telepon belum diatur"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary shrink-0" />
                <span className="text-sm">{settings?.email || "Email belum diatur"}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">Akses Cepat</h3>
            <ul className="space-y-3">
              {[
                { name: "Tentang Kami", link: "/about" },
                { name: "Program Pendidikan", link: "/program" },
                { name: "Pendaftaran (PPDB)", link: "/register" },
                { name: "Berita Terkini", link: "/news" },
                { name: "Galeri Kegiatan", link: "/gallery" },
                { name: "Hubungi Kami", link: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link} className="text-slate-300 hover:text-primary transition flex items-center gap-2">
                    <ArrowRight size={14} /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">Ikuti Kami</h3>
            <p className="text-slate-300 mb-6 text-sm">
              Dapatkan update kegiatan terbaru melalui media sosial kami.
            </p>
            <div className="flex gap-4">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary transition text-white">
                  <Facebook size={20} />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition text-white">
                  <Instagram size={20} />
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition text-white">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pondok Pesantren Al-Madani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;