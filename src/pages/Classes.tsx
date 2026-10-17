import { useSearchParams } from 'react-router-dom';
import { ADMISSION_FEE, BATCHES, BRANCHES, EXTRAS, HOURS, PACKAGES, PERKS, PLANS, SHOW_FEES, waLink, type BranchId } from '../data';
import { Button, Icon, PageHeader, Picture, Reveal, SectionTitle, WaIcon } from '../ui';

const rs = (n: number) => `₹${n.toLocaleString('en-IN')}`;
/** "Mon · Wed · Fri" -> 3, "Mon – Fri" -> 5, "Saturday" -> 1 */
const perWeek = (days: string) => (days.includes('–') ? 5 : days.split('·').length);

function Price({ fee, adm, ask }: { fee?: number; adm?: boolean; ask: string }) {
  if (SHOW_FEES && fee) {
    return (
      <div className="leading-tight">
        <p className="font-display text-2xl font-bold text-royal">{rs(fee)}<span className="font-sans text-[15px] font-medium text-mute"> / month</span></p>
        {adm && <p className="text-[14px] text-mute">+ {rs(ADMISSION_FEE)} one-time admission</p>}
      </div>
    );
  }
  return (
    <a href={waLink(ask)} target="_blank" rel="noopener" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border-2 border-royal px-4 py-2 text-[15px] font-semibold text-royal hover:bg-royal hover:text-stage">
      <WaIcon className="size-4" /> Ask fee
    </a>
  );
}

