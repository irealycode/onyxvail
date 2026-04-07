const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .pillar, .holding-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'rgba(184,152,106,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(184,152,106,0.5)';
    });
  });

  const nav = document.getElementById('nav');
  const pearl = document.getElementById('pearlEl');
  const heroHeight = window.innerHeight;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 80);

    // Pearl scroll effect: drift down, shrink, fade
    const progress = Math.min(y / (heroHeight * 0.75), 1);
    const opacity = 1 - progress;
    const scale = 1 - progress * 0.35;
    const drift = y * 0.22;

    pearl.style.transform = `translate(-50%, calc(-50% + ${drift}px)) scale(${scale})`;
    pearl.style.opacity = opacity;
    // hide completely once gone
    pearl.style.visibility = progress >= 1 ? 'hidden' : 'visible';
  });

  // initial pearl fade-in
  // pearl.style.opacity = 0;
  // pearl.style.transition = 'opacity 2s ease 0.8s';
  setTimeout(() => { pearl.style.opacity = 1;  }, 1800);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));