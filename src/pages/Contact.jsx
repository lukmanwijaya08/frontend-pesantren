import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, Globe } from 'lucide-react';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State Form
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });

  // FETCH DATA PENGATURAN 
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Terima kasih ${formData.name}, pesan Anda telah kami terima.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <section className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-slate-100 max-w-2xl mx-auto">
            Silakan berkunjung atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* INFO KONTAK DINAMIS */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-secondary mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Alamat</h3>
                    <p className="text-slate-600">
                      {loading ? "Memuat..." : settings?.address || "Alamat belum diatur di Admin Panel"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Telepon / WhatsApp</h3>
                    <p className="text-slate-600">
                      {loading ? "Memuat..." : settings?.phone || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary"><Mail size={24} /></div>
                  <div>
                    <h3 className="font-bold text-secondary">Email</h3>
                    <p className="text-slate-600">
                      {loading ? "Memuat..." : settings?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* SOSIAL MEDIA DINAMIS */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="font-bold text-secondary mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {settings?.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition"><Facebook size={20}/></a>
                  )}
                  {settings?.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-pink-600 hover:text-white transition"><Instagram size={20}/></a>
                  )}
                  {settings?.youtube && (
                    <a href={settings.youtube} target="_blank" rel="noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-red-600 hover:text-white transition"><Youtube size={20}/></a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FORM PESAN */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary">
            <h2 className="text-2xl font-bold text-secondary mb-2">Kirim Pesan</h2>
            <p className="text-slate-500 mb-6">Punya pertanyaan? Isi formulir di bawah ini.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-primary transition flex items-center justify-center gap-2">
                  <Send size={18} /> Kirim Pesan
                </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;