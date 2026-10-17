// Visibility audit: paste into the browser console on any page of the site (or run via devtools).
// Scrolls every reveal block into view, waits for the safety net, then reports:
//  - images whose URLs fail to load
//  - reveal blocks that never got revealed
//  - elements still effectively invisible (opacity < 0.5), ignoring scroll-reveal transitions that
//    only run while the tab is visible and intentional hover-only labels.
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (const el of document.querySelectorAll('.rv, .words:not(.now)')) { el.scrollIntoView({ block: 'center' }); await sleep(80); }
  await sleep(2800);
  const stuck = [...document.querySelectorAll('.rv, .words:not(.now)')].filter((e) => !e.classList.contains('in')).length;
  const invisible = [...document.querySelectorAll('main *, header *, footer *')].filter((e) => {
    if (e.closest('[aria-hidden="true"], .rv, .words:not(.now)') || ['CANVAS', 'IFRAME', 'svg', 'path', 'circle', 'rect'].includes(e.tagName)) return false;
    const r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8) return false;
    let n = e, op = 1; while (n && n !== document.body) { op *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; }
    return op < 0.5 && !String(e.className).includes('opacity-0');
  }).map((e) => `${e.tagName}.${String(e.className).slice(0, 40)}`);
  const urls = [...new Set([...document.querySelectorAll('img')].flatMap((i) => [i.src, ...(i.srcset || '').split(',').map((s) => s.trim().split(' ')[0])]).filter(Boolean))];
  const bad = [];
  await Promise.all(urls.map(async (u) => { const r = await fetch(u); if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image')) bad.push(`${r.status} ${u}`); }));
  scrollTo(0, 0);
  const out = { page: location.pathname, images: urls.length, badImages: bad, stuckReveals: stuck, invisible: invisible.slice(0, 8) };
  console.table(out);
  return out;
})();
