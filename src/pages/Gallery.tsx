import { useState } from 'react';
import { PHOTOS, SOCIAL, VIDEOS } from '../data';
import { Button, InstagramIcon, PageHeader, PhotoGrid, Video, YoutubeIcon } from '../ui';

export default function Gallery() {
  const [tab, setTab] = useState<'videos' | 'photos'>('videos');
  const wide = VIDEOS.filter((v) => !v.vertical);
  const shorts = VIDEOS.filter((v) => v.vertical);
  return (
    <>
      <PageHeader title="Gallery" intro="Performances, classes and shows. Tap a video to play.">
        <div role="tablist" aria-label="Gallery type" className="mt-8 inline-flex rounded-full border border-line bg-paper p-1">
          {(['videos', 'photos'] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2.5 text-[15px] font-semibold capitalize transition-colors ${tab === t ? 'bg-royal text-stage ring-1 ring-gold/50' : 'text-mute hover:text-ink'}`}>
              {t}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20" role="tabpanel">
        {tab === 'videos' ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">{wide.map((v) => <Video key={v.id} {...v} />)}</div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{shorts.map((v) => <Video key={v.id} {...v} />)}</div>
          </>
        ) : (
          <PhotoGrid photos={PHOTOS} />
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-24 md:grid-cols-2 md:px-8">
        <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="flex items-center justify-between gap-4 rounded-3xl border border-line p-6 hover:border-gold">
          <span>
            <span className="flex items-center gap-2 font-semibold"><InstagramIcon className="size-5" /> Instagram</span>
            <span className="mt-1 block text-[15px] text-mute">{SOCIAL.instagramHandle} · {SOCIAL.instagramFollowers} followers · {SOCIAL.instagramPosts} posts</span>
          </span>
          <span aria-hidden>→</span>
        </a>
        <a href={SOCIAL.youtube} target="_blank" rel="noopener" className="flex items-center justify-between gap-4 rounded-3xl border border-line p-6 hover:border-gold">
          <span>
            <span className="flex items-center gap-2 font-semibold"><YoutubeIcon className="size-5" /> YouTube</span>
            <span className="mt-1 block text-[15px] text-mute">{SOCIAL.youtubeHandle} · new videos every week</span>
          </span>
          <span aria-hidden>→</span>
        </a>
        <div className="md:col-span-2"><Button to="/join" className="mt-4">Book a free demo</Button></div>
      </section>
    </>
  );
}
