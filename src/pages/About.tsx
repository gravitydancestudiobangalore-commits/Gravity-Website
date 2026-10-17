import { IMAGES, RATING, REVIEWS, SHEKAR, SHEKAR_PORTRAIT, THEMES } from '../data';
import { Button, PageHeader, Picture } from '../ui';

export default function About() {
  return (
    <>
      <PageHeader title="Meet Shekar Master" intro="Founder of Gravity Dance Academy. We give you wings to fly." />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-24">
        <img src={SHEKAR_PORTRAIT} alt="Shekar Master" className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover" />
        <div>
          <p className="text-[15px] font-semibold text-gold-ink">{SHEKAR.role}</p>
          <p className="mt-3 text-xl leading-relaxed">{SHEKAR.bio}</p>

          <h2 className="mt-10 text-xl font-bold">Highlights</h2>
          <ul className="mt-3 space-y-2">
            {SHEKAR.wins.map((w) => <li key={w} className="flex gap-3"><span className="text-gold-ink" aria-hidden>★</span>{w}</li>)}
          </ul>

          <h2 className="mt-10 text-xl font-bold">Teaches</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SHEKAR.expertise.map((e) => <li key={e} className="rounded-full border border-line px-4 py-1.5 text-[15px]">{e}</li>)}
          </ul>
          <div className="mt-10"><Button to="/achievements" variant="dark">See all achievements</Button></div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight">What parents say</h2>
          <p className="mt-2 text-mute">{RATING}★ from {REVIEWS} Google reviews. Here’s what comes up most.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {THEMES.map((t) => (
              <figure key={t.title} className="rounded-3xl bg-paper p-6">
                <figcaption className="text-[15px] font-semibold text-gold-ink">{t.title}</figcaption>
                <blockquote className="mt-2 text-lg">{t.text}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <Picture img={IMAGES.shekar} alt="Shekar Master, choreographer" className="aspect-[3/2] w-full rounded-3xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learn from him in person</h2>
          <p className="mt-3 text-mute">Shekar Master and his team teach at both branches. Try a class free.</p>
          <div className="mt-6"><Button to="/join">Book a free demo</Button></div>
        </div>
      </section>
    </>
  );
}
