/**
 * Luke Jones Furniture - Premium JavaScript
 * GSAP Animations, Lenis Smooth Scroll, Custom Cursor
 * Award-winning quality interactions
 */

(function() {
  'use strict';

  // ==========================================================================
  // Initialize GSAP
  // ==========================================================================
  gsap.registerPlugin(ScrollTrigger);

  // ==========================================================================
  // Lenis Smooth Scroll
  // ==========================================================================
  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // ==========================================================================
  // Custom Cursor
  // ==========================================================================
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    if (!cursor || !cursorDot || window.innerWidth < 1024) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // Smooth follow for outer cursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor-text], .portfolio-horizontal__item, .portfolio-item');

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        if (el.dataset.cursorText) {
          cursor.classList.add('hover-text');
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover', 'hover-text');
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
  }

  // ==========================================================================
  // Magnetic Buttons
  // ==========================================================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('[data-magnetic]');

    if (window.innerWidth < 1024) return;

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // ==========================================================================
  // Preloader
  // ==========================================================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      // Wait for preloader animation to complete
      setTimeout(() => {
        preloader.classList.add('hidden');

        // Start hero animations after preloader
        setTimeout(() => {
          animateHero();
        }, 300);
      }, 2500);
    });
  }

  // ==========================================================================
  // Hero Animations
  // ==========================================================================
  function animateHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const heroImage = hero.querySelector('.hero__image');
    const eyebrow = hero.querySelector('.hero__eyebrow');
    const titleLines = hero.querySelectorAll('.hero__title .line-inner');
    const subtitle = hero.querySelector('.hero__subtitle');
    const cta = hero.querySelector('.hero__cta');
    const scroll = hero.querySelector('.hero__scroll');

    const tl = gsap.timeline();

    // Image zoom out
    if (heroImage) {
      tl.to(heroImage, {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, 0);
    }

    // Eyebrow
    if (eyebrow) {
      tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, 0.3);
    }

    // Title lines
    titleLines.forEach((line, i) => {
      tl.to(line, {
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, 0.5 + (i * 0.1));
    });

    // Subtitle
    if (subtitle) {
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, 0.9);
    }

    // CTA
    if (cta) {
      tl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, 1.1);
    }

    // Scroll indicator
    if (scroll) {
      tl.to(scroll, {
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, 1.3);
    }

    // Hero parallax
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  // ==========================================================================
  // Header
  // ==========================================================================
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    ScrollTrigger.create({
      start: 'top -100',
      onUpdate: (self) => {
        if (self.scroll() > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================
  function initMobileNav() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');

      if (mobileNav.classList.contains('active')) {
        lenis?.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenis?.start();
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    const links = mobileNav.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        lenis?.start();
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        lenis?.start();
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  function initRevealAnimations() {
    // Data attribute reveals
    const dataElements = document.querySelectorAll('[data-reveal]');

    dataElements.forEach((el) => {
      const delay = el.dataset.revealDelay ? parseFloat(el.dataset.revealDelay) * 0.1 : 0;

      gsap.fromTo(el,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Class-based reveals (for .reveal class)
    const classElements = document.querySelectorAll('.reveal');

    classElements.forEach((el) => {
      // Get delay from class name
      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.1;
      if (el.classList.contains('reveal-delay-2')) delay = 0.2;
      if (el.classList.contains('reveal-delay-3')) delay = 0.3;
      if (el.classList.contains('reveal-delay-4')) delay = 0.4;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay * 1000);
        }
      });
    });

    // Image reveals
    const imgReveals = document.querySelectorAll('.img-reveal');
    imgReveals.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          onEnter: () => el.classList.add('revealed')
        }
      });
    });
  }

  // ==========================================================================
  // Draggable Portfolio Carousel
  // ==========================================================================
  function initHorizontalScroll() {
    const track = document.getElementById('portfolioTrack');
    if (!track) return;

    const items = track.querySelectorAll('.portfolio-horizontal__item');
    if (items.length === 0) return;

    // Draggable carousel instead of scroll hijacking
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let animationFrame = null;

    const wrapper = track.parentElement;

    // Mouse events
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      lastX = e.pageX;
      track.style.cursor = 'grabbing';
      cancelAnimationFrame(animationFrame);
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      wrapper.scrollLeft = scrollLeft - walk;
      velocity = e.pageX - lastX;
      lastX = e.pageX;
    });

    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', endDrag);

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';

      // Momentum scroll
      const momentum = () => {
        if (Math.abs(velocity) > 0.5) {
          wrapper.scrollLeft -= velocity;
          velocity *= 0.95;
          animationFrame = requestAnimationFrame(momentum);
        }
      };
      momentum();
    }

    // Touch events for mobile
    track.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      lastX = e.touches[0].pageX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      wrapper.scrollLeft = scrollLeft - walk;
      velocity = e.touches[0].pageX - lastX;
      lastX = e.touches[0].pageX;
    }, { passive: true });

    track.addEventListener('touchend', endDrag);

    // Set initial cursor
    track.style.cursor = 'grab';

    // Reveal animation on scroll into view
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.portfolio-horizontal',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // ==========================================================================
  // Scroll to Top
  // ==========================================================================
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    ScrollTrigger.create({
      start: 'top -600',
      onUpdate: (self) => {
        if (self.scroll() > 600) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }
    });

    btn.addEventListener('click', () => {
      lenis?.scrollTo(0, { duration: 1.5 });
    });
  }

  // ==========================================================================
  // Portfolio Page
  // ==========================================================================
  function initPortfolioPage() {
    const filters = document.querySelectorAll('.portfolio-filter');
    const items = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');

    if (filters.length === 0) return;

    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      filterItems(category);
      filters.forEach((f) => {
        f.classList.remove('active');
        if (f.dataset.filter === category) f.classList.add('active');
      });
    }

    // Filter click handlers
    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        filters.forEach((f) => f.classList.remove('active'));
        filter.classList.add('active');
        filterItems(filter.dataset.filter);
      });
    });

    function filterItems(cat) {
      items.forEach((item, i) => {
        const itemCat = item.dataset.category;
        const show = cat === 'all' || itemCat === cat;

        gsap.to(item, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.95,
          duration: 0.4,
          delay: show ? i * 0.05 : 0,
          ease: 'power2.out',
          onStart: () => {
            if (show) item.style.display = '';
          },
          onComplete: () => {
            if (!show) item.style.display = 'none';
          }
        });
      });
    }

    // Lightbox
    if (lightbox) {
      const lightboxImage = document.getElementById('lightboxImage');
      const lightboxCategory = document.getElementById('lightboxCategory');
      const lightboxTitle = document.getElementById('lightboxTitle');
      const closeBtn = lightbox.querySelector('.lightbox__close');
      const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
      const nextBtn = lightbox.querySelector('.lightbox__nav--next');

      let currentIndex = 0;
      let visibleItems = [];

      function updateVisible() {
        visibleItems = Array.from(items).filter((item) => item.style.display !== 'none');
      }

      function openLightbox(index) {
        updateVisible();
        currentIndex = index;
        showImage();
        lightbox.classList.add('active');
        lenis?.stop();
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        lenis?.start();
      }

      function showImage() {
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = item.querySelector('img');
        const category = item.querySelector('.portfolio-item__category');
        const title = item.querySelector('.portfolio-item__title');

        lightboxImage.src = img.src;
        lightboxCategory.textContent = category?.textContent || '';
        lightboxTitle.textContent = title?.textContent || '';
      }

      items.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          updateVisible();
          openLightbox(visibleItems.indexOf(item));
        });
      });

      closeBtn?.addEventListener('click', closeLightbox);
      prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage();
      });
      nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showImage();
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % visibleItems.length;
          showImage();
        }
        if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
          showImage();
        }
      });
    }
  }

  // ==========================================================================
  // Contact Form
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    if (!form) return;

    const groups = form.querySelectorAll('.form-group');

    // Real-time validation
    groups.forEach((group) => {
      const input = group.querySelector('input, select, textarea');
      if (!input) return;

      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (group.classList.contains('error')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (valid) {
        const btn = form.querySelector('.contact-form__submit');
        btn.disabled = true;
        btn.innerHTML = '<span>Sending...</span>';

        setTimeout(() => {
          form.style.display = 'none';
          if (success) success.classList.add('active');
        }, 1500);
      }
    });

    function validateField(field) {
      const group = field.closest('.form-group');
      if (!group) return true;

      const value = field.value.trim();
      let valid = true;

      if (field.hasAttribute('required') && !value) valid = false;
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;
      if (field.type === 'tel' && value && !/^[\d\s\+\-\(\)]{10,}$/.test(value)) valid = false;

      group.classList.toggle('error', !valid);
      return valid;
    }
  }

  // ==========================================================================
  // Initialize Everything
  // ==========================================================================
  function init() {
    initLenis();
    initCursor();
    initMagneticButtons();
    initPreloader();
    initHeader();
    initMobileNav();
    initRevealAnimations();
    initHorizontalScroll();
    initScrollTop();
    initPortfolioPage();
    initContactForm();

    // Console message
    console.log(
      '%c Luke Jones Furniture ',
      'background: #c9a66b; color: #0a0a0a; padding: 12px 24px; font-family: Georgia, serif; font-size: 14px;'
    );
    console.log(
      '%c Bespoke furniture, handcrafted in Hertfordshire ',
      'color: #8a857d; font-family: sans-serif; font-size: 12px;'
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
