import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Img } from './data';
import { GoldDust, Magnetic, SplitWords, useReveal } from './fx';

/** Fade + rise (with a little blur) when scrolled into view. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const btn = {
  gold: 'shine bg-royal text-stage ring-1 ring-gold/50 shadow-[0_12px_30px_-14px_rgb(27_42_74/0.8)] hover:bg-royal-2',
  dark: 'border-2 border-royal text-royal hover:bg-royal hover:text-stage',
  line: 'border-2 border-line bg-paper text-ink hover:border-royal',
};
type BtnProps = { to?: string; href?: string; variant?: keyof typeof btn; children: ReactNode; className?: string; external?: boolean };
export function Button({ to, href, variant = 'gold', children, className = '', external }: BtnProps) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors ${btn[variant]} ${className}`;
  const el = to ? <Link to={to} className={cls}>{children}</Link> : <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>;
  return variant === 'gold' ? <Magnetic>{el}</Magnetic> : el;
}

export function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="grain glow relative overflow-hidden border-b border-line">
      <GoldDust density={35} />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <h1 className="max-w-3xl text-[2.5rem] leading-[1.1] md:text-6xl"><SplitWords text={title} now /></h1>
        {intro && <p className="enter mt-4 max-w-2xl text-lg text-mute" style={{ animationDelay: '.3s' }}>{intro}</p>}
        {children && <div className="enter" style={{ animationDelay: '.45s' }}>{children}</div>}
      </div>
    </header>
  );
}

export function SectionTitle({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="ornament left text-[15px] font-semibold text-gold-ink">{eyebrow}</p>}
        <h2 className="mt-1 text-[2rem] md:text-5xl"><SplitWords text={title} /></h2>
        {intro && <p className="mt-3 max-w-xl text-mute">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export const Picture = ({ img, alt, className = '', sizes = '(min-width: 768px) 33vw, 100vw', eager }: { img: Img; alt: string; className?: string; sizes?: string; eager?: boolean }) => (
  <img src={img.src} srcSet={img.srcSet} style={{ objectPosition: img.pos }} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className={className} />
);

/** Equal-size photo grid; tap a photo to see it larger. */
export function PhotoGrid({ photos }: { photos: { img: Img; alt: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => { open !== null ? dlg.current?.showModal() : dlg.current?.close(); }, [open]);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((p, i) => (
          <li key={p.img.src}>
            <Reveal delay={(i % 3) * 70}>
              <button onClick={() => setOpen(i)} className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-line bg-soft" aria-label={`View photo: ${p.alt}`}>
                <Picture img={p.img} alt={p.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-royal/50 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full bg-royal px-3 py-1 text-xs font-semibold text-stage opacity-0 transition-opacity group-hover:opacity-100">View</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} onClose={() => setOpen(null)} onClick={() => setOpen(null)} className="m-auto max-h-[90vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-royal/90">
        {open !== null && <img src={photos[open].img.src} alt={photos[open].alt} className="max-h-[85vh] rounded-2xl object-contain" />}
        <button className="absolute right-2 top-2 rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-royal" onClick={() => setOpen(null)}>Close ✕</button>
      </dialog>
    </>
  );
}

/** YouTube player that only loads the heavy iframe after a tap. */
export function Video({ id, title, vertical }: { id: string; title: string; vertical?: boolean }) {
  const [play, setPlay] = useState(false);
  return (
    <figure>
      <div className={`group relative overflow-hidden rounded-2xl border border-line bg-soft ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlay(true)} className="absolute inset-0" aria-label={`Play video: ${title}`}>
            <img src={`/images/gravity/yt/${id}.webp`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-royal/60 via-transparent" />
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-royal text-stage ring-2 ring-gold/70 shadow-[0_0_40px_rgb(27_42_74/0.5)] transition-transform group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-royal/30" aria-hidden />
              <svg viewBox="0 0 24 24" className="relative ml-0.5 size-6" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-[15px] font-semibold leading-snug">{title}</figcaption>
    </figure>
  );
}

/* ---------- Icons (inline, no library) ---------- */
type I = { className?: string };
const S = ({ className = '', children }: I & { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
export const Icon = {
  home: (p: I) => <S {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></S>,
  clock: (p: I) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>,
  trophy: (p: I) => <S {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0V4z" /><path d="M16 5h3a3 3 0 0 1-3 4M8 5H5a3 3 0 0 0 3 4M12 13v4M8 21h8M9 17h6" /></S>,
  play: (p: I) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></S>,
  star: (p: I) => <S {...p}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" /></S>,
  pin: (p: I) => <S {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></S>,
  phone: (p: I) => <S {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></S>,
  spark: (p: I) => <S {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></S>,
  arrow: (p: I) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>,
  mic: (p: I) => <S {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></S>,
};

export function WaIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.1 5.4.1 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3z" />
    </svg>
  );
}

export function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}
