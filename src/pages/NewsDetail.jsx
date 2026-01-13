import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newsItem } = location.state || {};
  useEffect(() => {
    if (!newsItem) {
      navigate('/');
    }
  }, [newsItem, navigate]);

  if (!newsItem) return null;

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50 font-sans pb-20">
      
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center text-slate-600 hover:text-primary transition font-medium">
            <ArrowLeft size={20} className="mr-2" /> Kembali ke Beranda
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 mt-8">
       
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="h-[400px] w-full relative">
            <img 
              src={newsItem.image} 
              alt={newsItem.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                {newsItem.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                {newsItem.title}
              </h1>
            </div>
          </div>
          
          <div className="px-8 py-6 flex items-center gap-6 text-slate-500 text-sm border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary"/>
              {newsItem.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary"/>
              {newsItem.author}
            </div>
          </div>

         
          <div className="p-8 md:p-12 text-slate-800 leading-relaxed text-lg">
            <div 
              className="prose prose-lg max-w-none 
              prose-headings:text-secondary prose-a:text-primary 
              [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: newsItem.content }} 
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;