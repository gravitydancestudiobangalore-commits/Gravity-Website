import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Hide-then-reveal styles only apply when JS can actually reveal things again.
if ('IntersectionObserver' in window) document.documentElement.classList.add('js');

// Fallback reveal: if the observer ever misses, reveal blocks as they scroll on screen.
let ticking = false;
const revealOnScreen = () => {
  ticking = false;
  for (const el of document.querySelectorAll('.rv:not(.in), .words:not(.in):not(.now)')) {
    if (el.getBoundingClientRect().top < innerHeight * 0.95) el.classList.add('in');
  }
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; setTimeout(revealOnScreen, 120); } }, { passive: true });
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && revealOnScreen());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
