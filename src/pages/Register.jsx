import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, FileText, Download, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Register = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const faqs = [
    { q: "Apakah menerima santri pindahan?", a: "Ya, kami menerima santri pindahan dengan syarat menyerahkan surat pindah." },
    { q: "Apakah wajib tinggal di asrama?", a: "Untuk tingkat SMP dan MA, seluruh santri diwajibkan tinggal di asrama." },
  ];

  return (
    <div className="animate-fade-in font-sans bg-slate-50 min-h-screen pb-20">
      
      {/* HEADER */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
            Pendaftaran Dibuka
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Penerimaan Santri Baru</h1>
          <p className="text-xl text-slate-100 max-w-2xl mx-auto">
            Bergabunglah bersama kami membentuk generasi Qur'ani.
          </p>
        </div>
      </section>

      {/* Rincian Biaya & Syarat*/}
      <section id="biaya" className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">
           <h2 className="text-3xl font-bold text-secondary text-center mb-8">Informasi & Rincian Biaya</h2>
           
           {loading ? (
             <p className="text-center">Memuat data...</p>
           ) : (
             <div 
                className="prose prose-lg max-w-none prose-headings:text-secondary prose-a:text-primary prose-table:border-collapse prose-td:border prose-td:p-2 prose-th:bg-slate-100 prose-th:p-2"
                dangerouslySetInnerHTML={{ __html: settings?.ppdb_content || "<p>Informasi belum diisi oleh Admin.</p>" }} 
             />
           )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-secondary text-center mb-8">Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-secondary hover:bg-slate-50 transition">
                <span className="flex items-center gap-3"><HelpCircle className="text-primary" size={20}/> {item.q}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && <div className="p-5 pt-0 text-slate-600 bg-slate-50 border-t border-slate-100">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Register;