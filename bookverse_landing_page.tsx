import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MapPin, 
  MessageCircle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown, 
  Facebook,
  Share,
  Copy,
  Check,
  Twitter,
  Clock,
  BookOpen,
  Library,
  History,
  HelpCircle,
  Quote,
  ChevronDown,
  ChevronUp,
  Heart
} from 'lucide-react';

const pageData = {
  name: "BookVerse Foundation",
  phone: "6289529605601",
  address: "Palangka Raya, Kalimantan Tengah",
  title: "Membangun Generasi Literat Melalui Buku",
  description: "BookVerse adalah ruang baca komunitas dan organisasi nirlaba yang berdedikasi menyediakan akses buku gratis serta ruang yang nyaman untuk semua kalangan.",
  profileImg: "./bookverse-logo.png", 
  heroImg: "./bookverse-bg.jpg",
  links: {
    instagram: "https://www.instagram.com/solusilokal.id/",
    tiktok: "https://www.tiktok.com/@solusilokal.id",
    maps: "https://www.google.com/maps/place/Palangkaraya,+Kota+Palangka+Raya,+Kalimantan+Tengah/", 
    facebook: "https://facebook.com/", 
  },
  about: "Kami percaya bahwa setiap halaman yang dibaca membuka jendela ke dunia baru. BookVerse hadir sebagai jembatan antara buku dan mereka yang haus akan pengetahuan. Misi kami adalah menghapus batasan akses literasi bagi anak-anak dan masyarakat umum.",
  timeline: [
    { year: "2018", event: "Berdiri di garasi kecil dengan 100 buku donasi pertama kami." },
    { year: "2020", event: "Membuka perpustakaan komunitas pertama di Jakarta Selatan." },
    { year: "2023", event: "Menjangkau lebih dari 5,000 pembaca aktif dan membuka 3 cabang baru." }
  ],
  catalog: [
    { title: "Fiksi & Sastra", author: "1,200+ Koleksi", img: "./catalog-fiksi.webp" },
    { title: "Buku Anak", author: "800+ Koleksi", img: "./catalog-anak.webp" },
    { title: "Sains & Edukasi", author: "950+ Koleksi", img: "./catalog-sains.webp" },
    { title: "Pengembangan Diri", author: "600+ Koleksi", img: "./catalog-pengembangan-diri.webp" },
  ],
  locationHighlights: [
    { time: "09:00 - 20:00", place: "Buka Setiap Hari" },
    { time: "Gratis", place: "Akses WiFi & Baca" },
    { time: "Nyaman", place: "Ruang Ber-AC" }
  ],
  faqs: [
    { q: "Apakah meminjam buku dikenakan biaya?", a: "Tidak. Seluruh layanan peminjaman buku di BookVerse 100% gratis untuk anggota terdaftar." },
    { q: "Bagaimana cara menjadi anggota?", a: "Anda cukup datang ke lokasi kami dengan membawa KTP/Kartu Pelajar dan mengisi formulir pendaftaran singkat." },
    { q: "Apakah saya bisa mendonasikan buku?", a: "Tentu sangat bisa! Kami menerima donasi buku layak baca (fiksi, non-fiksi, buku anak). Anda bisa mengisikan form di bawah atau langsung datang ke lokasi." }
  ],
  testimonials: [
    { name: "Andi Pratama", rating: 5, text: "Tempat yang luar biasa! Suasananya sangat tenang untuk membaca, dan koleksi buku fiksi-nya sangat lengkap." },
    { name: "Nisa Salsabila", rating: 5, text: "Anak saya sangat senang diajak ke sini setiap akhir pekan. Ada banyak buku cerita bergambar yang mendidik." },
    { name: "Riko Wijaya", rating: 5, text: "Saya sering menggunakan fasilitas ini untuk mengerjakan tugas kuliah. WiFinya cepat dan suasananya mendukung." }
  ]
};

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const scrollToForm = () => {
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const role = formData.get('role');
    const message = formData.get('message');
    const waUrl = `https://wa.me/${pageData.phone}?text=Halo%20Admin%20${pageData.name},%20saya%20${name}.%20Saya%20tertarik%20terkait%20*${role}*.%20Pesan:%20${message}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: pageData.name,
      text: pageData.title,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body {
          background-color: #F8FAFC;
          color: #0F172A;
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <main className="w-full max-w-[480px] mx-auto relative shadow-2xl bg-[#F8FAFC] min-h-screen overflow-hidden pb-32">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[100dvh] flex flex-col justify-end pb-12 px-6 bg-[#041628]">
          
          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all shadow-sm"
          >
            <Share size={20} />
          </button>

          <div className="absolute inset-0 z-0">
            <img 
              src={pageData.heroImg} 
              alt={pageData.name} 
              className="w-full h-full object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041628] via-[#041628]/80 to-[#041628]/30"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-32">
            <div className="w-28 h-28 rounded-full p-2 bg-white shadow-2xl border-2 border-[#d88c38]/60 mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src={pageData.profileImg} 
                alt="Profile" 
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-4xl font-extrabold text-[#d88c38] mb-3 leading-tight tracking-tight drop-shadow-md">
              {pageData.name}
            </h1>
            <p className="text-[#93c5fd] font-light text-sm leading-relaxed mb-6 max-w-[95%]">
              {pageData.title}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-3">
              <a 
                href={pageData.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <Instagram size={18} /> Instagram
              </a>
              <a 
                href={pageData.links.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg> TikTok
              </a>
            </div>
            
            <div className="w-full max-w-sm mb-8">
               <a 
                href={pageData.links.maps}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white shadow-sm text-sm font-medium"
              >
                <MapPin size={18} /> Lokasi Kami
              </a>
            </div>

            <button 
              onClick={scrollToForm}
              className="group relative flex items-center justify-center gap-3 w-full max-w-sm py-4 bg-[#d88c38] text-white rounded-2xl font-bold text-[13px] uppercase tracking-wider hover:bg-[#c27b2c] transition-all shadow-lg"
            >
              Mari Berkolaborasi
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* TENTANG KAMI */}
        <section className="py-12 px-6 bg-white border-b border-slate-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <Library className="text-[#d88c38]" size={24} />
              <h2 className="text-2xl font-extrabold text-[#041628] tracking-tight">Tentang Kami</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {pageData.description}
            </p>
            <div className="mt-4 p-5 bg-[#f0f9ff] rounded-2xl border border-[#bae6fd]">
              <p className="text-[#0369a1] text-[13px] leading-relaxed italic font-medium">
                "{pageData.about}"
              </p>
            </div>
          </div>
        </section>

        {/* HISTORY / SEJARAH */}
        <section className="py-10 px-6 bg-slate-50 border-b border-slate-200">
          <div className="mb-8 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <History className="text-[#d88c38]" size={22} />
              <h2 className="text-2xl font-extrabold text-[#041628] tracking-tight">Perjalanan Kami</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Langkah kecil yang kami ambil untuk literasi.</p>
          </div>

          <div className="relative border-l-2 border-[#bae6fd] ml-4 flex flex-col gap-6">
            {pageData.timeline.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0284c7] border-4 border-slate-50"></div>
                <h3 className="font-bold text-[#041628] text-lg mb-1">{item.year}</h3>
                <p className="text-slate-600 text-[13px] leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KATALOG BUKU */}
        <section className="pt-12 pb-8 bg-white">
          <div className="px-6 mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#d88c38]" size={22} />
              <h2 className="text-2xl font-extrabold text-[#041628] tracking-tight">Katalog Koleksi</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Eksplorasi ragam ilmu dan cerita di perpustakaan kami.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
            {pageData.catalog.map((book, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(pageData.catalog.map(c => c.img), idx)}
                className="snap-center shrink-0 w-[200px] flex flex-col gap-3 cursor-pointer group"
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md border border-slate-200">
                  <img 
                    src={book.img} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-slate-800 text-[15px] leading-tight">{book.title}</h3>
                  <p className="text-slate-500 text-xs mt-1">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFO LOKASI HIGHLIGHT */}
        <section className="py-8 px-6 bg-[#041628] shadow-inner">
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-md mx-auto">
            {pageData.locationHighlights.map((loc, idx) => (
              <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs text-white font-medium shadow-sm">
                <Clock size={14} className="text-[#d88c38]" />
                {loc.time}: {loc.place}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-12 px-6 bg-white border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-[#d88c38]" size={22} />
              <h2 className="text-2xl font-extrabold text-[#041628] tracking-tight">Tanya Jawab</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Informasi seputar layanan dan fasilitas BookVerse.</p>
          </div>

          <div className="flex flex-col gap-3">
            {pageData.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-[14px] text-slate-800"
                >
                  {faq.q}
                  {openFaq === idx ? (
                    <ChevronUp size={18} className="text-[#d88c38] min-w-[18px]" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400 min-w-[18px]" />
                  )}
                </button>
                <div 
                  className={`px-4 pb-4 text-[13px] text-slate-600 leading-relaxed transition-all ${
                    openFaq === idx ? 'block' : 'hidden'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONI */}
        <section className="py-10 px-6 bg-slate-50 border-b border-slate-200">
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Quote className="text-[#d88c38]" size={22} />
              <h2 className="text-2xl font-extrabold text-[#041628] tracking-tight">Kisah Pembaca</h2>
            </div>
            <p className="text-slate-500 text-xs ml-8">Apa kata mereka tentang pengalaman membaca di BookVerse.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {pageData.testimonials.map((testi, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Heart key={i} size={14} className="fill-[#d88c38] text-[#d88c38]" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">"{testi.text}"</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#041628] flex items-center justify-center text-[#d88c38] font-bold text-sm">
                    {testi.name.charAt(0)}
                  </div>
                  <span className="text-[13px] font-bold text-slate-800">{testi.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / CTA FORM */}
        <section id="contact-form" className="py-12 px-6 bg-white">
          <div className="bg-[#041628] rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#092a4a] rounded-full pointer-events-none opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#092a4a] rounded-full pointer-events-none opacity-50"></div>
            
            <div className="relative z-10 mb-8 text-center">
              <h2 className="text-2xl font-extrabold text-[#d88c38] mb-2">Mari Bergabung</h2>
              <p className="text-[#93c5fd] text-sm leading-relaxed">Hubungi kami untuk mendaftar anggota, menjadi relawan, atau donasi buku via WhatsApp.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Nama Lengkap"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#d88c38] focus:bg-white/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <select 
                  name="role" 
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#d88c38] focus:bg-[#041628] transition-all appearance-none"
                >
                  <option value="" className="text-slate-800">Pilih Keperluan...</option>
                  <option value="Daftar Anggota Pembaca" className="text-slate-800">Daftar Anggota Pembaca</option>
                  <option value="Donasi Buku" className="text-slate-800">Donasi Buku</option>
                  <option value="Menjadi Relawan" className="text-slate-800">Menjadi Relawan (Volunteer)</option>
                  <option value="Pertanyaan Umum" className="text-slate-800">Lainnya / Pertanyaan Umum</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <textarea 
                  name="message" 
                  rows="3"
                  required
                  placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#d88c38] focus:bg-white/20 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full mt-2 bg-[#d88c38] text-white font-bold text-sm tracking-wide py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#c27b2c] transition-colors shadow-lg border border-[#d88c38]/50"
              >
                Kirim via WhatsApp
                <MessageCircle size={18} className="fill-current" />
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-12 text-center flex flex-col items-center justify-center mx-6 mt-4">
          <div className="w-full h-px bg-slate-200 mb-8"></div>
          
          <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mb-4 p-2 overflow-hidden">
            <img src={pageData.profileImg} alt="Footer Logo" className="w-full h-full object-contain" />
          </div>
          
          <div className="text-slate-500 text-xs flex flex-col gap-1 items-center">
            <span className="font-extrabold text-slate-700 text-sm">{pageData.name}</span>
            <span className="max-w-[250px]">{pageData.address}</span>
          </div>

          <p className="text-slate-400 text-[10px] mt-8">
            © {new Date().getFullYear()} {pageData.name}. All rights reserved.
          </p>
          
          <a 
            href="https://www.solusilokal.id" 
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 text-[10px] mt-2 tracking-wide font-medium hover:text-slate-700 transition-colors"
          >
            powered by solusilokal.id
          </a>
        </footer>

        {/* STICKY CTA */}
        <div 
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[432px] z-40 transition-all duration-500 ease-out ${
            showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
          }`}
        >
          <button 
            onClick={scrollToForm}
            className="w-full flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl text-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            <span className="font-bold text-sm tracking-wide text-[#041628]">Mari Berkolaborasi</span>
            <div className="bg-[#d88c38] text-white p-2 rounded-xl">
              <MessageCircle size={18} className="fill-none stroke-current stroke-2" />
            </div>
          </button>
        </div>

      </main>

      {/* LIGHTBOX MODAL */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {lightbox.images.length > 1 && (
            <button 
              className="absolute left-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="w-full max-w-4xl max-h-[100dvh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.images[lightbox.currentIndex]} 
              alt="Lightbox View" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {lightbox.images.length > 1 && (
            <button 
              className="absolute right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50 border border-white/20"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          )}
          
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
              {lightbox.currentIndex + 1} / {lightbox.images.length}
            </div>
          )}
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center transition-opacity"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white sm:rounded-3xl rounded-t-3xl p-6 relative overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center items-center mb-6 relative">
              <h3 className="text-slate-900 font-bold text-[15px]">Bagikan {pageData.name}</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute right-0 p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-8 flex flex-col items-center justify-center mb-8 shadow-sm">
              <div className="w-[72px] h-[72px] bg-white rounded-full border border-slate-200 mb-4 p-2 flex items-center justify-center overflow-hidden shadow-sm">
                <img src={pageData.profileImg} alt="Profile" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-slate-900 font-bold text-lg text-center tracking-tight">@{pageData.name.toLowerCase().replace(/\s/g, '')}</h4>
              <p className="text-slate-500 text-sm mt-1 text-center font-medium opacity-90">Bagikan semangat literasi ini!</p>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar items-start px-1 mb-4">
              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={copyToClipboard}
                  className="w-[60px] h-[60px] rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-all shadow-sm border border-slate-200"
                >
                  {copied ? <Check size={26} className="text-green-600" /> : <Copy size={26} />}
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">
                  {copied ? 'Tersalin' : 'Salin Tautan'}
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pageData.name)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Twitter size={26} />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">X</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <Facebook size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">Facebook</span>
              </div>

              <div className="flex flex-col items-center gap-2 min-w-[76px]">
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(pageData.title + ' ' + window.location.href)}`, '_blank')}
                  className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm"
                >
                  <MessageCircle size={26} className="fill-current" />
                </button>
                <span className="text-[11px] font-semibold text-slate-600 text-center">WhatsApp</span>
              </div>
            </div>
            
            <div className="w-full h-px bg-slate-200 mb-4"></div>
            
            <div className="flex flex-col items-center text-center">
              <h5 className="text-slate-900 font-bold text-[13px] mb-1">Ikuti Kami</h5>
              <p className="text-slate-500 text-[11px] mb-4">Follow media sosial kami untuk update aktivitas literasi.</p>
              <a href={pageData.links.instagram} target="_blank" rel="noreferrer" className="w-full py-3 bg-[#041628] text-[#d88c38] text-sm font-bold rounded-xl hover:bg-[#092a4a] transition-colors">
                Kunjungi Instagram
              </a>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}