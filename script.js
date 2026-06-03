const committeeData = {
  unhrc: {
    title: "UNHRC",
    name: "United Nations Human Rights Council",
    agenda:
      "Institutional Denial of Identity and Essential Rights of Children in Gaza, Syria, and Yemen: Examining Statelessness, Lack of Birth Registration, and Restricted Access to Healthcare, Education, and Humanitarian Aid under Armed Conflict and Blockades.",
    points: [
      "Statelessness",
      "Birth registration",
      "Healthcare and education access",
      "Humanitarian aid under blockades",
    ],
  },

  unsc: {
    title: "UNSC",
    name: "United Nations Security Council",
    agenda:
      "Addressing Cyber and Information Warfare Between the United States and the Islamic Republic of Iran and Its Implications for International Peace and Security",
    points: [
      "Cyber operations",
      "Information warfare",
      "Escalation control",
      "International peace and security",
    ],
  },

  disec: {
    title: "DISEC",
    name: "Disarmament and International Security Committee",
    agenda:
      "From Human Judgment to Algorithmic Warfare: Regulating the Deployment of Lethal Autonomous Weapons Systems and AI-Enabled Targeting in Gaza and the Wider Middle East, with Special Focus on Civilian Harm, Distinction, Escalation Risks, and the Erosion of Accountability and Command Responsibility.",
    points: [
      "Lethal autonomous weapons",
      "AI-enabled targeting",
      "Civilian harm",
      "Command responsibility",
    ],
  },

  imf: {
    title: "IMF",
    name: "International Monetary Fund",
    agenda:
      "Mitigating Financial Instability Arising from the Adoption of Central Bank Digital Currencies: Addressing Capital Flight, Banking Disintermediation, and Cross-Border Payment Disruptions in Vulnerable Economies.",
    points: [
      "Central bank digital currencies",
      "Capital flight",
      "Banking disintermediation",
      "Cross-border payment disruption",
    ],
  },

  unga: {
    title: "UNGA",
    name: "United Nations General Assembly",
    agenda:
      "Placeholder agenda: Strengthening multilateral cooperation for equitable development, climate resilience, and institutional reform.",
    points: [
      "Global cooperation",
      "Climate resilience",
      "Development equity",
      "Institutional reform",
    ],
  },

  icc: {
    title: "ICC",
    name: "International Criminal Court",
    agenda:
      "Establishing Individual Criminal Responsibility for Siege Warfare, Starvation, and Conflict-Related Sexual Violence During the RSF Assault on El Fasher, Darfur.",
    points: [
      "Individual criminal responsibility",
      "Siege warfare",
      "Starvation as a method of war",
      "Conflict-related sexual violence",
    ],
  },
};

const videoData = {
  trailer: {
    title: "Official Trailer",
    label: "TRAILER",
    src: "media/hfsmun-2026-trailer.mp4",
    copy:
      "The main cinematic launch film for HFSMUN 2026. Replace this placeholder with the final trailer file.",
  },

  teaser: {
    title: "Launch Teaser",
    label: "TEASER",
    src: "media/hfsmun-2026-teaser.mp4",
    copy:
      "A short reveal cut for social launch, press momentum, and registration energy.",
  },

  promo: {
    title: "Promotional Video",
    label: "PROMOTIONAL",
    src: "media/hfsmun-2026-promotional.mp4",
    copy:
      "A delegate-facing promotional film slot for the final HFSMUN campaign video.",
  },
};

const header = document.getElementById("siteHeader");
const nav = document.getElementById("mainNav");
const menuToggle = document.querySelector(".menu-toggle");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

init();

function init() {
  setupNavigation();
  setupRevealAnimations();
  setupInteractiveCards();
  setupScrollVfx();
  setupCursorTrail();
  setupVideos();
  setupModals();
  setupFaqs();
  setupContactForm();
  setupParticles();
}


