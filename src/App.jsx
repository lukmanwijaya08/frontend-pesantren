import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import Program from './pages/Program';
import NewsDetail from './pages/NewsDetail';
import Facilities from './pages/Facilities'; 

function App() {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`);
        const settings = await response.json();

        if (settings) {
          if (settings.site_name) {
            document.title = settings.site_name;
          }

          if (settings.site_favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.getElementsByTagName('head')[0].appendChild(link);
            }
            
            link.href = settings.site_favicon;
            link.type = "image/x-icon"; 
          }
        }
      } catch (error) {
        console.error("Gagal memuat identitas website:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/program" element={<Program />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news/read" element={<NewsDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;