export default function Classes() {
  const [params, setParams] = useSearchParams();
  const branch: BranchId = params.get('branch') === 'hebbal' ? 'hebbal' : 'rajajinagar';
  const batches = BATCHES[branch];
  const groups = [...new Set(batches.map((b) => b.group))];
  const name = BRANCHES[branch].name;

  return (
    <>
      <PageHeader title="Classes, timings & fees" intro={`Open daily, ${HOURS}. Pick your branch to see its batches. Your first class is a free demo.`}>
        <div role="tablist" aria-label="Branch" className="mt-8 inline-flex rounded-full border border-line bg-paper p-1">
          {(Object.keys(BRANCHES) as BranchId[]).map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={branch === id}
              onClick={() => setParams(id === 'hebbal' ? { branch: id } : {}, { replace: true })}
              className={`min-h-11 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors ${branch === id ? 'bg-royal text-stage ring-1 ring-gold/50' : 'text-mute hover:text-ink'}`}
            >
              {BRANCHES[id].name}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Western dance fees: monthly fee depends on classes per week (owner pricing; other classes have their own fee per batch) */}
      {SHOW_FEES && (
        <section className="mx-auto max-w-6xl px-4 pt-10 md:px-8">
          <div className="rounded-3xl border-2 border-gold/40 bg-paper p-4 md:p-7">
            <h2 className="text-[1.5rem] md:text-3xl">Western dance fees</h2>
            <p className="mt-1 text-mute">For Western dance, the monthly fee depends on how many classes a week you attend. Other classes show their own fee with each batch below.</p>
            <ul className="mt-4 grid grid-cols-3 gap-2 md:gap-4">
              {PLANS.map((p) => (
                <li key={p.perWeek} className="rounded-2xl bg-soft p-3 text-center md:p-5">
                  <p className="text-[14px] font-semibold leading-snug text-ink md:text-base">{p.perWeek} classes<br className="md:hidden" /> a week</p>
                  <p className="mt-1 font-display text-xl font-bold text-royal md:text-3xl">{rs(p.fee)}</p>
                  <p className="text-[13px] text-mute md:text-[15px]">per month</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
              <span><strong className="text-royal">+ {rs(ADMISSION_FEE)}</strong> one-time admission</span>
              <span><strong className="text-royal">Free</strong> first demo class</span>
            </p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16" role="tabpanel" aria-label={`${name} batches`}>
        {groups.map((g) => (
          <div key={`${branch}-${g}`} className="mb-12 last:mb-0">
            <h2 className="ornament left mb-5 text-[1.75rem] md:text-3xl"><span className="text-royal">{g}</span></h2>
            <ul className="grid gap-3 md:gap-0 md:divide-y md:divide-line md:overflow-hidden md:rounded-3xl md:border md:border-line">
              {batches.filter((b) => b.group === g).map((b, i) => (
                <li
                  key={`${branch}-${b.name}`}
                  style={{ animationDelay: `${(i % 6) * 0.05}s` }}
                  className="enter grid gap-3 rounded-2xl border-2 border-line bg-paper p-4 md:grid-cols-[1.2fr_1fr_1fr_1.1fr] md:items-center md:gap-6 md:rounded-none md:border-0 md:px-6 md:py-5"
                >
                  <div>
                    <p className="text-lg font-semibold text-ink">{b.name}</p>
                    {b.note && <p className="text-[15px] text-mute">{b.note}</p>}
                  </div>
                  <p><span className="inline-block rounded-full bg-soft px-3 py-1 font-medium">📅 {b.days} <span className="font-normal text-mute">({perWeek(b.days)}× a week)</span></span></p>
                  <p>{b.time ? <span className="inline-block rounded-full bg-royal/10 px-3 py-1 font-semibold text-royal">🕒 {b.time}</span> : <span className="text-[15px] text-mute">Timing on request</span>}</p>
                  <Price fee={b.fee} adm={b.adm} ask={`Hi! What is the fee${b.time ? '' : ' and timing'} for the ${g} – ${b.name} batch at ${name}?`} />
                </li>
              ))}
            </ul>
          </div>
        ))}

      </section>

      {/* Packages */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-20">
        <h2 className="text-[1.75rem] md:text-3xl">Packages</h2>
        <p className="mt-2 text-mute">Save more when you commit for longer.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <li key={p.name} className="rounded-3xl border-2 border-gold/50 bg-paper p-6">
              <p className="text-[15px] font-semibold text-gold-ink">{p.duration}</p>
              <h3 className="mt-1 text-2xl">{p.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-royal">{rs(p.price)}</span>
                <span className="text-lg text-mute line-through">{rs(p.was)}</span>
              </p>
              <p className="mt-3 text-[15px] text-mute">{p.note}</p>
              <div className="mt-5">
                <a href={waLink(`Hi! I'd like the ${p.name} (${rs(p.price)}) at ${name}.`)} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-6 py-3 font-semibold text-stage">
                  <WaIcon className="size-5" /> Ask about this package
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* More than dance */}
      <section id="more" className="scroll-mt-24 bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <SectionTitle eyebrow="More than dance" title="Karate, public speaking & Zumba" intro="Classes that build strength, discipline and confidence beyond the dance floor." />
          <div className="grid gap-5 md:grid-cols-3">
            {EXTRAS.map((x, i) => (
              <Reveal key={x.id} delay={i * 90} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-line bg-paper">
                  {'img' in x && x.img ? (
                    <Picture img={x.img} alt={`${x.name} class at Gravity Dance Academy`} className="aspect-[16/10] w-full object-cover" />
                  ) : (
                    <div className="grid aspect-[16/10] place-items-center bg-royal">
                      <Icon.mic className="size-16 text-gold" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[15px] font-semibold text-gold-ink">{x.who}</p>
                    <h3 className="text-2xl">{x.name}</h3>
                    <p className="mt-2 text-mute">{x.line}</p>
                    <ul className="mt-4 space-y-2">
                      {x.slots.map((s) => (
                        <li key={s.branch} className="rounded-2xl bg-soft p-3 text-[15px]">
                          <span className="block font-semibold text-royal">{s.branch}</span>
                          <span className="block">📅 {s.days} · 🕒 {s.time}</span>
                          {SHOW_FEES && 'fee' in s && s.fee ? <span className="block text-mute">{rs(s.fee)} / month</span> : null}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-5">
                      <Price fee={x.fee} adm={x.adm} ask={`Hi! I'd like details about the ${x.name} class.`} />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Joining in 3 steps, right where parents read the timetable */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-[1.75rem] md:text-3xl">Joining is easy</h2>
        <ol className="mt-5 grid gap-3 md:grid-cols-3">
          {['Pick a batch above', 'Book a free demo on WhatsApp', 'Come for your first class'].map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-2xl border-2 border-line bg-paper p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-royal font-display text-lg font-bold text-gold">{i + 1}</span>
              <span className="text-[17px] font-semibold">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <h2 className="text-3xl">Not sure which batch?</h2>
            <p className="mt-3 text-mute">Tell us the student’s age and we’ll suggest the right batch.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/join">Book a free demo</Button>
              <Button href={waLink(`Hi! Can you suggest a batch at ${name}?`)} external variant="line">Ask on WhatsApp</Button>
            </div>
          </div>
          <ul className="space-y-3">
            {PERKS.map((p) => <li key={p} className="flex gap-3 rounded-2xl bg-paper p-4"><span className="text-gold-ink" aria-hidden>✓</span>{p}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
