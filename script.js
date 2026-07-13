// Karamel landing · interactions

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Nav border/shadow once scrolled
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2) Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// 3) Hero draft types itself out (our equivalent of Modal's animated hero)
const draftEl = document.getElementById('type-draft');
if (draftEl) {
  const full = draftEl.dataset.text || draftEl.textContent;
  if (!prefersReduced) {
    draftEl.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    draftEl.appendChild(caret);
    let i = 0;
    const type = () => {
      if (i < full.length) {
        caret.insertAdjacentText('beforebegin', full.charAt(i));
        i += 1;
        setTimeout(type, 16 + Math.random() * 26);
      }
    };
    setTimeout(type, 600);
  }
}

// 4) Demo approve chips: tapping one highlights it (illustrative only)
document.querySelectorAll('.approve').forEach((group) => {
  group.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-on'));
      chip.classList.add('is-on');
    });
  });
});

// 5) Waitlist form. Wired for Formspree. Until you add a form ID it falls back to
// a graceful local confirm, so it works in preview. To go live: create a free form
// at https://formspree.io and replace FORM_ENDPOINT with https://formspree.io/f/XXXXXXXX
const FORM_ENDPOINT = 'https://formspree.io/f/your_form_id';
const form = document.getElementById('waitlist-form');
const msg = document.getElementById('form-msg');

function formOk() {
  form.reset();
  msg.textContent = 'You are on the list. We will be in touch when your spot opens.';
  msg.classList.add('is-ok');
}
function formErr(text) {
  msg.textContent = text;
  msg.classList.remove('is-ok');
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      formErr('Enter a valid email and we will save your spot.');
      return;
    }
    // Not wired yet: confirm locally so preview still feels real.
    if (FORM_ENDPOINT.includes('your_form_id')) { formOk(); return; }
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) formOk();
      else formErr('Something went wrong. Try again in a moment.');
    } catch (_) {
      formErr('Network error. Try again in a moment.');
    }
  });
}