function setupNavigation() {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-dropdown > button").forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".nav-dropdown");
      parent.classList.toggle("open");

      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        if (dropdown !== parent) {
          dropdown.classList.remove("open");
        }
      });
    });
  });

  document.querySelectorAll('.main-nav a[href^="#"], .brand[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) {
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const label = entry.target.dataset.nav;

        document.querySelectorAll(".main-nav a, .main-nav button").forEach((item) => {
          item.classList.toggle("active", item.textContent.trim() === label);
        });
      });
    },
    { threshold: 0.35 },
  );

  document.querySelectorAll("[data-nav]").forEach((section) => {
    activeObserver.observe(section);
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -7% 0px",
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

function setupScrollVfx() {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;

    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  update();

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupInteractiveCards() {
  document.querySelectorAll(".interactive-card, .magnetic").forEach((element) => {
    element.addEventListener("pointerenter", () => {
      element.classList.remove("is-popping");
      void element.offsetWidth;
      element.classList.add("is-popping");

      window.setTimeout(() => {
        element.classList.remove("is-popping");
      }, 480);
    });

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      element.style.setProperty("--card-x", event.clientX - rect.left + "px");
      element.style.setProperty("--card-y", event.clientY - rect.top + "px");

      if (element.classList.contains("interactive-card")) {
        element.style.transform =
          `translateY(-22px) scale(1.105) rotateX(${-y * 9}deg) rotateY(${x * 10}deg)`;
      } else {
        element.style.transform =
          `translate(${x * 9}px, ${y * 9}px) scale(1.075)`;
      }
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });

  window.addEventListener(
    "pointermove",
    (event) => {
      mouse = {
        x: event.clientX,
        y: event.clientY,
      };

      document.documentElement.style.setProperty("--mx", event.clientX + "px");
      document.documentElement.style.setProperty("--my", event.clientY + "px");
    },
    { passive: true },
  );
}

function setupCursorTrail() {
  const holder = document.getElementById("cursorTrail");

  if (!holder || window.matchMedia("(pointer: coarse)").matches) return;

  const dots = Array.from({ length: 13 }, (_, index) => {
    const dot = document.createElement("span");

    dot.className = "cursor-trail-dot";
    dot.style.opacity = String(Math.max(0.08, 0.58 - index * 0.038));
    dot.style.setProperty("--trail-scale", String(Math.max(0.36, 1 - index * 0.045)));

    holder.appendChild(dot);

    return {
      el: dot,
      x: mouse.x,
      y: mouse.y,
      angle: 0,
    };
  });

  const animateTrail = () => {
    let previousX = mouse.x;
    let previousY = mouse.y;

    dots.forEach((dot, index) => {
      const ease = 0.34 - Math.min(index * 0.014, 0.16);
      const scale = Math.max(0.36, 1 - index * 0.045);

      dot.x += (previousX - dot.x) * ease;
      dot.y += (previousY - dot.y) * ease;

      const angle =
        Math.atan2(previousY - dot.y, previousX - dot.x) * (180 / Math.PI);

      dot.angle += (angle - dot.angle) * 0.28;

      dot.el.style.transform =
        `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) rotate(${dot.angle}deg) scaleX(${scale})`;

      previousX = dot.x;
      previousY = dot.y;
    });

    requestAnimationFrame(animateTrail);
  };

  animateTrail();
}


function setupVideos() {
  document.querySelectorAll(".video-card").forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("pointerenter", () => {
      if (!video.dataset.loaded) {
        video.src = video.dataset.src;
        video.dataset.loaded = "true";
      }

      video
        .play()
        .then(() => {
          card.classList.add("has-preview");
        })
        .catch(() => {
          card.classList.remove("has-preview");
        });
    });

    card.addEventListener("pointerleave", () => {
      video.pause();
      card.classList.remove("has-preview");
    });
  });
}

function setupModals() {
  document.querySelectorAll("[data-committee]").forEach((card) => {
    card.addEventListener("click", () => {
      openCommittee(card.dataset.committee);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCommittee(card.dataset.committee);
      }
    });
  });

  document.querySelectorAll("[data-video]").forEach((card) => {
    card.addEventListener("click", () => {
      openVideo(card.dataset.video);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVideo(card.dataset.video);
      }
    });
  });

  document.querySelectorAll("[data-gallery]").forEach((card) => {
    card.addEventListener("click", () => {
      openGallery(card.dataset.gallery);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function openCommittee(key) {
  const committee = committeeData[key];

  if (!committee) return;

  openModal(`
    <div class="modal-hero">
      <span>${escapeHtml(committee.title)}</span>
    </div>

    <p class="eyebrow">${escapeHtml(committee.title)}</p>

    <h2 id="modalTitle">${escapeHtml(committee.name)}</h2>

    <p>
      <strong>Agenda:</strong>
      ${escapeHtml(committee.agenda)}
    </p>

    <ul class="agenda-list">
      ${committee.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
    </ul>
  `);
}

function openVideo(key) {
  const video = videoData[key];

  if (!video) return;

  openModal(`
    <div class="modal-hero">
      <span>${escapeHtml(video.label)}</span>
    </div>

    <p class="eyebrow">${escapeHtml(video.label)}</p>

    <h2 id="modalTitle">${escapeHtml(video.title)}</h2>

    <p>${escapeHtml(video.copy)}</p>

    <p>
      <strong>Reserved file:</strong>
      ${escapeHtml(video.src)}
    </p>
  `);
}

function openGallery(title) {
  openModal(`
    <div class="modal-hero">
      <span>MEDIA</span>
    </div>

    <p class="eyebrow">Photographs</p>

    <h2 id="modalTitle">${escapeHtml(title)}</h2>

    <p>
      Placeholder cinematic gallery preview. Replace this frame with the official HFSMUN
      photograph once the media team exports final images.
    </p>
  `);
}

function openModal(html) {
  modalBody.innerHTML = html;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

function setupFaqs() {
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");

      button.querySelector("span").textContent = isOpen ? "-" : "+";
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    note.textContent =
      "Preview saved. Connect this form to email or a backend when ready.";

    form.reset();
  });
}

function setupParticles() {
  resizeCanvas();

  particles = Array.from(
    { length: getParticleCount() },
    () => createParticle(),
  );

  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();

    particles = Array.from(
      { length: getParticleCount() },
      () => createParticle(),
    );
  });
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function getParticleCount() {
  return window.innerWidth < 720 ? 42 : 82;
}

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    size: Math.random() * 2.2 + 0.6,
    alpha: Math.random() * 0.5 + 0.15,
  };
}

