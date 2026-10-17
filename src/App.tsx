import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useOutlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Branches from './pages/Branches';
import Join from './pages/Join';
import { BRANCHES, EMAIL, HOURS, LOGO, NAV, PHONE_DISPLAY, PHONES, SOCIAL, TEL, TRIAL_MSG, waLink } from './data';
import { Icon, InstagramIcon, WaIcon, YoutubeIcon } from './ui';
import { Cursor, Intro } from './fx';

const TITLES: Record<string, string> = {
  '/': 'Gravity Dance Academy · Rajajinagar & Hebbal, Bengaluru',
  '/classes': 'Classes, timings & fees · Gravity Dance Academy',
  '/achievements': 'Achievements · Gravity Dance Academy',
  '/gallery': 'Photos & Videos · Gravity Dance Academy',
  '/about': 'About Shekar Master · Gravity Dance Academy',
  '/branches': 'Branches · Gravity Dance Academy',
  '/join': 'Book a free demo class · Gravity Dance Academy',
};

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 10);
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-line bg-paper/95 shadow-[0_6px_30px_-20px_rgb(27_42_74/0.5)] backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-8" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LOGO} alt="" width={44} height={44} className="size-11" />
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold text-royal">Gravity</span>
            <span className="block text-[13px] font-medium text-mute">Dance Academy</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.slice(1).map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} className={({ isActive }) => `relative whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${isActive ? 'text-royal' : 'text-mute hover:text-royal'}`}>
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-soft ring-1 ring-gold/40" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="relative">{n.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link to="/join" className="shine hidden rounded-full bg-royal px-5 py-3 text-[15px] font-semibold text-stage ring-1 ring-gold/50 hover:bg-royal-2 sm:inline-block">Book a free demo</Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex min-h-12 items-center gap-2 rounded-full border-2 border-royal px-4 text-base font-semibold text-royal xl:hidden"
            aria-expanded={open}
            aria-controls="menu-sheet"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={`absolute left-0 h-0.5 w-5 bg-royal transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-royal transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
      <motion.div className="h-[3px] origin-left bg-gradient-to-r from-royal via-gold to-royal" style={{ scaleX: progress }} />

      {/* Phone menu: big tiles with a one-line hint each */}
      {open && (
          <div
            id="menu-sheet"
            className="page-in h-[calc(100dvh-70px)] overflow-y-auto bg-paper px-4 pb-10 pt-4 xl:hidden"
          >
            <ul className="grid gap-2.5">
              {NAV.map((n, i) => {
                const I = Icon[n.icon];
                return (
                  <li key={n.to} className="enter" style={{ animationDelay: `${0.04 * i}s` }}>
                    <NavLink to={n.to} end className={({ isActive }) => `flex items-center gap-4 rounded-2xl border-2 p-4 ${isActive ? 'border-royal bg-soft' : 'border-line bg-paper'}`}>
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal text-gold"><I className="size-6" /></span>
                      <span className="flex-1">
                        <span className="block text-lg font-semibold text-ink">{n.label}</span>
                        <span className="block text-[15px] text-mute">{n.hint}</span>
                      </span>
                      <Icon.arrow className="size-5 text-royal" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a href={waLink(TRIAL_MSG)} target="_blank" rel="noopener" className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-royal text-base font-semibold text-stage"><WaIcon className="size-5" /> WhatsApp</a>
              <a href={TEL} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-royal text-base font-semibold text-royal"><Icon.phone className="size-5" /> Call</a>
            </div>
            <p className="mt-5 text-center text-[15px] text-mute">Open daily, {HOURS}</p>
          </div>
        )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-royal pb-32 pt-16 text-stage md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Gravity Dance Academy logo" width={56} height={56} className="size-14" />
            <p className="leading-tight"><span className="foil-gold font-display text-2xl font-bold">Gravity</span><br /><span className="text-[15px] text-stage/80">Dance Academy</span></p>
          </div>
          <p className="mt-4 font-display text-lg italic text-stage/85">We give you wings to fly.</p>
          <div className="mt-4 flex gap-3">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-12 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-royal"><InstagramIcon className="size-5" /></a>
            <a href={SOCIAL.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="grid size-12 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-royal"><YoutubeIcon className="size-5" /></a>
          </div>
        </div>
        {Object.values(BRANCHES).map((b) => (
          <div key={b.id}>
            <p className="font-display text-xl font-bold text-gold">{b.name}</p>
            <p className="mt-2 text-[15px] text-stage/85">{b.address}</p>
            <a href={b.directions} target="_blank" rel="noopener" className="mt-3 inline-flex min-h-11 items-center font-semibold text-gold underline-offset-4 hover:underline">Get directions →</a>
          </div>
        ))}
        <div>
          <p className="font-display text-xl font-bold text-gold">Contact</p>
          <ul className="mt-2 space-y-2 text-[15px] text-stage/85">
            {PHONES.map((p) => <li key={p}><a href={`tel:+91${p.replace(/\s/g, '')}`} className="hover:text-gold">+91 {p}</a></li>)}
            <li><a href={`mailto:${EMAIL}`} className="break-all hover:text-gold">{EMAIL}</a></li>
            <li>Open daily, {HOURS}</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-stage/15 px-4 pt-6 text-sm text-stage/70 md:px-8">© {new Date().getFullYear()} Gravity Dance Academy · Website by <a href="tel:+919108316234" className="underline-offset-4 hover:text-gold hover:underline">Bipin · +91 91083 16234</a></p>
    </footer>
  );
}

function MobileBar() {
  return (
    <div
      className="bar-in fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border border-gold/40 bg-paper/95 p-1.5 shadow-[0_10px_40px_-10px_rgb(27_42_74/0.5)] backdrop-blur md:hidden"
    >
      <a href={waLink(TRIAL_MSG)} target="_blank" rel="noopener" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-royal text-base font-semibold text-stage">
        <WaIcon className="size-5" /> Book free demo
      </a>
      <a href={TEL} className="flex min-h-12 items-center gap-1.5 rounded-full border-2 border-royal px-5 text-base font-semibold text-royal" aria-label={`Call ${PHONE_DISPLAY}`}>
        <span className="pulse-dot size-2 rounded-full bg-[#2e9e5b]" aria-hidden /> Call
      </a>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { pathname, hash } = location;
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/'];
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 60);
    else window.scrollTo(0, 0);
    // Safety net (see .settled in index.css): make sure load animations end fully visible.
    const html = document.documentElement;
    html.classList.remove('settled');
    const t = setTimeout(() => {
      html.classList.add('settled');
      for (const el of document.querySelectorAll('.rv:not(.in), .words:not(.in):not(.now)')) {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in');
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-royal focus:px-4 focus:py-2 focus:text-stage">Skip to content</a>
      <Intro />
      <Cursor />
      <Header />
      <main id="main" key={pathname} className="page-in">{outlet}</main>
      <Footer />
      <MobileBar />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="classes" element={<Classes />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="branches" element={<Branches />} />
        <Route path="join" element={<Join />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
