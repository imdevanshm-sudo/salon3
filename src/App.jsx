import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

// --- DESIGN TOKENS ---
const GOLD = '#C5A059';
const DARK_BG = '#030303';

// --- MOCK DATA ---
const SERVICES = [
  { id: 1, name: 'Signature Haircut & Styling', duration: '60 Min', price: '₹2,500', category: 'Hair' },
  { id: 2, name: 'Balayage & Color Correction', duration: '180 Min', price: '₹8,500', category: 'Hair' },
  { id: 3, name: 'Bridal Makeup Mastery', duration: '120 Min', price: '₹15,000', category: 'Makeup' },
  { id: 4, name: '24K Gold Luxury Facial', duration: '90 Min', price: '₹5,000', category: 'Skin' },
];

const STYLISTS = [
  {
    id: 1,
    name: 'Aria Sterling',
    title: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
  },
  {
    id: 2,
    name: 'Julian Vance',
    title: 'Master Colorist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
  },
  {
    id: 3,
    name: 'Maya Sen',
    title: 'Lead Makeup Artist',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

// --- UTILITY COMPONENTS ---

const RevealOnScroll = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100';

    switch (direction) {
      case 'up':
        return 'translate-y-16 scale-95';
      case 'left':
        return 'translate-x-16';
      case 'right':
        return '-translate-x-16';
      case 'zoom':
        return 'scale-110';
      default:
        return 'translate-y-12';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FilmGrain = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
    }}
  />
);