function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    const dx = mouse.x - particle.x;
    const dy = mouse.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      particle.x -= dx * 0.002;
      particle.y -= dy * 0.002;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -10) particle.x = window.innerWidth + 10;
    if (particle.x > window.innerWidth + 10) particle.x = -10;
    if (particle.y < -10) particle.y = window.innerHeight + 10;
    if (particle.y > window.innerHeight + 10) particle.y = -10;

    ctx.beginPath();
    ctx.fillStyle = `rgba(56, 201, 255, ${particle.alpha})`;
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const lx = particle.x - other.x;
      const ly = particle.y - other.y;
      const lineDistance = Math.sqrt(lx * lx + ly * ly);

      if (lineDistance < 118) {
        ctx.strokeStyle =
          `rgba(122, 205, 255, ${0.14 * (1 - lineDistance / 118)})`;

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// ─── TYPEWRITER ENGINE ────────────────────────────────────────────────
const phrases = ["Shaping Tomorrow\'s Diplomats...", "New Age Diplomacy — August 2026", "Six Committees. One Vision.", "Powai, Mumbai — Meluha The Fern", "Debate. Negotiate. Resolve."];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return; // Guard clause in case element isn't on the page
  
  const currentPhrase = phrases[phraseIdx];
  
  if (isDeleting) {
    typeEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typeEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }
  
  let typeSpeed = isDeleting ? 40 : 80;
  
  if (!isDeleting && charIdx === currentPhrase.length) {
    typeSpeed = 1800; // Time the full phrase stays visible
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typeSpeed = 400; // Pause before typing the next word
  }
  
  setTimeout(type, typeSpeed);
}

// Start the animation once the DOM content is ready
document.addEventListener('DOMContentLoaded', type);

// ─── COUNTER ANIMATION ENGINE ─────────────────────────────────────────
function animCounter(el, target) {
  let count = 0;
  const step = target / 60; // Divides the animation into 60 frames (~1 second)
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(count) + (el.dataset.suffix || '');
    }
  }, 16); // ~60fps timing
}

// Hook into intersection observer to trigger only when visible
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      if (numEl && !numEl.dataset.animated) {
        numEl.dataset.animated = "true"; // Prevents running animation twice
        const targetVal = parseInt(numEl.textContent, 10);
        animCounter(numEl, targetVal);
      }
    }
  });
}, { threshold: 0.2 });

// Initialize observer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => statObserver.observe(card));
});

// ─── PARALLAX HERO ───────────────────────────────────────────────────
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  const bg=document.getElementById('home-bg');
  if(bg&&y<window.innerHeight){
    bg.style.backgroundPositionY=`calc(50% + ${y*.12}px)`;
  }
});
