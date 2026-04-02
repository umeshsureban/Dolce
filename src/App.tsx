import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Refs for scroll animations
  const whyDolceRef = useRef<HTMLDivElement>(null);
  const weddingsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const venuesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Logo opening animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimating(true);
      setTimeout(() => {
        setLoading(false);
        setShowContent(true);
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    if (!showContent) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showContent]);

  // Parallax effect for hero
  useEffect(() => {
    if (!showContent) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroImage = document.querySelector('.hero-parallax') as HTMLElement;
      if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showContent]);

  return (
    <>
      {/* Logo Opening Animation */}
      {loading && (
        <div className={`loading-screen transition-all duration-800 ${logoAnimating ? 'animate-logo-slide-up' : ''}`}>
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-white/40 animate-pulse"></div>
              </div>
              {/* Logo with white background */}
              <div className="relative z-10 bg-white rounded-lg px-8 py-6 shadow-2xl animate-logo-fade-in">
                <img 
                  src="/dolce-logo.png" 
                  alt="Dolce Hotels and Resorts" 
                  className="h-20 w-auto"
                />
              </div>
            </div>
            <p className="text-white/90 font-sans text-sm tracking-[0.3em] uppercase mt-10 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
              Weddings & Events
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div className="animate-fade-in">
          {/* Top Navigation */}
          <nav className="bg-white/70 backdrop-blur-md shadow-[0_40px_40px_rgba(132,0,26,0.06)] fixed top-0 z-50 w-full max-w-none">
            <div className="flex justify-between items-center px-8 py-6">
              <img
                alt="Dolce Hotels and Resorts"
                className="h-12 w-auto object-contain"
                src="/dolce-logo.png"
              />
              {/* Desktop links */}
              <div className="hidden md:flex gap-10 items-center">
                <a className="nav-link active font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#84001a] border-b-2 border-[#84001a] pb-1 transition-colors duration-300" href="#weddings">WEDDINGS</a>
                <a className="nav-link font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040] hover:text-[#ab162b] transition-colors duration-300" href="#events">EVENTS</a>
                <a className="nav-link font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040] hover:text-[#ab162b] transition-colors duration-300" href="#venues">VENUES</a>
                <a className="nav-link font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040] hover:text-[#ab162b] transition-colors duration-300" href="#dining">DINING</a>
                <a className="nav-link font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040] hover:text-[#ab162b] transition-colors duration-300" href="#contact">CONTACT</a>
              </div>
              {/* Desktop CTA */}
              <button className="btn-elegant hidden md:block bg-[#ab162b] text-white font-sans font-bold tracking-widest uppercase px-8 py-3 text-sm active:scale-95 duration-200">
                BOOK NOW
              </button>
              {/* Hamburger button — mobile only */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-[#84001a] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-[#84001a] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-[#84001a] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
              </button>
            </div>
            {/* Mobile dropdown menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col px-8 pb-6 gap-5 border-t border-[#e2bebd]/40 pt-4">
                <a className="font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#84001a]" href="#weddings" onClick={() => setMenuOpen(false)}>WEDDINGS</a>
                <a className="font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040]" href="#events" onClick={() => setMenuOpen(false)}>EVENTS</a>
                <a className="font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040]" href="#venues" onClick={() => setMenuOpen(false)}>VENUES</a>
                <a className="font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040]" href="#dining" onClick={() => setMenuOpen(false)}>DINING</a>
                <a className="font-sans font-bold tracking-[0.15em] uppercase text-sm text-[#5a4040]" href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
                <button className="btn-elegant bg-[#ab162b] text-white font-sans font-bold tracking-widest uppercase px-8 py-3 text-sm w-full mt-2">BOOK NOW</button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
              <img 
                className="hero-parallax w-full h-full object-cover scale-110" 
                alt="luxury wedding reception hall at sunset" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLap1XL-4X1m_sXBs9qt4uzGC3lfdvq_MGVPHHAh3oJOkaP8-eX5Zp9xEQ2CkGMD8WPo-y3pyZiPboh3a6vr6q0mNABr4qfu-RiVvt-ZcjxMRiV2seJEaHov62dBGlhEiW-1-cWOI6ix8bGXdFX639tleVCljRFiP2af5wux0QXYkc3R03U0VYvTHC2XsmOjrEfPlNbZnrdDnkFq_2oW8zQ2RfMxShXK6Tpxx6F5Ponvz0iXj2UUa6kNLCiMtRUIfsnfkF-deqQmQ"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4">
              <div className="w-64 h-64 doodle-circle flex items-center justify-center mb-[-40px] relative animate-scale-in">
                <span className="text-white text-3xl font-black tracking-tighter uppercase">Dolce</span>
              </div>
              <h1 className="debby-script text-white text-7xl md:text-9xl lowercase mb-4 relative z-20 mix-blend-plus-lighter animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                the art of inspiration
              </h1>
              <p className="font-sans font-bold tracking-[0.3em] text-white uppercase text-xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                WEDDINGS & EVENTS
              </p>
              <div className="flex flex-col md:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
                <button className="btn-elegant bg-[#ab162b] text-white font-sans font-bold tracking-widest uppercase px-10 py-4 text-sm hover:bg-[#84001a] transition-all">
                  PLAN YOUR WEDDING
                </button>
                <button className="btn-elegant border-2 border-white text-white font-sans font-bold tracking-widest uppercase px-10 py-4 text-sm hover:bg-white hover:text-[#84001a] transition-all">
                  EXPLORE VENUES
                </button>
              </div>
            </div>
          </section>

          {/* Brand Intro Strip */}
          <section className="bg-[#84001a] py-4 flex items-center justify-center gap-8 overflow-hidden">
            <div className="sketched-line flex-1 max-w-[200px]"></div>
            <p className="debby-script text-white text-3xl lowercase italic reveal">
              where every detail becomes a work of art
            </p>
            <div className="sketched-line flex-1 max-w-[200px]"></div>
          </section>

          {/* Why Dolce */}
          <section ref={whyDolceRef} className="py-24 px-8 bg-[#fbf9fc]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center reveal stagger-1">
                <span className="material-symbols-outlined text-[#84001a] text-5xl mb-6">workspace_premium</span>
                <h3 className="font-sans font-bold tracking-widest text-[#1b1b1e] uppercase text-sm mb-4">CURATED EXPERIENCES</h3>
                <p className="text-[#5a4040] font-body leading-relaxed">Artfully tailored journeys that reflect your unique vision, from intimate elopements to grand celebrations.</p>
              </div>
              <div className="text-center reveal stagger-2">
                <span className="material-symbols-outlined text-[#84001a] text-5xl mb-6">castle</span>
                <h3 className="font-sans font-bold tracking-widest text-[#1b1b1e] uppercase text-sm mb-4">INSPIRING VENUES</h3>
                <p className="text-[#5a4040] font-body leading-relaxed">Historic chateaus and modern retreats designed to ignite creativity and celebrate monumental moments.</p>
              </div>
              <div className="text-center reveal stagger-3">
                <span className="material-symbols-outlined text-[#84001a] text-5xl mb-6">restaurant</span>
                <h3 className="font-sans font-bold tracking-widest text-[#1b1b1e] uppercase text-sm mb-4">ELEVATED DINING</h3>
                <p className="text-[#5a4040] font-body leading-relaxed">Exquisite culinary artistry crafted by world-class chefs using the finest local and seasonal ingredients.</p>
              </div>
            </div>
          </section>

          {/* Weddings Section */}
          <section id="weddings" ref={weddingsRef} className="flex flex-col md:flex-row bg-white overflow-hidden">
            <div className="w-full md:w-1/2 relative min-h-[600px] img-zoom">
              <img 
                className="w-full h-full object-cover" 
                alt="bridal couple in vineyard garden" 
                src="/wedding.jpeg"
              />
              <div className="absolute top-10 right-10 w-48 h-48 doodle-circle opacity-60 animate-float"></div>
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-start">
              <span className="font-sans font-bold tracking-widest text-[#84001a] uppercase text-xs mb-4 reveal">CELEBRATE WITH US</span>
              <h2 className="debby-script text-[#84001a] text-7xl lowercase mb-6 reveal stagger-1">your inspired day</h2>
              <p className="font-body text-[#5a4040] text-lg leading-relaxed mb-10 max-w-md reveal stagger-2">
                At Dolce, we believe a wedding is more than an event; it's a masterpiece in the making. Our dedicated artisans work tirelessly to ensure every brushstroke of your celebration is perfect.
              </p>
              <button className="btn-elegant bg-[#ab162b] text-white font-sans font-bold tracking-widest uppercase px-10 py-4 text-sm hover:bg-[#84001a] transition-all reveal stagger-3">
                EXPLORE WEDDING PACKAGES
              </button>
            </div>
          </section>

          {/* Gallery Strip */}
          <section ref={galleryRef} className="py-20 bg-[#f5f3f6]">
            <div className="flex overflow-x-auto gap-8 px-8 pb-8 no-scrollbar scroll-smooth gallery-scroll">
              <div className="flex-none w-80 group reveal-scale stagger-1">
                <div className="w-80 h-80 kaleidoscope-mask overflow-hidden relative mb-4">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="elegant table setting" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3gAL6ff7QJZI7UGRoO6hR_KA7r_dqoajw1Sl50jBx54jSPD5qgd0NeMsSAT55PuNQdNEtfonfJKpCTkbblfo6QBpGQqDDzBQPJKBazWd79k7kGoeNcEo5XWTwG46crn9qDZXuxseNO5T-dg9DUojKCVbVxPmiy4J2iWXaPeP1BArilHK8yzCg_CG8bptP22Chn2hS4EM6vGkGQgeI8SiO1miPefZzO_IhNYTYAduR6bolhOugPxsUEodgwJeZz4sIWgtq_nVYMvg"
                  />
                </div>
                <p className="font-sans font-bold tracking-widest text-center uppercase text-xs text-[#5a4040]">THE CHATEAU GARDENS</p>
              </div>
              <div className="flex-none w-80 group reveal-scale stagger-2">
                <div className="w-80 h-80 kaleidoscope-mask overflow-hidden relative mb-4">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="floral arrangement" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLZKJJe5oxmpQzo8Ecc8bhURdKVvkhLyJcSkvETOPlmKee2bFA9xOqQHFa4XGwRv5W9srDZjMOUnRIHJHQVltRzEWBgVgqeaUizUe2EV6MfNYgaiojLeNQHxX3PFrfEvPWxXIHpPhiLyai7D-v9UQn7HpfZv38Ogr9D_OdLtmaHhUQmC9_uu9bJtJ_nsH-m50LM5s4oPkPuAeQhsnBCEyALIR5j9QUllKxHXuFOY_HTz0XSpFworuWQrJyQxJOdhMnT6sunldpZgM"
                  />
                </div>
                <p className="font-sans font-bold tracking-widest text-center uppercase text-xs text-[#5a4040]">ARTISAN FLORALS</p>
              </div>
              <div className="flex-none w-80 group reveal-scale stagger-3">
                <div className="w-80 h-80 kaleidoscope-mask overflow-hidden relative mb-4">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="grand ballroom" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT4vJnTNHBZJL2JQNxVjMYTOqaypNZAMTB6jZYQOlw8A54vHlJz3TB2N1A-2bZ3ZRTgmWVsGNotJCEnZTe_0aDYPQdTSHJyma9OIcWg_0f-7Y-i0gn08NYSL5Yc4L375ZGum0eBXUzgcKsxGGf0bZuX8yK86aymXXmjvwQ7iMxm55kPKLuoVd8kjpYn-NNKP7BJtD9tlbSs0wL_M0q5oLD-b9qBrro6yeDZX1hF89Kb46EEvJAtV1Ivd6w4eSTqlr9gG4TLz5dxTo"
                  />
                </div>
                <p className="font-sans font-bold tracking-widest text-center uppercase text-xs text-[#5a4040]">GRAND BALLROOMS</p>
              </div>
              <div className="flex-none w-80 group reveal-scale stagger-4">
                <div className="w-80 h-80 kaleidoscope-mask overflow-hidden relative mb-4">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="hors d'oeuvres" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCJLVKHdf4J47-oBlmLOaqezRKMcOM0r4KJQbYkrBV_aOwHO0vF9aF1O1m0AtfMk--vJDZIK5EV6MPZXL6fLKucx53wtfZuXX7kPkyOeaL5UQdU98FwL3ePyrIezHLlbVRIlsIlHqGK8iTFHJUz7jIoQqjZINSahFkjT4NV8abaa0GquEYSG2sUIiwMm3uw7yCsErSrWgSi4jowMzf3xH8Skvex2zWQxzor0ayOBmTxynf7L0Cs0aJyfwDeEsghfgT_TJxdJosiMo"
                  />
                </div>
                <p className="font-sans font-bold tracking-widest text-center uppercase text-xs text-[#5a4040]">CULINARY ARTISTRY</p>
              </div>
              <div className="flex-none w-80 group reveal-scale stagger-5">
                <div className="w-80 h-80 kaleidoscope-mask overflow-hidden relative mb-4">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="outdoor lounge" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBskTz_Nr0i4ngfTithxQEz0PXqI1q_eXoIjzaVXl5tEZ6E84qMqIGV51v3rcFqWvenya_GNJvxCg6_zspzt0_hczhY83OcSrkGXIVDJHgFN2ZHkKse2acJjfRppSR4d5xkqKZyVj3Nl6Llxk7n7KFtjzRVguT9xTp7W1b5inmA62Te9QQrKR-3hIXfhJEKeKAa2iRdht8An-2YUnI5viuo5J6ORpPZSq254BOEqkiDz6TNGaCWhj-owJneUVlgSmqAWWW_aOqOCmg"
                  />
                </div>
                <p className="font-sans font-bold tracking-widest text-center uppercase text-xs text-[#5a4040]">AL FRESCO LOUNGES</p>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section id="events" ref={eventsRef} className="flex flex-col md:flex-row-reverse bg-white overflow-hidden">
            <div className="w-full md:w-1/2 relative min-h-[600px] img-zoom">
              <img 
                className="w-full h-full object-cover" 
                alt="modern tech conference stage" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAolJLB0AHNFhIg-J7Vn-fDiG60e5sCZlyI_CEnfZhlCbeCMqc29T9BVS5Mq1MSFrMsNVNnRC8WbPeuLV43YGHy5hkKrHaEANDdS2-CJwuSquO7c1ikjOAbDxhuLe0zV8nFdk90xF9j6UxsE_B0zC7ZzwQSub0SPwbN9I-T9Gn2BpDNPMy7PLEVJ-UGgJWS7W9rF4wz2aFuoKLxOK_q9JGt6GtT178RDt6MYt2WqoU2Zm7pMIhaMYvd54mSwqDOcqeaG8YbacchM38"
              />
              <div className="absolute bottom-10 left-10 w-48 h-48 doodle-circle opacity-60 animate-float"></div>
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-start">
              <span className="font-sans font-bold tracking-widest text-[#84001a] uppercase text-xs mb-4 reveal">CORPORATE EVENTS</span>
              <h2 className="debby-script text-[#84001a] text-7xl lowercase mb-6 reveal stagger-1">inspire discovery</h2>
              <p className="font-body text-[#5a4040] text-lg leading-relaxed mb-10 max-w-md reveal stagger-2">
                Fuel innovation in environments built for breakthroughs. Our corporate spaces blend high-tech capabilities with high-touch hospitality to turn every meeting into a milestone.
              </p>
              <button className="btn-elegant bg-[#ab162b] text-white font-sans font-bold tracking-widest uppercase px-10 py-4 text-sm hover:bg-[#84001a] transition-all reveal stagger-3">
                PLAN YOUR EVENT
              </button>
            </div>
          </section>

          {/* Testimonial Section */}
          <section ref={testimonialRef} className="py-32 px-4 bg-[#f5f3f6] text-center flex flex-col items-center">
            <div className="sketched-line w-32 mb-12 bg-white"></div>
            <blockquote className="max-w-4xl">
              <h2 className="debby-script text-[#84001a] text-6xl md:text-8xl lowercase leading-tight reveal">
                "inspiration is worth sharing"
              </h2>
              <cite className="mt-8 block font-sans font-bold tracking-[0.2em] text-[#1b1b1e] uppercase text-sm reveal stagger-2">
                — THE DOLCE PHILOSOPHY —
              </cite>
            </blockquote>
            <div className="sketched-line w-32 mt-12 bg-white"></div>
          </section>

          {/* Venue Showcase - WITH USER PROVIDED IMAGES */}
          <section id="venues" ref={venuesRef} className="py-24 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-sans font-bold tracking-[0.2em] text-center uppercase text-xl mb-16 text-[#1b1b1e] reveal">
                OUR ICONIC VENUES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Venue 1 - User Image 1 */}
                <div className="group relative aspect-[4/5] overflow-hidden bg-zinc-100 card-lift reveal-scale stagger-1">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Sheraton Parsippany Hotel aerial view" 
                    src="/venue1.jpg"
                  />
                  <div className="absolute inset-0 bg-[#84001a]/0 group-hover:bg-[#84001a]/80 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100">
                    <h3 className="font-sans font-bold tracking-widest text-white uppercase text-xl mb-2">Sheraton Parsippany</h3>
                    <p className="text-white/80 font-body text-sm mb-6">A stunning castle-like venue in New Jersey, perfect for grand celebrations.</p>
                    <button className="border border-white text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#84001a] transition-colors">VIEW VENUE</button>
                  </div>
                </div>
                {/* Venue 2 - User Image 2 */}
                <div className="group relative aspect-[4/5] overflow-hidden bg-zinc-100 card-lift reveal-scale stagger-2">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Sheraton Hotel aerial view with surrounding landscape" 
                    src="/venue2.jpg"
                  />
                  <div className="absolute inset-0 bg-[#84001a]/0 group-hover:bg-[#84001a]/80 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100">
                    <h3 className="font-sans font-bold tracking-widest text-white uppercase text-xl mb-2">Sheraton Grand</h3>
                    <p className="text-white/80 font-body text-sm mb-6">An iconic destination surrounded by beautiful landscapes and modern amenities.</p>
                    <button className="border border-white text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#84001a] transition-colors">VIEW VENUE</button>
                  </div>
                </div>
                {/* Venue 3 - User Image 3 */}
                <div className="group relative aspect-[4/5] overflow-hidden bg-zinc-100 card-lift reveal-scale stagger-3">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Sheraton Hotel aerial view with parking and grounds" 
                    src="/venue3.jpg"
                  />
                  <div className="absolute inset-0 bg-[#84001a]/0 group-hover:bg-[#84001a]/80 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100">
                    <h3 className="font-sans font-bold tracking-widest text-white uppercase text-xl mb-2">Sheraton Premiere</h3>
                    <p className="text-white/80 font-body text-sm mb-6">A contemporary venue with expansive grounds for unforgettable events.</p>
                    <button className="border border-white text-white px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#84001a] transition-colors">VIEW VENUE</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact" ref={contactRef} className="bg-[#84001a] py-24 px-8 flex flex-col items-center">
            <div className="max-w-3xl w-full text-center mb-16">
              <h2 className="debby-script text-white text-7xl lowercase mb-6 reveal">let's create something inspired</h2>
              <div className="sketched-line w-24 mx-auto bg-white opacity-50 reveal stagger-1"></div>
            </div>
            <form className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col reveal stagger-1">
                <label className="font-sans font-bold tracking-widest text-white uppercase text-[10px] mb-2">FULL NAME</label>
                <input 
                  className="input-elegant text-white font-body placeholder:text-white/30 pb-2" 
                  placeholder="Your name" 
                  type="text"
                />
              </div>
              <div className="flex flex-col reveal stagger-2">
                <label className="font-sans font-bold tracking-widest text-white uppercase text-[10px] mb-2">EMAIL ADDRESS</label>
                <input 
                  className="input-elegant text-white font-body placeholder:text-white/30 pb-2" 
                  placeholder="email@address.com" 
                  type="email"
                />
              </div>
              <div className="flex flex-col reveal stagger-3">
                <label className="font-sans font-bold tracking-widest text-white uppercase text-[10px] mb-2">EVENT TYPE</label>
                <select className="input-elegant text-white font-body appearance-none pb-2">
                  <option className="text-black">Wedding</option>
                  <option className="text-black">Corporate Event</option>
                  <option className="text-black">Social Gala</option>
                </select>
              </div>
              <div className="flex flex-col reveal stagger-4">
                <label className="font-sans font-bold tracking-widest text-white uppercase text-[10px] mb-2">PREFERRED DATE</label>
                <input 
                  className="input-elegant text-white font-body pb-2" 
                  type="date"
                />
              </div>
              <div className="md:col-span-2 flex flex-col reveal stagger-5">
                <label className="font-sans font-bold tracking-widest text-white uppercase text-[10px] mb-2">YOUR VISION</label>
                <textarea 
                  className="input-elegant text-white font-body placeholder:text-white/30 pb-2" 
                  placeholder="Tell us about your event..." 
                  rows={4}
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-center mt-6 reveal stagger-6">
                <button className="btn-elegant bg-white text-[#84001a] font-sans font-bold tracking-widest uppercase px-16 py-4 text-sm hover:bg-[#f5f3f6] transition-all">
                  SEND YOUR VISION
                </button>
              </div>
            </form>
          </section>

          {/* Footer */}
          <footer className="bg-white pt-20 pb-12 flex flex-col items-center justify-center text-center px-4 w-full">
            <div className="mb-8 flex justify-center w-full reveal">
              <img 
                alt="Dolce Hotels and Resorts" 
                className="h-16 w-auto object-contain" 
                src="/dolce-logo.png"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12">
              <a className="nav-link font-sans font-bold tracking-widest uppercase text-xs text-[#5a4040] hover:underline decoration-[#ab162b] underline-offset-8 transition-opacity" href="#weddings">WEDDINGS</a>
              <a className="nav-link font-sans font-bold tracking-widest uppercase text-xs text-[#5a4040] hover:underline decoration-[#ab162b] underline-offset-8 transition-opacity" href="#events">EVENTS</a>
              <a className="nav-link font-sans font-bold tracking-widest uppercase text-xs text-[#5a4040] hover:underline decoration-[#ab162b] underline-offset-8 transition-opacity" href="#venues">VENUES</a>
              <a className="nav-link font-sans font-bold tracking-widest uppercase text-xs text-[#5a4040] hover:underline decoration-[#ab162b] underline-offset-8 transition-opacity" href="#dining">DINING</a>
              <a className="nav-link font-sans font-bold tracking-widest uppercase text-xs text-[#5a4040] hover:underline decoration-[#ab162b] underline-offset-8 transition-opacity" href="#contact">CONTACT</a>
            </div>
            <div className="w-24 h-px bg-[#e2bebd]/30 mb-10"></div>
            <p className="font-body text-[#5a4040] text-sm italic mb-6">
              © 2025 Dolce Hotels and Resorts. Member of Wyndham Rewards.
            </p>
            <div className="flex items-center gap-4 opacity-70">
              <img 
                className="h-8 grayscale object-contain" 
                alt="corporate partner logo" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAqDIrINTQBC7qAIfjyXrbgOHMQtY271H8Axs28F-GD4uuU5pXndv-Bt_e9FvFllpSyvW7bmPjr-poxALM7PTsOk-RZOJ1FZoAFx6CzKEJR-CwNxNRa6Jv8sI-wMCywACukd8OFEKvxDXrEehkUU4Oa9tj1qIyVMaRYR8CsBVQaLRz8IPZO9Gd8exChEvS6vKaZWmWaVF0Imcc1R53S4_KKjXt1fjY9w3lf-FZKPd7cyYmgIY0ljpDX__jBVm0xEMgJd2nKn_zTAc"
              />
              <div className="h-4 w-px bg-[#1b1b1e]/20"></div>
              <p className="font-sans font-bold tracking-widest text-[10px] uppercase">PART OF WYNDHAM HOTELS & RESORTS</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