const WebsiteView = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="text-zinc-50 min-h-screen font-sans selection:text-black overflow-x-hidden relative"
      style={{ backgroundColor: DARK_BG, '--gold': GOLD }}
    >
      <FilmGrain />

      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--gold)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03] animate-[pulse_10s_ease-in-out_infinite_alternate] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--gold)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03] animate-[pulse_15s_ease-in-out_infinite_alternate-reverse] pointer-events-none" />

      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#030303]/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="hidden md:flex space-x-10 text-xs tracking-[0.2em] uppercase text-zinc-400 font-light">
            <a href="#story" className="hover:text-[var(--gold)] transition-all duration-500 relative group">
              The Story
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
            </a>
            <a href="#services" className="hover:text-[var(--gold)] transition-all duration-500 relative group">
              Services
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
            </a>
          </div>

          <button
            type="button"
            className="text-center group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <h1 className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-white group-hover:text-[var(--gold)] transition-colors duration-700">
              LONDON HOUSE
            </h1>
            <p className="text-[0.55rem] tracking-[0.4em] text-zinc-500 mt-2 uppercase">Salon & Academy</p>
          </button>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#academy" className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-light hover:text-[var(--gold)] transition-all duration-500 relative group">
              Academy
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
            </a>
            <button onClick={onBookNow} className="border border-[var(--gold)]/50 text-[var(--gold)] px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-black transition-all duration-500 relative overflow-hidden group">
              <span className="relative z-10">Reserve</span>
              <div className="absolute inset-0 bg-[var(--gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            </button>
          </div>

          <button type="button" className="md:hidden text-zinc-50 hover:text-[var(--gold)] transition-colors" aria-label="Open menu">
            <Menu size={28} strokeWidth={1} />
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=2500"
            alt="Cinematic Salon Interior"
            className="w-full h-full object-cover opacity-60 scale-100 animate-[pulse_30s_linear_infinite_alternate] transform-gpu origin-center filter contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#030303]" />
        </div>

        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center mt-20">
          <RevealOnScroll delay={100} direction="up">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="h-[1px] w-8 bg-[var(--gold)]/50" />
              <span className="text-[var(--gold)] text-xs tracking-[0.5em] uppercase font-light">A New Era of Beauty</span>
              <span className="h-[1px] w-8 bg-[var(--gold)]/50" />
            </div>
          </RevealOnScroll>

          <div className="overflow-hidden py-2">
            <RevealOnScroll delay={300} direction="up">
              <h2 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] text-white mb-4 tracking-tight drop-shadow-2xl">
                The Art of <br />
                <span className="italic text-[var(--gold)] font-light pr-4">Transformation.</span>
              </h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={600} direction="up">
            <p className="text-zinc-400 text-base md:text-xl font-light max-w-2xl mx-auto mb-16 tracking-wide leading-relaxed">
              Gorakhpur&apos;s premier sanctuary for the avant-garde. Where cinematic elegance meets unparalleled mastery in hair and skin.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={900} direction="up">
            <button onClick={onBookNow} className="group relative px-12 py-5 bg-white text-black overflow-hidden flex items-center justify-center">
              <span className="relative z-10 text-xs tracking-[0.3em] uppercase font-semibold group-hover:text-white transition-colors duration-500">
                Experience the Premiere
              </span>
              <div className="absolute inset-0 bg-[var(--gold)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
            </button>
          </RevealOnScroll>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce">
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-4 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      <section id="story" className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center mb-40">
          <RevealOnScroll direction="right" className="relative group">
            <div className="overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200"
                alt="The Craft"
                className="w-full h-[700px] object-cover filter grayscale contrast-125 saturate-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#0a0a0a] border border-white/5 flex items-center justify-center p-8 hidden lg:flex backdrop-blur-sm z-10 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-300">
              <p className="font-serif italic text-2xl text-zinc-300 text-center leading-snug">&quot;Beauty is a film where you are the protagonist.&quot;</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={200}>
            <div className="pl-0 md:pl-10">
              <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-6 block font-bold">Act I / The Craft</span>
              <h3 className="font-serif text-5xl md:text-6xl mb-8 tracking-tight">Mastery in Every Frame.</h3>
              <p className="text-zinc-400 font-light leading-loose mb-10 text-lg">
                At London House, we don&apos;t just style; we direct your aesthetic journey. Our internationally trained artisans bring cinematic vision to Gorakhpur, utilizing avant-garde techniques and world-class products. Every cut and contour is executed with clinical precision.
              </p>
              <a href="#" className="group inline-flex items-center text-xs uppercase tracking-[0.2em] text-white transition-colors pb-2 border-b border-[var(--gold)]/30 hover:border-[var(--gold)]">
                Meet the Directors <ChevronRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform duration-500" />
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <RevealOnScroll direction="right" delay={200}>
            <div className="pr-0 md:pr-10">
              <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-6 block font-bold">Act II / The Atmosphere</span>
              <h3 className="font-serif text-5xl md:text-6xl mb-8 tracking-tight">A Sanctuary of Shadows & Light.</h3>
              <p className="text-zinc-400 font-light leading-loose mb-10 text-lg">
                Step off the streets and onto the set. Our space is meticulously designed to provide a moody, ultra-luxurious escape. Curated ambient lighting and bespoke styling stations ensure every moment feels like an exclusive premiere.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" className="relative group">
            <div className="overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a1c82c388fb9?q=80&w=1200"
                alt="The Experience"
                className="w-full h-[700px] object-cover filter sepia-[0.2] contrast-125 saturate-50 group-hover:sepia-0 group-hover:saturate-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="services" className="py-40 bg-[#050505] relative border-y border-white/5">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <RevealOnScroll direction="up" className="text-center mb-24">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold">Curated Indulgence</span>
            <h3 className="font-serif text-5xl md:text-6xl tracking-tight">The Repertoire</h3>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Haute Coiffure',
                img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80',
                desc: 'Bespoke cuts, transformative color, and restorative treatments tailored to your narrative.',
              },
              {
                title: 'Aesthetic Skin',
                img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
                desc: 'Advanced clinical facials and age-defying therapies in absolute serene privacy.',
              },
              {
                title: 'Bridal Couture',
                img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
                desc: 'Flawless, camera-ready artistry for your most significant life moments.',
              },
            ].map((srv, i) => (
              <RevealOnScroll key={srv.title} delay={i * 200} direction="up" className="group cursor-pointer">
                <div className="overflow-hidden mb-8 relative h-[550px]">
                  <img
                    src={srv.img}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out filter grayscale contrast-125 saturate-50 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100">
                    <span className="text-[10px] uppercase tracking-widest text-white">View</span>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-serif text-3xl mb-3 text-white group-hover:text-[var(--gold)] transition-colors duration-500">{srv.title}</h4>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed">{srv.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="academy" className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="bg-[#080808] border border-white/5 p-10 md:p-20 relative overflow-hidden group">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-b from-[var(--gold)]/10 to-transparent rounded-full blur-[100px] transform group-hover:scale-110 transition-transform duration-[3000ms]" />

            <div className="grid md:grid-cols-2 gap-20 relative z-10 items-center">
              <div>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-6 block font-bold">Act III / The Academy</span>
                <h3 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight leading-tight">
                  Shape the <br />
                  <span className="italic text-zinc-500">Future</span> of Beauty.
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed mb-12 text-lg">
                  London House Academy is the premier institution for aspiring artists in Uttar Pradesh. We offer rigorous, globally-certified curriculum designed to forge the next generation of industry leaders. The Director&apos;s chair awaits.
                </p>
                <div className="space-y-6 mb-14">
                  {['International Master Diploma in Cosmetology', 'Advanced Hair Architecture', 'Pro Bridal Makeup Artistry'].map((course, i) => (
                    <div key={course} className="flex items-center text-zinc-300 group/item cursor-default">
                      <span className="text-[var(--gold)] font-serif text-xl mr-6 italic opacity-50 group-hover/item:opacity-100 transition-opacity">0{i + 1}</span>
                      <span className="tracking-wide text-sm group-hover/item:text-white transition-colors">{course}</span>
                    </div>
                  ))}
                </div>
                <button className="border border-zinc-700 text-white px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center">
                  Download Prospectus <ArrowRight size={14} className="ml-3" />
                </button>
              </div>
              <div className="relative h-[600px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1200"
                  alt="Academy Tools"
                  className="w-full h-full object-cover filter grayscale contrast-150 group-hover:grayscale-0 transition-all duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <footer className="bg-black pt-40 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02]">
          <h1 className="font-serif text-[15vw] whitespace-nowrap">LONDON HOUSE</h1>
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 mb-32 relative z-10">
          <RevealOnScroll direction="up">
            <h2 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight">Ready for your close-up?</h2>
            <p className="text-zinc-400 mb-12 font-light text-xl">Secure your appointment at Gorakhpur&apos;s most exclusive salon.</p>
            <button onClick={onBookNow} className="group relative inline-flex items-center justify-center px-14 py-6 bg-[var(--gold)] text-black overflow-hidden">
              <span className="relative z-10 text-xs tracking-[0.3em] uppercase font-bold group-hover:text-white transition-colors duration-500">
                Book The Experience
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            </button>
          </RevealOnScroll>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 text-xs text-zinc-500 border-t border-white/5 pt-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-serif text-[var(--gold)] text-2xl mb-6 tracking-[0.2em]">LONDON HOUSE</h4>
            <p className="mb-4 flex items-center font-light tracking-wide"><MapPin size={14} className="mr-3 text-zinc-400" /> 15 Park Road, Civil Lines, Gorakhpur</p>
            <p className="mb-4 flex items-center font-light tracking-wide"><Phone size={14} className="mr-3 text-zinc-400" /> +91 98765 43210</p>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-[0.2em] mb-6">Showtimes</h4>
            <p className="mb-3 font-light">Mon - Sat: 10:00 AM - 8:00 PM</p>
            <p className="font-light">Sunday: 11:00 AM - 7:00 PM</p>
          </div>
          <div className="md:text-right">
            <div className="flex space-x-6 md:justify-end mb-6">
              <a href="#" className="text-zinc-400 hover:text-[var(--gold)] transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
            <p className="font-light tracking-widest uppercase text-[10px] mb-2">© 2026 London House.</p>
            <p className="font-light tracking-widest uppercase text-[10px]">A Cinematic Experience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BookingView = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = ['The Service', 'The Director', 'The Premiere', 'Confirmation'];

  const handleNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((prev) => Math.min(4, prev + 1));
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      <FilmGrain />

      <header className="px-8 py-8 flex justify-between items-center relative z-20">
        <button onClick={onBack} className="group flex items-center text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Exit
        </button>
        <h1 className="font-serif text-lg tracking-[0.4em] text-[var(--gold)] opacity-80">VIP RESERVATION</h1>
        <div className="w-24" />
      </header>

      <div className="flex-grow flex relative z-10 max-w-[100rem] w-full mx-auto">
        <div className="w-80 p-12 hidden lg:flex flex-col justify-center border-r border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
          <div className="relative z-10 space-y-12">
            {steps.map((s, i) => {
              const isActive = step === i + 1;
              const isCompleted = step > i + 1;
              return (
                <div key={s} className="relative flex items-center group">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-700 ${
                      isActive
                        ? 'bg-[var(--gold)] scale-150 shadow-[0_0_15px_rgba(197,160,89,0.5)]'
                        : isCompleted
                          ? 'bg-zinc-600'
                          : 'bg-zinc-800'
                    }`}
                  />
                  <span className={`ml-8 text-xs tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? 'text-white translate-x-2' : isCompleted ? 'text-zinc-500' : 'text-zinc-700'}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-grow p-6 md:p-16 flex flex-col justify-center">
          <div className={`transition-all duration-700 max-w-3xl w-full mx-auto ${isTransitioning ? 'opacity-0 translate-y-8 filter blur-sm' : 'opacity-100 translate-y-0 filter blur-0'}`}>
            {step === 1 && (
              <div>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-4 block">Scene 1</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Select your narrative.</h2>
                <p className="text-zinc-500 font-light mb-12 text-lg">Choose the treatment that sets your stage.</p>

                <div className="space-y-4">
                  {SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-6 border rounded-sm cursor-pointer transition-all duration-500 flex justify-between items-center group relative overflow-hidden ${selectedService?.id === srv.id ? 'border-[var(--gold)] bg-[var(--gold)]/5' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'}`}
                    >
                      {selectedService?.id === srv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--gold)]" />}

                      <div className="relative z-10">
                        <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-2 block">{srv.category}</span>
                        <h4 className="font-serif text-2xl mb-2 text-zinc-200 group-hover:text-white transition-colors">{srv.name}</h4>
                        <p className="text-zinc-500 text-sm flex items-center font-light">
                          <Clock size={12} className="mr-2 opacity-50" /> {srv.duration}
                        </p>
                      </div>
                      <div className="text-right relative z-10">
                        <p className="text-xl font-light mb-3 text-[var(--gold)]">{srv.price}</p>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ml-auto ${selectedService?.id === srv.id ? 'border-[var(--gold)] bg-[var(--gold)] text-black scale-110' : 'border-zinc-700 text-transparent'}`}>
                          <CheckCircle size={12} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-4 block">Scene 2</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Choose your Director.</h2>
                <p className="text-zinc-500 font-light mb-12 text-lg">Our master artisans are ready to craft your look.</p>

                <div className="grid md:grid-cols-3 gap-6">
                  {STYLISTS.map((stylist) => (
                    <div
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist)}
                      className={`relative overflow-hidden cursor-pointer group rounded-sm border transition-all duration-700 ${selectedStylist?.id === stylist.id ? 'border-[var(--gold)] shadow-[0_0_30px_rgba(197,160,89,0.15)]' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <img src={stylist.image} alt={stylist.name} className="w-full h-80 object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                        <h4 className="font-serif text-2xl mb-1 text-white">{stylist.name}</h4>
                        <p className="text-[var(--gold)] text-[10px] uppercase tracking-[0.2em]">{stylist.title}</p>
                      </div>
                      {selectedStylist?.id === stylist.id && (
                        <div className="absolute top-4 right-4 bg-[var(--gold)] text-black p-1.5 rounded-full animate-in zoom-in duration-300">
                          <CheckCircle size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase mb-4 block">Scene 3</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">Set the Premiere Time.</h2>
                <p className="text-zinc-500 font-light mb-12 text-lg">Select a moment for your transformation.</p>

                <div className="mb-12 bg-white/[0.02] border border-white/5 p-8 rounded-sm">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center">
                    <Calendar size={12} className="mr-3" /> October 2026
                  </h4>
                  <div className="flex space-x-4 overflow-x-auto pb-4">
                    {[14, 15, 16, 17, 18, 19, 20].map((day, i) => {
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                      const isSelected = selectedDate === day;
                      return (
                        <div
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`flex-shrink-0 w-24 h-32 rounded-sm border flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${isSelected ? 'border-[var(--gold)] bg-[var(--gold)] text-black scale-105 shadow-[0_10px_30px_rgba(197,160,89,0.2)]' : 'border-white/5 hover:border-white/20 bg-black text-zinc-400 hover:text-white'}`}
                        >
                          <span className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${isSelected ? 'opacity-80' : 'opacity-50'}`}>{days[i]}</span>
                          <span className="font-serif text-4xl">{day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`transition-all duration-500 ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center">
                    <Clock size={12} className="mr-3" /> Available Slots
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TIME_SLOTS.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 text-center border rounded-sm cursor-pointer transition-all duration-300 text-sm tracking-widest ${selectedTime === time ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]' : 'border-white/5 hover:border-white/20 bg-black text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center max-w-xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--gold)] to-[#8c6f37] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(197,160,89,0.3)]">
                  <Star className="text-black" size={32} fill="black" />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">The Stage is Set.</h2>
                <p className="text-zinc-500 font-light mb-12">Review the details of your upcoming experience.</p>

                <div className="bg-white/[0.02] border border-white/5 rounded-sm p-10 mb-12 text-left relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-8">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] block mb-2">Service</span>
                      <h4 className="font-serif text-3xl text-white">{selectedService?.name}</h4>
                    </div>
                    <p className="text-[var(--gold)] text-2xl font-light mt-4 md:mt-0">{selectedService?.price}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Director</span>
                      <span className="text-zinc-200 flex items-center font-serif text-lg">{selectedStylist?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Date</span>
                      <span className="text-zinc-200 font-light tracking-wide">Oct {selectedDate}, 2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Time</span>
                      <span className="text-zinc-200 font-light tracking-wide">{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert('Connecting to Payment Gateway...');
                    onBack();
                  }}
                  className="w-full bg-white text-black py-5 uppercase tracking-[0.3em] font-bold text-xs hover:bg-[var(--gold)] transition-colors duration-500 flex justify-center items-center group"
                >
                  Confirm & Pay <ArrowRight size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}

            {step < 4 && (
              <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-10">
                <button
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  className={`text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  Go Back
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={(step === 1 && !selectedService) || (step === 2 && !selectedStylist) || (step === 3 && (!selectedDate || !selectedTime)) || isTransitioning}
                  className="bg-transparent border border-[var(--gold)] text-[var(--gold)] px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[var(--gold)] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--gold)] disabled:cursor-not-allowed transition-all duration-500 flex items-center group"
                >
                  Continue <ChevronRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans flex overflow-hidden">
      <aside className="w-64 border-r border-white/5 bg-black/50 flex flex-col z-10 backdrop-blur-md">
        <div className="p-8 border-b border-white/5">
          <h1 className="font-serif text-lg tracking-[0.2em] text-[var(--gold)] text-center">LONDON HOUSE</h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 text-center mt-1">Management OS</p>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-2">
          {[
            { icon: BarChart3, label: 'Overview', active: true },
            { icon: CalendarDays, label: 'Appointments' },
            { icon: Users, label: 'Staff & Stylists' },
            { icon: Scissors, label: 'Services' },
            { icon: TrendingUp, label: 'Financials' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center px-4 py-3 rounded-sm cursor-pointer transition-all duration-300 ${item.active ? 'bg-gradient-to-r from-[var(--gold)]/10 to-transparent text-[var(--gold)] border-l-2 border-[var(--gold)]' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}>
              <item.icon size={16} className="mr-4" />
              <span className="text-xs font-medium tracking-widest uppercase">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 flex items-center">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center mr-4 text-[10px] border border-[var(--gold)]/30 text-[var(--gold)]">
            AD
          </div>
          <div>
            <p className="text-xs text-white uppercase tracking-widest">Admin</p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">HQ Branch</p>
          </div>
        </div>
      </aside>

      <main className="flex-grow p-10 overflow-y-auto h-screen relative bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.05),transparent_40%)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl text-white font-serif mb-2 tracking-tight">Executive Dashboard</h2>
              <p className="text-zinc-500 text-sm font-light tracking-wide">Real-time metrics for October 2026</p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2.5 bg-transparent border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors">
                Export Report
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Total Revenue', value: '₹34,50,000', change: '+12.5%', isUp: true },
              { title: 'Appointments', value: '842', change: '+5.2%', isUp: true },
              { title: 'Avg. Ticket Size', value: '₹4,100', change: '+2.1%', isUp: true },
              { title: 'Client Retention', value: '88%', change: '-1.4%', isUp: false },
            ].map((stat) => (
              <div key={stat.title} className="bg-white/[0.02] border border-white/5 p-8 rounded-sm backdrop-blur-sm relative overflow-hidden group hover:border-[var(--gold)]/30 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-[var(--gold)]">
                  <BarChart3 size={64} />
                </div>
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-4">{stat.title}</h4>
                <p className="font-serif text-3xl text-white mb-3">{stat.value}</p>
                <div className={`text-[10px] font-medium flex items-center tracking-widest uppercase ${stat.isUp ? 'text-green-500/80' : 'text-red-500/80'}`}>
                  {stat.isUp ? <TrendingUp size={12} className="mr-2" /> : <TrendingUp size={12} className="mr-2 rotate-180" />}
                  {stat.change} vs last month
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-8 rounded-sm">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Revenue Trajectory</h4>
                <select className="bg-transparent border border-white/10 text-[10px] px-3 py-1.5 outline-none text-zinc-400 uppercase tracking-widest cursor-pointer hover:border-[var(--gold)]/50 transition-colors">
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              <div className="h-64 flex items-end space-x-3 md:space-x-5">
                {[40, 55, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((height, i) => (
                  <div key={`w-${i + 1}`} className="flex-1 flex flex-col justify-end group">
                    <div className="w-full bg-white/5 hover:bg-gradient-to-t hover:from-[var(--gold)]/50 hover:to-[var(--gold)] transition-all duration-300 rounded-t-sm relative" style={{ height: `${height}%` }}>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-[var(--gold)] text-[10px] py-1.5 px-3 rounded whitespace-nowrap z-10 tracking-widest transition-opacity">
                        ₹{height * 10}k
                      </div>
                    </div>
                    <span className="text-[9px] text-zinc-600 mt-3 text-center block uppercase tracking-widest">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
              <h4 className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-10">Top Directors</h4>
              <div className="space-y-8">
                {[
                  { name: 'Aria Sterling', revenue: '₹12.4L', percent: 95 },
                  { name: 'Julian Vance', revenue: '₹9.8L', percent: 80 },
                  { name: 'Maya Sen', revenue: '₹8.5L', percent: 70 },
                  { name: 'Rahul Verma', revenue: '₹6.2L', percent: 50 },
                ].map((staff) => (
                  <div key={staff.name} className="group">
                    <div className="flex justify-between text-xs mb-3">
                      <span className="text-zinc-300 tracking-wide">{staff.name}</span>
                      <span className="text-[var(--gold)]">{staff.revenue}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-[var(--gold)] h-full rounded-full group-hover:bg-white transition-colors duration-500" style={{ width: `${staff.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('website');

  return (
    <div className="relative antialiased" style={{ '--gold': GOLD }}>
      {currentView === 'website' && <WebsiteView onBookNow={() => setCurrentView('booking')} />}
      {currentView === 'booking' && <BookingView onBack={() => setCurrentView('website')} />}
      {currentView === 'dashboard' && <DashboardView />}

      <div className="fixed bottom-8 right-8 z-[100] bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl p-1.5 flex items-center space-x-1 transition-transform hover:scale-105">
        <button
          onClick={() => setCurrentView('website')}
          className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${currentView === 'website' ? 'bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'text-zinc-500 hover:text-white'}`}
        >
          Film
        </button>
        <button
          onClick={() => setCurrentView('booking')}
          className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${currentView === 'booking' ? 'bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'text-zinc-500 hover:text-white'}`}
        >
          Tickets
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${currentView === 'dashboard' ? 'bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'text-zinc-500 hover:text-white'}`}
        >
          Studio
        </button>
      </div>
    </div>
  );
}
