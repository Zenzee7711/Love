/* ============================================
   Valentine's Day Website — Shared JavaScript
   Handles: Navigation, Floating Hearts,
   Particles, Gallery, Letter Animation,
   Page Transitions, Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPageTransition();
  initScrollReveal();
  initFloatingHearts();
  initGallery();
  initLetterAnimation();
  initParticles();
  initParallax();
});

/* ========== Navigation ========== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!navbar) return;

  // Scroll effect — add background on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Trigger on load in case already scrolled
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ========== Page Transitions ========== */
function initPageTransition() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Fade out the overlay on load
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 100);

  // Add transition on link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only apply to local pages
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });
}

/* ========== Scroll Reveal ========== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* ========== Floating Hearts (Home Page) ========== */
function initFloatingHearts() {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let hearts = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Heart {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 14 + 6;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.35 + 0.08;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.y -= this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.3;
      this.rotation += this.rotationSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#b22233';
      ctx.beginPath();

      const s = this.size;
      // Heart shape using bezier curves
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
      ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);

      ctx.fill();
      ctx.restore();
    }
  }

  // Create initial hearts
  const heartCount = Math.min(Math.floor(canvas.width / 40), 35);
  for (let i = 0; i < heartCount; i++) {
    const heart = new Heart();
    heart.y = Math.random() * canvas.height;  // randomize starting position
    hearts.push(heart);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pause when tab not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

/* ========== Photo Gallery & Lightbox ========== */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');

  if (galleryItems.length === 0 || !lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ========== Letter Animation ========== */
function initLetterAnimation() {
  const envelopeWrap = document.getElementById('envelopeWrap');
  const readBtn = document.getElementById('readLetterBtn');
  const letterFull = document.getElementById('letterFull');
  const hint = document.getElementById('envelopeHint');

  // If envelope structure exists, use envelope interaction
  if (envelopeWrap && readBtn && letterFull) {
    readBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Hide hint
      if (hint) hint.classList.add('hidden');
      // Fly the envelope away
      envelopeWrap.classList.add('fly');
      // After fly animation, reveal the letter
      setTimeout(function () {
        envelopeWrap.classList.add('hidden');
        letterFull.classList.remove('letter-hidden');
        letterFull.classList.add('letter-reveal');
        // Trigger letter text fade-in animation
        setTimeout(function () {
          const letterCard = letterFull.querySelector('.letter-card');
          if (letterCard) letterCard.classList.add('animate');
        }, 400);
      }, 750);
    });

    // Also allow mobile tap on envelope to open flap
    const envForm = document.getElementById('envelope_form');
    if (envForm) {
      envForm.addEventListener('click', function () {
        envForm.classList.add('env-tapped');
      });
    }
    return;
  }

  // Fallback: original scroll-based animation (if no envelope)
  const letterCard = document.querySelector('.letter-card');
  if (!letterCard) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        letterCard.classList.add('animate');
        observer.unobserve(letterCard);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(letterCard);
}

/* ========== Particle.js Hearts (Particles Page) ========== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Track mouse for interactivity
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.parentElement.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.baseSpeedX = (Math.random() - 0.5) * 0.5;
      this.baseSpeedY = (Math.random() - 0.5) * 0.5;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.isHeart = Math.random() > 0.7;
      this.heartSize = Math.random() * 6 + 4;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulse += 0.02;

      // Mouse interaction — soft repulsion
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.speedX = this.baseSpeedX + (dx / dist) * force * 1.5;
          this.speedY = this.baseSpeedY + (dy / dist) * force * 1.5;
        } else {
          this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
          this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
        }
      }

      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.save();
      const pulseScale = 1 + Math.sin(this.pulse) * 0.1;
      ctx.globalAlpha = this.opacity * (0.8 + Math.sin(this.pulse) * 0.2);

      if (this.isHeart) {
        // Draw heart particle
        ctx.translate(this.x, this.y);
        ctx.scale(pulseScale, pulseScale);
        ctx.fillStyle = '#f4c2c2';
        ctx.beginPath();
        const s = this.heartSize;
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
        ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
        ctx.fill();
      } else {
        // Draw dot particle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Create particles
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 6000), 120);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  // Draw connecting lines between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(244, 194, 194, ${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

/* ========== Parallax Effect (Particles Page) ========== */
function initParallax() {
  const bgImage = document.querySelector('.particles-bg-image');
  if (!bgImage) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bgImage.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });
}
