  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (!isTouchDevice) {
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
  }

  // NAV scroll effect
  const nav = document.getElementById('nav');
  const pearl = document.getElementById('pearlEl');
  const heroHeight = window.innerHeight;
  const hamburgerClose = document.getElementById('hamburger-close');
  let oldY = 0
  let scrollTimeout;
  if (!isTouchDevice){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 80);

      const progress = Math.min(y / (heroHeight * 0.75), 1);
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.35;
      const drift = y * 0.22;
      
      pearl.style.transform = `translate(-50%, calc(-50% + ${drift}px)) scale(${scale})`;
      pearl.style.opacity = opacity;
      pearl.style.visibility = progress >= 1 ? 'hidden' : 'visible';

      if (oldY > y) {
        console.log('going up',ring.style)
        ring.style.height = "60px";
        cursor.style.transform = "translate(-50%,-200%) scale(2.5)"; 
      }else if (oldY < y){
        console.log('going down')
        ring.style.height = "60px";
        cursor.style.transform = "translate(-50%,100%) scale(2.5)"; 

      }
      oldY = y;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        console.log("stable");
        ring.style.height = "36px"
        cursor.style.transform = "translate(-50%,-50%) scale(1)"; 
      }, 150);
      
    });
      
  }else{
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 80);
      hamburgerClose.classList.toggle('scrolled', y > 80);

      const progress = Math.min(y / (heroHeight * 0.75), 1);
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.35;
      const drift = y * 0.22;
      
      pearl.style.transform = `translate(-50%, calc(-50% + ${drift}px)) scale(${scale})`;
      pearl.style.opacity = opacity;
      pearl.style.visibility = progress >= 1 ? 'hidden' : 'visible';
    });
  }

  

  setTimeout(() => { pearl.style.opacity = 1; }, 1800);
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Mobile drawer
  const hamburger = document.getElementById('hamburger');
  
  const drawer = document.getElementById('mobileDrawer');

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburgerClose.classList.toggle('open', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  hamburgerClose.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburgerClose.classList.toggle('open', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });