/* ═══════════════════════════════════════════════════════════
   Jack Weinkselbaum — Personal Site
   Scroll animations powered by GSAP + ScrollTrigger
   ═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─── Year ─── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Nav toggle (mobile) ─── */
  const navToggle     = document.getElementById("nav-toggle");
  const mobileOverlay = document.getElementById("mobile-nav-overlay");
  const mobileLinks   = document.querySelectorAll(".mobile-nav a");

  function closeMobileNav() {
    navToggle.classList.remove("open");
    mobileOverlay.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.toggle("open");
      mobileOverlay.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      mobileOverlay.setAttribute("aria-hidden", String(!isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileNav));
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) closeMobileNav();
    });
  }

  /* ─── Nav scroll state ─── */
  const siteHeader = document.getElementById("site-header");
  const navLinks   = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));


  /* ─── Respect reduced-motion preference ─── */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return; // CSS already handles the no-animation state


  /* ═══════════════════════════════════════════════════════
     GSAP ANIMATIONS
     ═══════════════════════════════════════════════════════ */
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    /* GSAP not loaded (offline?) — make everything visible */
    document.querySelectorAll(".name-line, .line-wrap span").forEach((el) => {
      el.style.transform = "none";
    });
    document.querySelectorAll(
      ".hero-eyebrow, .hero-tagline, .hero-cta, #hero-visual, #scroll-hint, .reveal-fade, .reveal-card"
    ).forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ─── Smooth default eases ─── */
  const EASE_OUT   = "power3.out";
  const EASE_EXPO  = "expo.out";
  const EASE_BACK  = "back.out(1.4)";


  /* ══════════════
     HERO — on load
     ══════════════ */
  const heroTl = gsap.timeline({ defaults: { ease: EASE_OUT } });

  heroTl
    /* Nav fades in first */
    .from("#site-header", { opacity: 0, y: -16, duration: 0.7 })

    /* Eyebrow slides in */
    .to("#hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")

    /* Name lines cascade up */
    .to(".name-line", {
      y: "0%",
      stagger: 0.1,
      duration: 1.1,
      ease: EASE_EXPO,
    }, "-=0.35")

    /* Tagline fades in */
    .to("#hero-tagline", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")

    /* CTAs */
    .to("#hero-cta", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")

    /* Photo side */
    .to("#hero-visual", { opacity: 1, y: 0, scale: 1, duration: 1, ease: EASE_BACK }, "-=0.8")

    /* Scroll hint */
    .to("#scroll-hint", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");


  /* ══════════════════
     MOUSE PARALLAX (hero orbs follow cursor)
     ══════════════════ */
  const heroOrbs = document.querySelectorAll(".hero-orb");
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchDevice) {
    document.addEventListener("mousemove", (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      heroOrbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.012;
        gsap.to(orb, {
          x: dx * factor,
          y: dy * factor,
          duration: 2,
          ease: "power2.out",
        });
      });
    });
  }


  /* ════════════════════
     SCROLL ANIMATIONS
     ════════════════════ */

  /* Utility: reveal headline lines */
  function revealHeadline(el, triggerEl) {
    const spans = el.querySelectorAll(".line-wrap span");
    gsap.to(spans, {
      y: "0%",
      stagger: 0.1,
      duration: 1.1,
      ease: EASE_EXPO,
      scrollTrigger: {
        trigger: triggerEl || el,
        start: "top 82%",
      },
    });
  }

  /* Utility: reveal fade (opacity + y) */
  function revealFade(el, delay = 0) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: EASE_OUT,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 84%",
      },
    });
  }

  /* Utility: staggered card reveal */
  function revealCards(selector, triggerEl, staggerDelay = 0.12) {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      stagger: staggerDelay,
      duration: 0.85,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: triggerEl || cards[0].parentElement,
        start: "top 80%",
      },
    });
  }


  /* ── About ── */
  revealHeadline(document.querySelector(".about .reveal-headline"), ".about");
  document.querySelectorAll(".about .reveal-fade").forEach((el) => revealFade(el));
  revealCards(".about .reveal-card", ".about-steps");


  /* ── Work ── */
  revealHeadline(document.querySelector(".work .reveal-headline"), ".work");

  gsap.to(".bento-card", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.85,
    ease: EASE_OUT,
    scrollTrigger: { trigger: ".bento-grid", start: "top 78%" },
  });


  /* ── Interests ── */
  revealHeadline(document.querySelector(".interests .reveal-headline"), ".interests");

  gsap.to(".interest-card", {
    opacity: 1,
    y: 0,
    stagger: 0.13,
    duration: 0.85,
    ease: EASE_OUT,
    scrollTrigger: { trigger: ".interests-grid", start: "top 78%" },
  });


  /* ── Gallery ── */
  revealHeadline(document.querySelector(".gallery .reveal-headline"), ".gallery");
  document.querySelectorAll(".gallery .reveal-fade").forEach((el) => revealFade(el));

  gsap.to(".gallery-item", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.9,
    ease: EASE_OUT,
    scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
  });

  /* Gallery parallax — images shift at different rates on scroll */
  document.querySelectorAll(".gallery-item img").forEach((img, i) => {
    const shift = (i % 2 === 0) ? -18 : 18;
    gsap.fromTo(img,
      { y: -shift },
      {
        y: shift,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });


  /* ── Connect ── */
  revealHeadline(document.querySelector(".connect .reveal-headline"), ".connect");
  document.querySelectorAll(".connect .reveal-fade").forEach((el) => revealFade(el));


  /* ── About section — subtle parallax on sticky heading ── */
  gsap.to(".about-sticky .reveal-headline", {
    yPercent: -6,
    ease: "none",
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom center",
      scrub: true,
    },
  });


  /* ── Scroll-linked orb drift in connect section ── */
  const connectOrbs = document.querySelectorAll(".connect-orb");
  connectOrbs.forEach((orb, i) => {
    gsap.fromTo(orb,
      { yPercent: 20 },
      {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".connect",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });


  /* ══════════════════════
     HOVER — Bento tilt effect
     ══════════════════════ */
  if (!isTouchDevice) {
    document.querySelectorAll(".bento-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 4,
          rotateY:  x * 4,
          transformPerspective: 800,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }


  /* ══════════════════════
     CARD MODAL
     ══════════════════════ */
  const cardModal      = document.getElementById("card-modal");
  const cardModalInner = document.getElementById("card-modal-inner");

  function openCardModal(card) {
    const clone = card.cloneNode(true);

    // Determine type for accent styling
    cardModalInner.className = "card-modal-inner";
    if (card.classList.contains("pillar")) cardModalInner.classList.add("is-pillar");
    const accent = card.getAttribute("data-accent");
    if (accent) cardModalInner.classList.add(`accent-${accent}`);

    cardModalInner.innerHTML = `
      <button class="card-modal-close" id="card-modal-close-btn" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      ${clone.innerHTML}
    `;

    document.getElementById("card-modal-close-btn")
      .addEventListener("click", closeCardModal);

    cardModal.classList.add("open");
    cardModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Backdrop fade
    gsap.fromTo(cardModal,
      { opacity: 0 },
      { opacity: 1, duration: 0.28, ease: "power2.out", overwrite: true }
    );

    // Card spins and springs in
    gsap.fromTo(cardModalInner,
      { scale: 0.25, rotation: -135, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.65, ease: "back.out(2.1)", overwrite: true }
    );

    // Content elements stagger up after card lands
    const contentEls = cardModalInner.querySelectorAll(
      ".pillar-number, .bento-tag, .interest-icon, .interest-chip, h3, p"
    );
    gsap.fromTo(contentEls,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", stagger: 0.07, delay: 0.22, overwrite: true }
    );
  }

  function closeCardModal() {
    gsap.to(cardModalInner, {
      scale: 0.88, y: 28, opacity: 0, rotation: 2,
      duration: 0.22, ease: "power2.in", overwrite: true
    });
    gsap.to(cardModal, {
      opacity: 0, duration: 0.28, ease: "power2.in", overwrite: true,
      onComplete: () => {
        cardModal.classList.remove("open");
        cardModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }

  document.querySelectorAll(".pillar, .bento-card, .interest-card").forEach((card) => {
    card.addEventListener("click", () => {
      // Card spins on the page
      gsap.to(card, {
        rotation: 360, scale: 1.06, duration: 0.42, ease: "back.out(1.3)",
        onComplete: () => gsap.set(card, { rotation: 0, scale: 1 })
      });
      // Modal opens just after spin starts
      gsap.delayedCall(0.08, () => openCardModal(card));
    });
  });

  cardModal.addEventListener("click", (e) => {
    if (e.target === cardModal) closeCardModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCardModal();
  });


  /* ══════════════════════
     LIGHTBOX
     ══════════════════════ */
  const lightbox      = document.getElementById("lightbox");
  const lightboxImg   = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    const img = item.querySelector("img");
    item.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });


  /* ══════════════════════
     SMOOTH SCROLL for nav links
     ══════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    });
  });

}); /* end DOMContentLoaded */
