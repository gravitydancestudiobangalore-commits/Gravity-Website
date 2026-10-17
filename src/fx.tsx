import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/** Gold dust rising, like the particles around the dancer in the logo. Pauses when off-screen. */
export function GoldDust({ density = 60 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => { w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const n = innerWidth < 640 ? density / 2 : density;
    const ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.3, s: Math.random() * 0.5 + 0.15, d: Math.random() * 6.28, a: Math.random() * 0.45 + 0.15 }));
    const tick = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const p of ps) {
          p.y -= p.s; p.d += 0.012; p.x += Math.sin(p.d) * 0.35;
          if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
          ctx.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(p.d * 2));
          ctx.fillStyle = p.r > 1.5 ? '#d9b25c' : '#c99a3d';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    addEventListener('resize', resize);
    tick();
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize); };
  }, [density, reduce]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/** Leans toward the mouse (desktop only). */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Adds `.in` to the element when it scrolls into view. Without IntersectionObserver it shows at once. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return void el.classList.add('in');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Words rise one by one from behind a mask. `now` = play on load (CSS animation), else on scroll. */
export function SplitWords({ text, className = '', delay = 0, now }: { text: string; className?: string; delay?: number; now?: boolean }) {
  const ref = useReveal<HTMLSpanElement>();
  return (
    <span ref={now ? undefined : ref} className={`words ${now ? 'now' : ''} ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => {
        const d = `${delay + i * 0.06}s`;
        return (
          <span key={i} aria-hidden className="word">
            <span style={now ? { animationDelay: d } : { transitionDelay: d }}>{w}&nbsp;</span>
          </span>
        );
      })}
    </span>
  );
}

/** Shows the real number by default; counts up from 0 only when it can animate. */
export function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!inView || document.visibilityState !== 'visible' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    // Safety net: if the browser pauses animations, still land on the real number.
    const t = setTimeout(() => { c.stop(); setV(to); }, 2200);
    return () => { c.stop(); clearTimeout(t); setV(to); };
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

/** Opening curtain with the logo — first visit of the session only. */
export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('intro'); } catch { return true; }
  });
  useEffect(() => {
    if (!show) return;
    if (reduce) return setShow(false);
    try { sessionStorage.setItem('intro', '1'); } catch { /* private mode */ }
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => { setShow(false); document.documentElement.style.overflow = ''; }, 1900);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ''; };
  }, [show, reduce]);
  if (!show) return null;
  const ease = [0.76, 0, 0.24, 1] as const;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {[0, 1].map((side) => (
        <motion.div
          key={side}
          className="absolute top-0 h-full w-1/2 bg-paper"
          style={{ left: side ? '50%' : 0, backgroundImage: 'repeating-linear-gradient(90deg, #1b2a4a 0 18px, #213259 18px 40px)' }}
          initial={{ x: 0 }}
          animate={{ x: side ? '100%' : '-100%' }}
          transition={{ delay: 1.15, duration: 0.75, ease }}
        >
          <div className={`absolute top-0 h-full w-[2px] bg-gold ${side ? 'left-0' : 'right-0'}`} />
        </motion.div>
      ))}
      <motion.div className="absolute inset-0 grid place-items-center" animate={{ opacity: 0 }} transition={{ delay: 1, duration: 0.3 }}>
        <motion.img
          src="/images/gravity/logo-round-256.webp"
          alt=""
          className="size-36 rounded-full shadow-[0_0_80px_rgb(201_154_61/0.6)]"
          initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
}

/** Gold ring that follows the mouse (desktop only). */
export function Cursor() {
  const x = useSpring(-100, { stiffness: 500, damping: 40 });
  const y = useSpring(-100, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setBig(!!(e.target as HTMLElement).closest('a,button,select,label'));
    };
    addEventListener('pointermove', move);
    return () => removeEventListener('pointermove', move);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal"
      style={{ x, y }}
      animate={{ width: big ? 52 : 16, height: big ? 52 : 16, backgroundColor: big ? 'rgba(27,42,74,.08)' : 'rgba(27,42,74,0)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    />
  );
}

/** Tilted gold band of scrolling words. */
export function Marquee({ words }: { words: string[] }) {
  return (
    <div className="overflow-hidden py-2 md:py-4">
    <div className="relative z-10 overflow-hidden border-y border-gold/40 bg-royal py-4 text-stage md:-my-3 md:rotate-[-1.5deg] md:scale-[1.03]">
      <div className="marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {words.map((w) => (
              <span key={w} className="flex items-center gap-6 px-3 font-display text-2xl italic tracking-tight md:text-4xl">
                {w}<span className="text-lg text-gold" aria-hidden>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
