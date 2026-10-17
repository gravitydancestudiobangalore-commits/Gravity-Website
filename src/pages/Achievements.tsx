import { ACHIEVEMENTS, AWARD_VIDEO, IMAGES, VIDEOS } from '../data';
import { Button, PageHeader, Picture, Reveal, Video } from '../ui';

export default function Achievements() {
  const [first, ...rest] = ACHIEVEMENTS;
  const finale = VIDEOS[0];
  return (
    <>
      <PageHeader title="Achievements" intro="Eight years of shows, awards and TV stages, from our founder to our youngest students." />

      {/* Headline award */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {first.img && <Picture img={first.img} eager alt={`${first.title} award ceremony`} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-3xl object-cover" />}
          <div>
            <p className="text-[15px] font-semibold text-gold-ink">{first.year}</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{first.title}</h2>
            <p className="mt-3 text-lg text-mute">{first.detail}</p>
          </div>
        </div>
      </section>

      {/* Videos of the wins */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
        <Video {...AWARD_VIDEO} />
        <Video {...finale} />
      </section>

      {/* Everything else */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-8 md:pb-28">
        <h2 className="mb-8 text-2xl font-bold">More highlights</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 80}>
              <article className="h-full overflow-hidden rounded-3xl border border-line">
                {a.img && <Picture img={a.img} alt={a.title} className="aspect-[16/10] w-full object-cover" />}
                <div className="p-6">
                  {a.year && <p className="text-[15px] font-semibold text-gold-ink">{a.year}</p>}
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <p className="mt-2 text-mute">{a.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_0.8fr] md:px-8 md:py-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">8 years. 2 branches. One big family.</h2>
            <p className="mt-3 text-mute">Gravity started in Rajajinagar in 2018. Your child’s first stage could be next.</p>
            <div className="mt-6"><Button to="/join">Book a free demo</Button></div>
          </div>
          <Picture img={IMAGES.anniversary} alt="Gravity Dance Academy 8th anniversary flag" className="aspect-square w-full max-w-xs justify-self-center rounded-3xl object-cover" />
        </div>
      </section>
    </>
  );
}
