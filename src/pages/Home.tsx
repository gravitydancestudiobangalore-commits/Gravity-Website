import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ACHIEVEMENTS, BRANCHES, EXTRAS, IMAGES, RATING, REVIEWS, SHEKAR, SHEKAR_PORTRAIT, SOCIAL, STYLES, TEL, THEMES, VIDEOS } from '../data';
import { Button, Icon, InstagramIcon, Picture, Reveal, SectionTitle, Video } from '../ui';
import { CountUp, GoldDust, Marquee, SplitWords } from '../fx';

const ease = [0.16, 1, 0.3, 1] as const;

// Big, plain-language shortcuts for people who just want one thing.
const TASKS = [
  { label: 'Timings & fees', hint: 'From ₹1,500 / month', to: '/classes', icon: 'clock' },
  { label: 'Book a free demo', hint: 'First class free', to: '/join', icon: 'spark' },
  { label: 'Find a branch', hint: 'Maps & directions', to: '/branches', icon: 'pin' },
  { label: 'Call us', hint: '+91 88677 64826', href: TEL, icon: 'phone' },
  { label: 'Watch performances', hint: 'Videos & photos', to: '/gallery', icon: 'play' },
  { label: 'Our achievements', hint: 'Awards & TV shows', to: '/achievements', icon: 'trophy' },
] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  return (
    <section ref={ref} className="glow relative overflow-hidden pb-14 pt-24 md:pb-24 md:pt-36">
      <GoldDust density={40} />
      <motion.div aria-hidden style={{ x: wordX }} className="outline-text pointer-events-none absolute -left-4 top-16 whitespace-nowrap font-display text-[30vw] font-bold leading-none md:top-10 md:text-[20vw]">
        Gravity Gravity
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1.05fr_1fr] md:px-8">
        <div>
          <p style={{ animationDelay: '.2s' }} className="enter ornament left text-[15px] font-semibold text-gold-ink">
            Rajajinagar & Hebbal, Bengaluru
          </p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.08] md:text-[4.2rem]">
            <SplitWords text="Dance classes that build" now delay={0.3} />{' '}
            <SplitWords text="confidence on stage." now delay={0.55} className="foil" />
          </h1>
          <p style={{ animationDelay: '.8s' }} className="enter mt-5 max-w-md text-lg text-mute">
            Western, hip-hop, Bharatanatyam and Zumba for ages 4 to 60. <strong className="font-semibold text-ink">Your first class is free.</strong>
          </p>
          <div style={{ animationDelay: '.95s' }} className="enter mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/join" className="w-full sm:w-auto">Book a free demo class</Button>
            <Button to="/classes" variant="dark" className="w-full sm:w-auto">See timings</Button>
          </div>
          <a href="https://www.google.com/search?q=Gravity+Dance+Academy+Rajajinagar" target="_blank" rel="noopener" style={{ animationDelay: '1.1s' }} className="enter mt-7 inline-flex items-center gap-3 rounded-2xl border border-line bg-paper/80 px-4 py-3 backdrop-blur">
            <span className="font-display text-3xl font-bold text-royal"><CountUp to={RATING} decimals={1} /></span>
            <span className="leading-tight">
              <span className="block tracking-widest text-gold" aria-hidden>★★★★★</span>
              <span className="block text-[15px] text-mute">{REVIEWS} Google reviews</span>
            </span>
          </a>
        </div>

        <div style={{ animationDelay: '.35s' }} className="enter-pop relative">
          <motion.div style={{ y: imgY }} className="overflow-hidden rounded-[2rem] border-4 border-paper shadow-[0_30px_60px_-25px_rgb(27_42_74/0.55)] ring-1 ring-gold/50">
            <Picture img={IMAGES.hero} eager sizes="(min-width: 768px) 50vw, 100vw" alt="Gravity kids on stage at the LuLu Funtura Little Star Grand Finale" className="aspect-[4/3] w-full object-cover" />
          </motion.div>
          {/* Floating badges */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-5 left-3 flex items-center gap-2 rounded-2xl bg-royal px-4 py-3 text-stage shadow-xl ring-1 ring-gold/60">
            <Icon.trophy className="size-6 text-gold" />
            <span className="leading-tight"><span className="block text-[13px] text-stage/80">Business Samrat 2025</span><span className="block font-semibold">Top 1 Dance Academy</span></span>
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 right-3 rounded-2xl bg-paper px-4 py-2.5 shadow-xl ring-1 ring-gold/50">
            <span className="block text-[13px] text-mute">On Zee Kannada</span><span className="block font-semibold text-royal">Dance Karnataka Dance</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const top = ACHIEVEMENTS.filter((a) => a.highlight);
  return (
    <>
      <Hero />

      {/* Quick tasks */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8 md:pb-24">
        <Reveal>
          <h2 className="text-[1.75rem] md:text-4xl">What would you like to do?</h2>
          <p className="mt-1 text-mute">Tap one to go straight there.</p>
        </Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {TASKS.map((t, i) => {
            const I = Icon[t.icon];
            const inner = (
              <>
                <span className="grid size-12 place-items-center rounded-xl bg-royal text-gold transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><I className="size-6" /></span>
                <span className="mt-3 block text-[17px] font-semibold leading-snug text-ink">{t.label}</span>
                <span className="block text-[14px] text-mute">{t.hint}</span>
              </>
            );
            const cls = 'group block h-full rounded-2xl border-2 border-line bg-paper p-4 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_30px_-18px_rgb(27_42_74/0.5)] md:p-5';
            return (
              <li key={t.label}>
                <Reveal delay={i * 60} className="h-full">
                  {'to' in t ? <Link to={t.to} className={cls}>{inner}</Link> : <a href={t.href} className={cls}>{inner}</a>}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <Marquee words={STYLES} />

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {[
            { n: 15, s: '+', l: 'Years of Shekar Master’s experience' },
            { n: 8, s: '', l: 'Years of Gravity in Bengaluru' },
            { n: 2, s: '', l: 'Branches: Rajajinagar & Hebbal' },
            { n: 58, s: 'K', l: 'Instagram followers' },
          ].map((s) => (
            <div key={s.l} className="bg-paper p-5 md:p-7">
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-display text-4xl font-bold text-royal md:text-5xl"><CountUp to={s.n} suffix={s.s} /></dd>
              <dd className="mt-1 text-[15px] leading-snug text-mute">{s.l}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* More than dance */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <SectionTitle eyebrow="More than dance" title="Karate, public speaking & Zumba" action={<Button to="/classes#more" variant="dark">See timings & fees</Button>} />
        <div className="grid gap-4 md:grid-cols-3">
          {EXTRAS.map((x, i) => (
            <Reveal key={x.id} delay={i * 90}>
              <Link to="/classes#more" className="group flex items-center gap-4 rounded-3xl border-2 border-line bg-paper p-3 transition-colors hover:border-gold">
                {'img' in x && x.img ? (
                  <Picture img={x.img} alt={`${x.name} class`} sizes="96px" className="size-24 shrink-0 rounded-2xl object-cover" />
                ) : (
                  <span className="grid size-24 shrink-0 place-items-center rounded-2xl bg-royal"><Icon.mic className="size-10 text-gold" /></span>
                )}
                <span className="flex-1">
                  <span className="block font-display text-xl font-bold text-royal">{x.name}</span>
                  <span className="block text-[15px] text-mute">{x.who} · from ₹{x.fee.toLocaleString('en-IN')}/month</span>
                </span>
                <Icon.arrow className="size-5 text-royal transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <SectionTitle eyebrow="Proud moments" title="Awards & big stages" action={<Button to="/achievements" variant="dark">See all</Button>} />
          <div className="grid gap-5 md:grid-cols-3">
            {top.map((a, i) => (
              <Reveal key={a.title} delay={i * 90} className="h-full">
                <article className="group h-full overflow-hidden rounded-3xl border border-line bg-paper transition-shadow hover:shadow-[0_20px_40px_-24px_rgb(27_42_74/0.6)]">
                  {a.img ? (
                    <div className="overflow-hidden"><Picture img={a.img} alt={a.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  ) : (
                    <div className="grid aspect-[16/10] place-items-center bg-royal"><Icon.trophy className="size-14 text-gold" /></div>
                  )}
                  <div className="p-5">
                    {a.year && <p className="text-[15px] font-semibold text-gold-ink">{a.year}</p>}
                    <h3 className="text-xl">{a.title}</h3>
                    <p className="mt-2 text-[16px] text-mute">{a.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Videos: swipe on phones */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionTitle eyebrow="Watch" title="See them perform" action={<Button to="/gallery" variant="dark">All videos</Button>} />
        </div>
        <div className="no-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:grid md:grid-cols-4 md:px-8">
          {VIDEOS.filter((v) => v.vertical).slice(0, 4).map((v) => (
            <div key={v.id} className="w-[62vw] shrink-0 snap-center md:w-auto"><Video {...v} /></div>
          ))}
        </div>
        <p className="mt-3 px-4 text-[15px] text-mute md:hidden">Swipe for more →</p>
      </section>

      {/* Shekar */}
      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold/60" aria-hidden />
              <img src={SHEKAR_PORTRAIT} alt="Shekar Master, founder of Gravity Dance Academy" loading="lazy" className="relative aspect-[4/5] w-full rounded-3xl object-cover" />
            </div>
          </Reveal>
          <div>
            <p className="ornament left text-[15px] font-semibold text-gold-ink">{SHEKAR.role}</p>
            <h2 className="mt-2 text-[2rem] md:text-5xl"><SplitWords text={SHEKAR.name} /></h2>
            <p className="mt-4 max-w-lg text-lg text-mute">{SHEKAR.bio}</p>
            <ul className="mt-5 space-y-2">
              {SHEKAR.wins.slice(0, 3).map((w) => <li key={w} className="flex gap-3"><span className="text-gold" aria-hidden>★</span><span className="font-medium">{w}</span></li>)}
            </ul>
            <div className="mt-8"><Button to="/about" variant="dark">Read more about him</Button></div>
          </div>
        </div>
      </section>

      {/* Parent reviews (paraphrased Google review themes) */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <SectionTitle eyebrow="What parents say" title={`Rated ${RATING} by ${REVIEWS} families`} />
        <div className="grid gap-4 md:grid-cols-3">
          {THEMES.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="h-full">
              <figure className="h-full rounded-3xl border-2 border-line bg-paper p-6">
                <p className="tracking-widest text-gold" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote className="mt-3 font-display text-xl leading-snug text-royal">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-[15px] font-semibold text-gold-ink">{t.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Branches */}
      <section className="bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <SectionTitle
          eyebrow="Visit us"
          title="Two branches"
          intro="Looking for dance classes in Rajajinagar or Hebbal? Both studios run the same classes with the same teachers, from kids’ western dance and Bharatanatyam to ladies’ Zumba and adult morning batches."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {Object.values(BRANCHES).map((b, i) => (
            <Reveal key={b.id} delay={i * 90}>
              <Link to={`/branches#${b.id}`} className="group flex items-center gap-4 rounded-3xl border-2 border-line bg-paper p-5 transition-colors hover:border-gold md:p-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-royal text-gold"><Icon.pin className="size-7" /></span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold text-gold-ink">{b.tag}</span>
                  <span className="block font-display text-2xl font-bold text-royal">{b.name}</span>
                  <span className="block text-[15px] text-mute">{b.landmark}</span>
                </span>
                <Icon.arrow className="size-6 text-royal transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      </section>

      {/* Instagram */}
      <section className="px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-3xl bg-royal p-7 text-stage md:flex-row md:items-center md:justify-between md:p-12">
            <div className="absolute -right-16 -top-16 size-56 rounded-full border border-gold/30" aria-hidden />
            <div className="absolute -right-6 -top-6 size-32 rounded-full border border-gold/20" aria-hidden />
            <div className="relative">
              <p className="flex items-center gap-2 text-[15px] text-stage/80"><InstagramIcon className="size-5 text-gold" /> {SOCIAL.instagramHandle}</p>
              <h2 className="mt-2 text-[1.9rem] !text-stage md:text-4xl">Join <span className="foil-gold">{SOCIAL.instagramFollowers}</span> followers</h2>
              <p className="mt-1 text-stage/85">New routines, shows and behind-the-scenes every week.</p>
            </div>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="shine relative inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-semibold text-royal">Follow on Instagram</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
