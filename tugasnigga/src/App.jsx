import { BackgroundPaths } from './components/ui/background-paths';
import DisplayCards from './components/ui/display-cards'; 
import { ContainerScroll } from './components/ui/container-scroll-animation';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Auth from './Auth'; 
import { 
  Search, MapPin, Home, DollarSign, Wifi, Wind, 
  ShieldCheck, Zap, Menu, X, ArrowRight, Star, 
  Coffee, ChevronDown, CheckCircle2
} from 'lucide-react';

const allProperties = [
  { id: 1, title: "The Vertex Penthouse", location: "Senopati, South Jakarta", price: "Rp 67.000.000", period: "/month", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Apartment", rating: 4.9 },
  { id: 2, title: "Lumina Studio Suites", location: "Kuningan, South Jakarta", price: "Rp 3.550.000", period: "/month", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Premium Kost", rating: 4.8 },
  { id: 3, title: "Kost Ananda Putra", location: "Mlati, Kab. Sleman", price: "Rp 1.700.000", period: "/month", image: "https://bicarasekarang.wordpress.com/wp-content/uploads/2018/09/70518-cover2b2.jpg", type: "Boarding House", rating: 5.0 },
  { id: 4, title: "Tembalang Executive", location: "Tembalang, Semarang", price: "Rp 2.500.000", period: "/month", image: "data:image/jpeg;base64,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", type: "Premium Kost", rating: 4.9 },
  { id: 5, title: "Banyumanik Suites", location: "Banyumanik, Semarang", price: "Rp 3.200.000", period: "/month", image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2021/03/29/195d3bcb-8713-4c11-a8af-f995e77001fd-1617016516124-fa7d3b9cd836de6692da91b1dcf675c9.jpg", type: "Apartment", rating: 4.7 },
  { id: 6, title: "Candisari Lofts", location: "Candisari, Semarang", price: "Rp 2.800.000", period: "/month", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Loft", rating: 4.8 },
  { id: 7, title: "Seturan Co-Living", location: "Seturan, Yogyakarta", price: "Rp 1.900.000", period: "/month", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Premium Kost", rating: 4.6 },
  { id: 8, title: "Jakal Premium Hub", location: "Kaliurang, Yogyakarta", price: "Rp 2.200.000", period: "/month", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Studio", rating: 4.9 },
  { id: 9, title: "Pondok Indah Mansions", location: "Pondok Indah, Jakarta", price: "Rp 2.500.000", period: "/month", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", type: "Apartment", rating: 4.7 }
];

const NavigationBar = ({ isScrolled, navigate, pathname, mobileMenuOpen, setMobileMenuOpen }) => {
  const scrollToAbout = () => {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => { document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-[1000] transition-all duration-300 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate('/'); window.scrollTo(0,0); }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center box-glow">
            <Home className="w-5 h-5 text-[#0A1128]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Kos<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Mate</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <span onClick={() => navigate('/explore')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">Explore</span>
          <span onClick={scrollToAbout} className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">About</span>
          <button onClick={() => navigate('/auth')} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#070B19] font-bold text-sm hover:scale-105 transition-transform duration-300 box-glow-hover">
            Sign In / Sign Up
          </button>
        </div>
        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t-0 flex flex-col p-6 gap-4">
          <span onClick={() => { setMobileMenuOpen(false); navigate('/explore'); }} className="text-slate-300 font-medium py-2">Explore</span>
          <span onClick={scrollToAbout} className="text-slate-300 font-medium py-2">About</span>
          <button onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }} className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#070B19] font-bold text-sm">
            Sign In / Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

const Explore = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen, navigate, pathname }) => {
  return (
    <div className="min-h-screen bg-[#070B19] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden pt-10">
      <NavigationBar isScrolled={isScrolled} navigate={navigate} pathname={pathname} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Discover Your Perfect <br />
                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 py-2 inline-block">
                  Sanctuary
                </span>
              </h1>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Scroll to explore our complete catalog of verified, premium living spaces designed for your comfort.</p>
            </>
          }
        >
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Interior"
              className="mx-auto w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
               <div className="glass-panel px-8 py-6 rounded-2xl flex flex-col items-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-teal-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">9 Premium Spaces Found</h3>
                  <p className="text-slate-300 text-sm">Showing results across Indonesia</p>
               </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      <section className="px-6 pb-32 max-w-7xl mx-auto -mt-32 md:-mt-64 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProperties.map((property) => (
            <div key={property.id} className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-teal-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] flex flex-col cursor-pointer bg-[#0A1128]">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/80 border border-white/10">{property.type}</div>
                <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 bg-black/80 border border-white/10">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{property.rating}
                </div>
                <img src={property.image} alt={property.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-90"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors mb-2">{property.title}</h3>
                <p className="text-slate-400 text-sm flex items-center gap-1 mb-6"><MapPin className="w-4 h-4 text-slate-500" />{property.location}</p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                      <span className="text-2xl font-bold text-white">{property.price}</span>
                      <span className="text-sm text-slate-500">{property.period}</span>
                    </div>
                    <button className="p-2.5 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-[#070B19] transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseOverlay = "before:absolute before:inset-0 before:rounded-3xl before:bg-[#070B19]/60 grayscale-[100%] hover:before:opacity-0 hover:grayscale-0 before:transition-opacity before:duration-700 transition-all duration-500 ease-out";
  const stackedCardsData = allProperties.slice(0, 6).map((property, index) => {
    const classes = [
      `hover:-translate-y-10 hover:z-[100] ${baseOverlay}`,
      `translate-x-8 md:translate-x-12 translate-y-6 md:translate-y-10 hover:-translate-y-2 md:hover:-translate-y-1 hover:z-[100] ${baseOverlay}`,
      `translate-x-16 md:translate-x-24 translate-y-12 md:translate-y-20 hover:translate-y-4 md:hover:translate-y-10 hover:z-[100] ${baseOverlay}`,
      `translate-x-24 md:translate-x-36 translate-y-20 md:translate-y-32 hover:translate-y-12 md:hover:translate-y-20 hover:z-[100] ${baseOverlay}`,
      `translate-x-32 md:translate-x-48 translate-y-28 md:translate-y-40 hover:translate-y-20 md:hover:translate-y-32 hover:z-[100] ${baseOverlay}`,
      `translate-x-40 md:translate-x-60 translate-y-36 md:translate-y-52 hover:translate-y-28 md:hover:translate-y-40 hover:z-[100] transition-all duration-500 ease-out`
    ];
    return { property, className: `[grid-area:stack] ${classes[index]}` };
  });

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#070B19] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
            .text-glow { text-shadow: 0 0 20px rgba(45, 212, 191, 0.5); }
            .box-glow { box-shadow: 0 0 25px rgba(45, 212, 191, 0.2); }
            .box-glow-hover:hover { box-shadow: 0 0 35px rgba(45, 212, 191, 0.4); }
          `}} />

          <NavigationBar isScrolled={isScrolled} navigate={navigate} pathname={pathname} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

          <section className="relative pb-10">
            <BackgroundPaths title="Elevate Your Living">
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                Premium kosts and apartments curated for the modern student and ambitious professional. Experience luxury without the hassle.
              </p>

              <div className="glass-panel rounded-2xl p-3 md:p-4 max-w-4xl mx-auto shadow-2xl border border-white/10 flex flex-col md:flex-row gap-3 transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex-1 flex items-center bg-[#0A1128]/50 rounded-xl px-4 py-3 md:py-4 border border-white/5 group hover:border-teal-500/30 transition-colors">
                  <MapPin className="text-teal-400 w-5 h-5 mr-3" />
                  <div className="flex flex-col text-left w-full">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Location</label>
                    <input type="text" placeholder="Where do you want to live?" className="bg-transparent border-none outline-none text-white placeholder-slate-400 text-sm w-full font-medium" />
                  </div>
                </div>

                <div className="flex-1 flex items-center bg-[#0A1128]/50 rounded-xl px-4 py-3 md:py-4 border border-white/5 group hover:border-teal-500/30 transition-colors cursor-pointer relative">
                  <Home className="text-teal-400 w-5 h-5 mr-3" />
                  <div className="flex flex-col text-left w-full">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Property Type</label>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-300 w-full">
                      <span>Kost, Apartment...</span><ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center bg-[#0A1128]/50 rounded-xl px-4 py-3 md:py-4 border border-white/5 group hover:border-teal-500/30 transition-colors cursor-pointer relative">
                  <DollarSign className="text-teal-400 w-5 h-5 mr-3" />
                  <div className="flex flex-col text-left w-full">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Price Range</label>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-300 w-full">
                      <span>Any Price</span><ChevronDown className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-[#070B19] rounded-xl px-8 py-4 flex items-center justify-center gap-2 font-bold hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] transition-all duration-300 md:w-auto w-full">
                  <Search className="w-5 h-5" /><span>Search</span>
                </button>
              </div>
            </BackgroundPaths>
          </section>

          <section className="py-10 border-y border-white/5 bg-[#0A1128]/30">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="mt-2 text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by 10,000+ Students & Professionals from</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="text-xl font-black font-serif">UI / UX ACADEMY</div>
                <div className="text-xl font-bold tracking-tighter">TECH<span className="font-light">CORP</span></div>
                <div className="text-xl font-extrabold italic">Global<span className="text-teal-400">U</span></div>
              </div>
            </div>
          </section>

          <section className="pt-20 px-6 max-w-7xl mx-auto relative z-50">
            <div className="flex justify-between items-end relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-0">Trending Premium Spaces</h2>
                <p className="text-slate-400 mt-2">Handpicked properties offering the ultimate living experience.</p>
              </div>
              <button onClick={() => navigate('/explore')} className="hidden md:flex items-center gap-2 text-teal-400 font-semibold hover:text-cyan-300 transition-colors group cursor-pointer">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* LOGIC CHANGE: Massive negative margin to pull the cards aggressively up to the text */}
            <div className="-mt-[40px] md:-mt-[6px] -ml-[200px]">
              <DisplayCards cards={stackedCardsData} />
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <button onClick={() => navigate('/explore')} className="inline-flex items-center gap-2 text-teal-400 font-semibold cursor-pointer">
                View All Properties <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* LOGIC CHANGE: Pulled the top padding out of this section entirely so it clicks up to the bottom of the card stack */}
          <section id="about-section" className="pt-8 pb-24 px-6 max-w-7xl mx-auto relative z-20">
            <div className="glass-panel rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 border border-white/5 bg-gradient-to-br from-[#0A1128] to-[#070B19]">
              
              <div className="flex-1 space-y-6">
                <span className="inline-block py-1 px-3 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold tracking-wider uppercase border border-teal-500/20">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Built for the modern <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">urban explorer.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  KosMate was born out of frustration with the traditional rental market. We believe finding your next sanctuary shouldn't involve sketchy listings, hidden fees, or endless back-and-forth messaging.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Whether you're a student at Undip looking for a quiet study space, or a professional in Jakarta needing a premium suite, we personally verify every single property so you can book with absolute confidence.
                </p>
                
                <div className="flex gap-8 pt-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-white">500+</span>
                    <span className="text-xs text-teal-400 uppercase tracking-wider mt-1 font-bold">Verified Spaces</span>
                  </div>
                  <div className="w-px bg-white/10 mx-2"></div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-white">10k+</span>
                    <span className="text-xs text-teal-400 uppercase tracking-wider mt-1 font-bold">Happy Members</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(45,212,191,0.15)] group">
                <img 
                  src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Inside a KosMate Premium property" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-panel backdrop-blur-md bg-white/5 border-white/10 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-2 border-[#0A1128]" src="https://i.pravatar.cc/100?img=1" alt="User" />
                      <img className="w-10 h-10 rounded-full border-2 border-[#0A1128]" src="https://i.pravatar.cc/100?img=2" alt="User" />
                      <img className="w-10 h-10 rounded-full border-2 border-[#0A1128]" src="https://i.pravatar.cc/100?img=3" alt="User" />
                      <div className="w-10 h-10 rounded-full border-2 border-[#0A1128] bg-teal-500 flex items-center justify-center text-xs font-bold text-[#070B19]">+99</div>
                    </div>
                    <span className="text-sm font-semibold text-white">Join the community</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#0A1128]/50 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[100px] z-0"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The KosMate Advantage</h2>
                <p className="text-slate-400">We've redesigned the rental experience from the ground up to provide unparalleled peace of mind and luxury.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center mb-6 border-teal-500/30 group-hover:border-teal-400 transition-colors duration-300 relative">
                    <div className="absolute inset-0 bg-teal-500/10 rounded-2xl group-hover:bg-teal-500/20 transition-colors blur-md"></div>
                    <ShieldCheck className="w-10 h-10 text-teal-400 relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Verified Luxury</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Every listing undergoes a rigorous 50-point inspection. What you see in our high-res galleries is exactly what you get. No surprises.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center mb-6 border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300 relative">
                    <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl group-hover:bg-cyan-500/20 transition-colors blur-md"></div>
                    <Zap className="w-10 h-10 text-cyan-400 relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Seamless Booking</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Schedule tours, sign digital contracts, and make secure payments all within our platform in minutes, not days.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-panel flex items-center justify-center mb-6 border-teal-500/30 group-hover:border-teal-400 transition-colors duration-300 relative">
                    <div className="absolute inset-0 bg-teal-500/10 rounded-2xl group-hover:bg-teal-500/20 transition-colors blur-md"></div>
                    <Search className="w-10 h-10 text-teal-400 relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Zero Hidden Fees</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Transparent pricing from day one. Wi-Fi, maintenance, and essential utilities are often bundled into one clear monthly rate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-[#050812] border-t border-white/5 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center">
                    <Home className="w-5 h-5 text-[#0A1128]" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Kos<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Mate</span>
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Redefining urban living for the modern generation. Discover, book, and experience premium spaces effortlessly.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-slate-300 hover:text-teal-400">
                     <span className="font-bold">in</span>
                  </div>
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-slate-300 hover:text-teal-400">
                     <span className="font-bold">ig</span>
                  </div>
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-slate-300 hover:text-teal-400">
                     <span className="font-bold">x</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide">Explore</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Jakarta Selatan</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Jakarta Pusat</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Premium Kosts</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Luxury Apartments</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Careers</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Support Center</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">Terms & Privacy</a></li>
                </ul>
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <h4 className="text-white font-bold mb-6 tracking-wide">Stay Updated</h4>
                <p className="text-slate-400 text-sm mb-4">Get exclusive early access to new premium listings and offers.</p>
                <div className="flex bg-[#0A1128] rounded-xl p-1 border border-white/10 focus-within:border-teal-500/50 transition-colors">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-transparent border-none outline-none text-white text-sm px-4 py-3 w-full"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-[#070B19] px-4 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
              </div>

            </div>
            
            <div className="max-w-7xl mx-auto text-center pt-8 border-t border-white/10">
              <p className="text-slate-500 text-xs">
                &copy; {new Date().getFullYear()} KosMate Technologies. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      } />

      <Route path="/explore" element={<Explore isScrolled={isScrolled} pathname={pathname} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} navigate={navigate} />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;