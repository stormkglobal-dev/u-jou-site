/* ================================================
   U-JOU v2 — Smooth Scroll (Lenis)
   ================================================ */

const lenis = new Lenis({
  duration: 1.25,                                   // 값이 클수록 더 묵직하고 느리게 감속
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out expo: 초반 빠르고 끝에서 부드럽게
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 고정 네브바 높이만큼 오프셋을 주고, 내부 앵커(#services 등) 클릭 시 Lenis로 부드럽게 이동
const NAV_OFFSET = -90;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target, { offset: NAV_OFFSET });
  });
});

// 모바일 헤더(햄버거) 토글
const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (navHamburger && mobileMenu) {
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    navHamburger.setAttribute('aria-expanded', 'false');
  };

  navHamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navHamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}
