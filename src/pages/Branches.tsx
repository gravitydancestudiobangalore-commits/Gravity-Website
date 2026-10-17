import { BATCHES, BRANCHES, HEBBAL_PHOTOS, HOURS, IMAGES, PHONE_DISPLAY, TEL } from '../data';
import { Button, PageHeader, PhotoGrid, Picture } from '../ui';

function Info({ id }: { id: 'rajajinagar' | 'hebbal' }) {
  const b = BRANCHES[id];
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[15px] font-semibold text-gold-ink">{b.tag}</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{b.name}</h2>
      </div>
      <p className="text-lg">{b.address}</p>
      <p className="rounded-2xl bg-soft p-4 font-medium">📍 {b.landmark}</p>
      <ul className="space-y-1 text-mute">
        <li>Open daily, {HOURS}</li>
        <li>{BATCHES[id].length} batches running</li>
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button href={b.directions} external>Get directions</Button>
        <Button href={TEL} variant="line">Call {PHONE_DISPLAY}</Button>
        <Button to={`/classes${id === 'hebbal' ? '?branch=hebbal' : ''}`} variant="line">Timings</Button>
      </div>
    </div>
  );
}

const Map = ({ id }: { id: 'rajajinagar' | 'hebbal' }) => (
  <iframe title={`Map of the ${BRANCHES[id].name} branch`} src={BRANCHES[id].embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-3xl border border-line md:h-full md:min-h-96" />
);

export default function Branches() {
  return (
    <>
      <PageHeader title="Our branches" intro="Two studios, same classes, same timings. Pick the one closest to you." />

      <section id="rajajinagar" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Info id="rajajinagar" />
          <Map id="rajajinagar" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Picture img={IMAGES.rajajinagarStudio} alt="The Rajajinagar studio with mirrors and gold floor lights" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <Picture img={IMAGES.storefront} alt="The Gravity signboard and entrance on 2nd Cross Road" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section id="hebbal" className="scroll-mt-24 bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <Info id="hebbal" />
            <Map id="hebbal" />
          </div>
          <h3 className="mb-5 mt-14 text-2xl font-bold">Inside the new Hebbal studio</h3>
          <PhotoGrid photos={HEBBAL_PHOTOS} />
        </div>
      </section>
    </>
  );
}
