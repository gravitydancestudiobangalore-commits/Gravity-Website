import { useState, type FormEvent } from 'react';
import { BATCHES, BRANCHES, PHONE_DISPLAY, TEL, waLink, type BranchId } from '../data';
import { PageHeader, WaIcon } from '../ui';

type F = { student: string; age: string; parent: string; phone: string; branch: BranchId; batch: string; note: string };
const empty: F = { student: '', age: '', parent: '', phone: '', branch: 'rajajinagar', batch: '', note: '' };

export function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  const age = Number(f.age);
  if (!f.student.trim()) e.student = 'Please enter the student’s name.';
  if (!f.age || !Number.isInteger(age) || age < 3 || age > 80) e.age = 'Please enter an age between 3 and 80.';
  if (age < 18 && !f.parent.trim()) e.parent = 'Parent name is needed for students under 18.';
  if (!/^(\+?91)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Please enter a valid 10-digit mobile number.';
  if (!f.batch) e.batch = 'Please pick a class.';
  return e;
}

export function buildMessage(f: F) {
  const lines = [
    `Student: ${f.student.trim()}`,
    `Age: ${f.age}`,
    f.parent.trim() && `Parent: ${f.parent.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `Branch: ${BRANCHES[f.branch].name}`,
    `Class: ${f.batch}`,
    f.note.trim() && `Note: ${f.note.trim()}`,
  ].filter(Boolean);
  return `Hello Gravity Dance Academy! I would like to book a free demo class.\n\n${lines.join('\n')}`;
}

const input = 'w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base outline-none transition-colors focus:border-royal aria-[invalid=true]:border-[#c0392b]';
const label = 'mb-1.5 block text-[15px] font-semibold';

export default function Join() {
  const [f, setF] = useState<F>(empty);
  const [errs, setErrs] = useState<ReturnType<typeof validate>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof F) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value, ...(k === 'branch' ? { batch: '' } : {}) }));
    setErrs((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrs(v);
    const first = Object.keys(v)[0];
    if (first) return document.getElementById(`f-${first}`)?.focus();
    window.open(waLink(buildMessage(f)), '_blank', 'noopener');
    setSent(true);
  };

  const Err = ({ k }: { k: keyof F }) => errs[k] ? <p id={`e-${k}`} role="alert" className="mt-1.5 text-[15px] text-[#c0392b]">{errs[k]}</p> : null;
  const aria = (k: keyof F) => ({ id: `f-${k}`, 'aria-invalid': !!errs[k], 'aria-describedby': errs[k] ? `e-${k}` : undefined });

  return (
    <>
      <PageHeader title="Book a free demo class" intro="Fill this in and WhatsApp opens with your details ready. Just press send." />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
        <form onSubmit={submit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
            <div><label htmlFor="f-student" className={label}>Student name</label><input {...aria('student')} value={f.student} onChange={set('student')} autoComplete="name" className={input} /><Err k="student" /></div>
            <div><label htmlFor="f-age" className={label}>Age</label><input {...aria('age')} value={f.age} onChange={set('age')} type="number" inputMode="numeric" min={3} max={80} className={input} /><Err k="age" /></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="f-parent" className={label}>Parent name{Number(f.age) >= 18 && <span className="font-normal text-mute"> (optional)</span>}</label><input {...aria('parent')} value={f.parent} onChange={set('parent')} className={input} /><Err k="parent" /></div>
            <div><label htmlFor="f-phone" className={label}>Phone / WhatsApp</label><input {...aria('phone')} value={f.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" className={input} /><Err k="phone" /></div>
          </div>

          <fieldset>
            <legend className={label}>Branch</legend>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(BRANCHES) as BranchId[]).map((id) => (
                <label key={id} className="cursor-pointer">
                  <input type="radio" name="branch" value={id} checked={f.branch === id} onChange={set('branch')} className="peer sr-only" />
                  <span className="block rounded-2xl border border-line py-3 text-center font-semibold transition-colors peer-checked:border-royal peer-checked:bg-royal peer-checked:text-stage peer-focus-visible:outline-2 peer-focus-visible:outline-gold-ink">{BRANCHES[id].name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="f-batch" className={label}>Class</label>
            <select {...aria('batch')} value={f.batch} onChange={set('batch')} className={`${input} ${f.batch ? '' : 'text-mute'}`}>
              <option value="" disabled>Choose a class</option>
              {BATCHES[f.branch].map((b) => {
                const v = `${b.group} – ${b.name}`;
                return <option key={v} value={v}>{v}{b.time ? ` (${b.days}, ${b.time})` : ` (${b.days})`}</option>;
              })}
              <option value="Not sure yet">Not sure yet, please suggest</option>
            </select>
            <Err k="batch" />
          </div>

          <div><label htmlFor="f-note" className={label}>Anything we should know? <span className="font-normal text-mute">(optional)</span></label><textarea id="f-note" rows={3} value={f.note} onChange={set('note')} className={`${input} resize-none`} /></div>

          <button className="flex w-full items-center justify-center gap-2 shine rounded-full bg-royal py-4 text-lg font-semibold text-stage ring-1 ring-gold/50 transition-colors hover:bg-royal-2">
            <WaIcon className="size-5" /> Send on WhatsApp
          </button>
          {sent && <p role="status" className="text-center text-[15px] text-mute">WhatsApp opened with your details. Press send there and we’ll reply soon.</p>}
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-soft p-6">
            <h2 className="text-xl font-bold">How it works</h2>
            <ol className="mt-4 space-y-4">
              {['Send your details on WhatsApp', 'We reply with a batch and time', 'Come in for your free demo class'].map((s, i) => (
                <li key={s} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-royal text-[15px] font-semibold text-stage">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-line p-6">
            <p className="font-semibold">Prefer to call?</p>
            <a href={TEL} className="mt-1 block text-2xl font-bold">{PHONE_DISPLAY}</a>
            <p className="mt-1 text-[15px] text-mute">Monthly fees start at ₹1,500. See Classes & Fees for every batch.</p>
          </div>
        </aside>
      </section>
      {/* Reviews from demo attendees: invite real feedback, no invented quotes */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
        <div className="rounded-3xl bg-royal p-7 text-stage md:p-10">
          <h2 className="text-[1.75rem] text-stage md:text-3xl">Came for a free demo?</h2>
          <p className="mt-2 max-w-2xl text-stage/85">Tell other parents how it went. Your review helps families choose with confidence.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://www.google.com/search?q=Gravity+Dance+Academy+Rajajinagar#lrd=reviews" target="_blank" rel="noopener" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 py-3 font-semibold text-royal">Leave a Google review</a>
            <a href={waLink('Hi! I attended a free demo class and would like to share my feedback.')} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-gold/60 px-6 py-3 font-semibold text-stage"><WaIcon className="size-5" /> Share feedback on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
