document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // 1. HERO SLIDESHOW (Exact match to blown.co.in)
  // =========================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroIndicators = document.querySelectorAll('.hero-indicator-dash');
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-sub');

  const heroSlideData = [
    {
      title: "The VR Experience.",
      sub: "Mangalore's premier luxury unisex salon destination for bespoke hair artistry, couture coloring, rejuvenating skin rituals, and modern grooming for women and men."
    },
    {
      title: "Precision & Passion.",
      sub: "From editorial haircuts and beard sculpting to bridal grandeur and luminous hair spas, every service is crafted with precision and passion by Mangalore's master stylists."
    },
    {
      title: "The Gold Standard.",
      sub: "Step into our serene Mangalore sanctuary featuring custom gold-backlit mirrors, fluted marble accents, and private suites designed for pure rejuvenation."
    },
    {
      title: "Our Sanctuary.",
      sub: "Immerse yourself in our serene studio atmosphere designed for complete relaxation, bespoke pampering, and personalized beauty care."
    },
    {
      title: "Tailored Artistry.",
      sub: "Certified master stylists working with premium global care from Kérastase Paris, L'Oréal Professionnel, and Olaplex to bring your signature aesthetic to life."
    }
  ];

  let currentSlide = 0;
  let slideTimer = null;

  function setSlide(index) {
    if (index === currentSlide && heroTitle.classList.contains('visible')) return;

    heroTitle.classList.remove('visible');
    heroSub.classList.remove('visible');

    setTimeout(() => {
      heroSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      heroIndicators.forEach((dash, i) => {
        if (i === index) {
          dash.classList.add('active');
        } else {
          dash.classList.remove('active');
        }
      });

      const data = heroSlideData[index] || heroSlideData[0];
      heroTitle.textContent = data.title;
      heroSub.textContent = data.sub;

      heroTitle.classList.add('visible');
      heroSub.classList.add('visible');

      currentSlide = index;
    }, 380);
  }

  function startSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
      const next = (currentSlide + 1) % heroSlides.length;
      setSlide(next);
    }, 5500);
  }

  setSlide(0);
  startSlideTimer();

  heroIndicators.forEach((dash, i) => {
    dash.addEventListener('click', () => {
      setSlide(i);
      startSlideTimer();
    });
  });

  // =========================================================
  // 2. NAVBAR SCROLL DYNAMICS & OFF-WHITE TRANSITION
  // =========================================================
  const navbar = document.querySelector('.navbar');
  const heroSection = document.getElementById('hero');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 800;

    if (currentScrollY > heroHeight - 80) {
      navbar.classList.add('scrolled-light');
      navbar.classList.remove('scrolled-hero');
    } else if (currentScrollY > 20) {
      navbar.classList.add('scrolled-hero');
      navbar.classList.remove('scrolled-light');
    } else {
      navbar.classList.remove('scrolled-hero', 'scrolled-light');
    }

    if (window.innerWidth < 768) {
      const diff = currentScrollY - lastScrollY;
      if (diff > 8 && currentScrollY > 80) {
        navbar.classList.add('nav-hidden');
      } else if (diff < -8) {
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =========================================================
  // 3. EXPERIENCE SECTION ACCORDION & REAL SALON PREVIEW
  // =========================================================
  const experienceItems = document.querySelectorAll('.experience-item');
  const previewLayers = document.querySelectorAll('.preview-img-layer');

  experienceItems.forEach((item, index) => {
    const activate = () => {
      experienceItems.forEach(el => el.classList.remove('active'));
      previewLayers.forEach(el => el.classList.remove('active'));

      item.classList.add('active');
      if (previewLayers[index]) {
        previewLayers[index].classList.add('active');
      }
    };

    item.addEventListener('mouseenter', activate);
    item.addEventListener('click', activate);
  });

  // =========================================================
  // 4. SERVICES CATEGORY FILTER
  // =========================================================
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle service "Book Service" button click
  const serviceBookBtns = document.querySelectorAll('.service-book-cta');
  serviceBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Custom Styling Service';
      
      // Update embedded booking select
      const embedServiceSelect = document.getElementById('embeddedService');
      if (embedServiceSelect) {
        let found = false;
        for (let i = 0; i < embedServiceSelect.options.length; i++) {
          if (embedServiceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            embedServiceSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          const opt = new Option(serviceName, serviceName, true, true);
          embedServiceSelect.add(opt);
        }
      }

      // Scroll smoothly to the booking section
      const bookingSec = document.getElementById('book-appointment');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Toggle ritual steps drawer inside service cards
  const stepsToggles = document.querySelectorAll('.service-steps-toggle');
  stepsToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = toggle.closest('.service-card');
      const drawer = card ? card.querySelector('.service-steps-drawer') : null;
      if (drawer) {
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
          drawer.classList.remove('open');
          toggle.classList.remove('open');
          toggle.querySelector('span:first-child').textContent = 'View Ritual Steps';
        } else {
          drawer.classList.add('open');
          toggle.classList.add('open');
          toggle.querySelector('span:first-child').textContent = 'Hide Ritual Steps';
        }
      }
    });
  });

  // =========================================================
  // 5. INTERACTIVE CUSTOM PAMPERING PACKAGE CALCULATOR
  // =========================================================
  const packageTiles = document.querySelectorAll('.package-item-tile');
  const calcDurationEl = document.getElementById('calcDuration');
  const calcRegularEl = document.getElementById('calcRegular');
  const calcSavingsEl = document.getElementById('calcSavings');
  const calcTotalEl = document.getElementById('calcTotal');
  const btnBookCustomBundle = document.getElementById('btnBookCustomBundle');

  function updatePackageCalculation() {
    let totalMinutes = 0;
    let regularTotal = 0;
    const selectedServices = [];

    packageTiles.forEach(tile => {
      if (tile.classList.contains('selected')) {
        const price = parseInt(tile.getAttribute('data-price') || '0', 10);
        const duration = parseInt(tile.getAttribute('data-duration') || '0', 10);
        const name = tile.getAttribute('data-name') || '';

        regularTotal += price;
        totalMinutes += duration;
        selectedServices.push(name);
      }
    });

    const hasMultiple = selectedServices.length >= 2;
    const discountRate = hasMultiple ? 0.15 : 0;
    const savings = Math.round(regularTotal * discountRate);
    const finalTotal = regularTotal - savings;

    if (calcDurationEl) calcDurationEl.textContent = `${totalMinutes} mins`;
    if (calcRegularEl) calcRegularEl.textContent = `₹ ${regularTotal.toLocaleString('en-IN')}`;
    if (calcSavingsEl) calcSavingsEl.textContent = savings > 0 ? `- ₹ ${savings.toLocaleString('en-IN')}` : `₹ 0`;
    if (calcTotalEl) calcTotalEl.textContent = `₹ ${finalTotal.toLocaleString('en-IN')}`;

    if (btnBookCustomBundle) {
      const btnSpan = btnBookCustomBundle.querySelector('span:first-child');
      if (selectedServices.length === 0) {
        btnBookCustomBundle.disabled = true;
        btnBookCustomBundle.style.opacity = '0.5';
        if (btnSpan) btnSpan.textContent = 'Select Services Above';
      } else {
        btnBookCustomBundle.disabled = false;
        btnBookCustomBundle.style.opacity = '1';
        if (btnSpan) btnSpan.textContent = `Book Package (${selectedServices.length} Services) via WhatsApp`;
      }
    }

    return { selectedServices, totalMinutes, regularTotal, savings, finalTotal };
  }

  packageTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const isSelected = tile.classList.contains('selected');
      const checkbox = tile.querySelector('.package-checkbox-box');
      if (isSelected) {
        tile.classList.remove('selected');
        if (checkbox) checkbox.textContent = '';
      } else {
        tile.classList.add('selected');
        if (checkbox) checkbox.textContent = '✓';
      }
      updatePackageCalculation();
    });
  });

  if (btnBookCustomBundle) {
    btnBookCustomBundle.addEventListener('click', () => {
      const calcResult = updatePackageCalculation();
      const selected = calcResult.selectedServices;
      if (selected.length === 0) return;

      const servicesList = selected.map((s, i) => `${i + 1}. ${s}`).join('%0A');
      const waMsg = `*Custom Package Booking - VR Unisex Salon Mangalore*%0A%0A` +
        `*Selected Services:*%0A${servicesList}%0A%0A` +
        `*Estimated Duration:* ${calcResult.totalMinutes} mins%0A` +
        `*Bundle Savings (15%):* ₹ ${calcResult.savings}%0A` +
        `*Special Deal Total:* ₹ ${calcResult.finalTotal}%0A%0A` +
        `Please schedule this custom pampering package for me!`;

      window.open(`https://wa.me/918242498811?text=${waMsg}`, '_blank');
    });
  }

  updatePackageCalculation();

  // =========================================================
  // 5. GENDER TOGGLE IN EMBEDDED BOOKING FORM
  // =========================================================
  const genderBtns = document.querySelectorAll('.gender-btn');
  let selectedGender = 'Women';

  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGender = btn.getAttribute('data-gender');
    });
  });

  // Handle Embedded Booking Form Submit -> WhatsApp Message
  const embeddedForm = document.getElementById('embeddedBookingForm');
  if (embeddedForm) {
    embeddedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('embeddedName').value;
      const phone = document.getElementById('embeddedPhone').value;
      const service = document.getElementById('embeddedService').value;
      const date = document.getElementById('embeddedDate').value;
      const timeSlot = document.getElementById('embeddedTime').value;
      const notes = document.getElementById('embeddedNotes').value;

      const waMsg = `*Appointment Booking Request - VR Unisex Salon Mangalore*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Client:* ${encodeURIComponent(selectedGender)}%0A` +
        `*Service:* ${encodeURIComponent(service)}%0A` +
        `*Date:* ${encodeURIComponent(date)}%0A` +
        `*Preferred Time:* ${encodeURIComponent(timeSlot)}%0A` +
        (notes ? `*Special Request:* ${encodeURIComponent(notes)}%0A` : '') +
        `%0APlease confirm my appointment availability!`;

      window.open(`https://wa.me/918242498811?text=${waMsg}`, '_blank');
    });
  }

  // =========================================================
  // 6. MENU DRAWER
  // =========================================================
  const menuBtn = document.getElementById('openMenuBtn');
  const menuBackdrop = document.querySelector('.menu-drawer-backdrop');
  const menuCloseBtn = document.querySelector('.menu-close-btn');
  const menuLinks = document.querySelectorAll('.menu-nav-link');

  function openMenu() {
    menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', (e) => {
      if (e.target === menuBackdrop) closeMenu();
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // =========================================================
  // 7. QUICK MODAL TRIGGER (Header / Floating / Secondary buttons)
  // =========================================================
  const bookingBackdrop = document.querySelector('.booking-modal-backdrop');
  const bookingCloseBtn = document.querySelector('.modal-close-btn');
  const modalTriggers = document.querySelectorAll('.trigger-booking-modal');
  const modalForm = document.getElementById('quickAppointmentForm');

  window.openBookingModal = function() {
    bookingBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeBookingModal() {
    bookingBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Scroll to embedded booking section if on desktop, or open modal
      const embedSec = document.getElementById('book-appointment');
      if (embedSec && !btn.classList.contains('force-modal')) {
        embedSec.scrollIntoView({ behavior: 'smooth' });
      } else {
        openBookingModal();
      }
    });
  });

  if (bookingCloseBtn) bookingCloseBtn.addEventListener('click', closeBookingModal);
  if (bookingBackdrop) {
    bookingBackdrop.addEventListener('click', (e) => {
      if (e.target === bookingBackdrop) closeBookingModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('modalService').value;
      const date = document.getElementById('modalDate').value;
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;

      const waMsg = `*Quick Appointment Booking - VR Unisex Salon Mangalore*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Service:* ${encodeURIComponent(service)}%0A` +
        `*Preferred Date:* ${encodeURIComponent(date)}%0A%0A` +
        `Please confirm my slot!`;

      window.open(`https://wa.me/918242498811?text=${waMsg}`, '_blank');
      closeBookingModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeBookingModal();
    }
  });

  // Ensure Video Reels autoplay
  const videos = document.querySelectorAll('video');
  videos.forEach(v => {
    v.muted = true;
    v.play().catch(() => {});
  });

  // =========================================================
  // GSAP SCROLL ANIMATIONS ENGINE (ScrollTrigger)
  // =========================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Section Headers Stagger Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
      const eyebrow = header.querySelector('.section-eyebrow');
      const title = header.querySelector('.section-title, .about-title');
      const subtitle = header.querySelector('.section-subtitle-text, .about-narrative');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if (eyebrow) {
        tl.from(eyebrow, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
      if (title) {
        tl.from(title, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4');
      }
      if (subtitle) {
        tl.from(subtitle, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4');
      }
    });

    // 2. Experience Accordion Items
    gsap.from('.experience-item', {
      scrollTrigger: {
        trigger: '.experience-list',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.from('.experience-preview-panel', {
      scrollTrigger: {
        trigger: '.experience-preview-panel',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    // 3. Bento Grid Items Stagger & Image Parallax
    gsap.from('.bento-item', {
      scrollTrigger: {
        trigger: '.sanctuary-bento-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      scale: 0.96,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out'
    });

    gsap.utils.toArray('.bento-item img').forEach(img => {
      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });

    // 4. Services Grid Stagger
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 45,
      opacity: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power2.out'
    });

    // 5. Package Builder Card
    gsap.from('.package-builder-wrapper', {
      scrollTrigger: {
        trigger: '.package-builder-wrapper',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      scale: 0.98,
      duration: 0.9,
      ease: 'power3.out'
    });

    // 6. Booking Suite Columns
    gsap.from('.booking-suite-info', {
      scrollTrigger: {
        trigger: '.booking-suite-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -40,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.booking-form-wrap', {
      scrollTrigger: {
        trigger: '.booking-suite-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 40,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    // 7. Amenities Cards
    gsap.from('.amenity-card', {
      scrollTrigger: {
        trigger: '.amenities-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // 8. Reviews Cards
    gsap.from('.review-card', {
      scrollTrigger: {
        trigger: '.reviews-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // 9. Social Reels Cards
    gsap.from('.reel-card', {
      scrollTrigger: {
        trigger: '.social-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // 10. Visit Section (Info Card & Map Canvas)
    gsap.from('.visit-info-card', {
      scrollTrigger: {
        trigger: '.visit-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.visit-map-container', {
      scrollTrigger: {
        trigger: '.visit-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    // 11. Floating Action Bar Animation on Scroll
    gsap.set('.floating-action-bar', { y: 70, opacity: 0 });
    ScrollTrigger.create({
      start: '200px top',
      onEnter: () => gsap.to('.floating-action-bar', { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to('.floating-action-bar', { y: 70, opacity: 0, duration: 0.35, ease: 'power2.in' })
    });
  }
});
