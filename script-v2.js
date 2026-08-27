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

// 무료 진단 폼 — Formspree로 리드(URL+이메일) 전송
const diagForm = document.getElementById('diagForm');

if (diagForm) {
  const diagMsg = document.getElementById('diagMsg');
  const diagSubmit = diagForm.querySelector('.diag-submit');
  const diagSubmitLabel = diagSubmit.textContent;

  diagForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    diagSubmit.disabled = true;
    diagSubmit.textContent = '전송 중...';
    diagMsg.textContent = '';
    diagMsg.className = 'diag-msg';

    try {
      const response = await fetch(diagForm.action, {
        method: 'POST',
        body: new FormData(diagForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        diagMsg.textContent = '접수되었습니다. 담당자가 확인 후 이메일로 결과를 보내드릴게요.';
        diagMsg.classList.add('is-success');
        diagForm.reset();
      } else {
        throw new Error('submit failed');
      }
    } catch (err) {
      diagMsg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
      diagMsg.classList.add('is-error');
    } finally {
      diagSubmit.disabled = false;
      diagSubmit.textContent = diagSubmitLabel;
    }
  });
}

// 상담 문의 폼 — Formspree로 문의 내용 전송
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const contactMsg = document.getElementById('contactMsg');
  const contactSubmit = contactForm.querySelector('.contact-submit');
  const contactSubmitLabel = contactSubmit.textContent;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    contactSubmit.disabled = true;
    contactSubmit.textContent = '전송 중...';
    contactMsg.textContent = '';
    contactMsg.className = 'diag-msg';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        contactMsg.textContent = '문의가 접수되었습니다. 담당자가 빠르게 연락드릴게요.';
        contactMsg.classList.add('is-success');
        contactForm.reset();
      } else {
        throw new Error('submit failed');
      }
    } catch (err) {
      contactMsg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
      contactMsg.classList.add('is-error');
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.textContent = contactSubmitLabel;
    }
  });
}
