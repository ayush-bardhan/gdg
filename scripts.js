(() => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* ======================================
     EVENT DATA
     Sample event information for this demo.
     ====================================== */
  const sessions = {
    1: [
      {
        type: "Keynote",
        level: "All Levels",
        time: "09:00 AM - 10:30 AM",
        title: "Grand Opening & AI Developer Keynote",
        description: "Explore the future of AI-powered software development and modern cloud platforms.",
        speaker: "Dr. Ananya Patnaik",
        role: "Cloud Architect",
        image: "assets/images/speaker-1.jpg",
        location: "Main Auditorium",
        start: "20261112T090000",
        end: "20261112T103000",
        prerequisites: []
      },
      {
        type: "Workshop",
        level: "Intermediate",
        time: "11:00 AM - 01:00 PM",
        title: "Building Multimodal AI Agents with Gemini",
        description: "Explore AI agents, API integration, function calling, and practical AI development.",
        speaker: "Rohan Samal",
        role: "Senior AI Engineer",
        image: "assets/images/speaker-2.jpg",
        location: "Computer Lab 3",
        start: "20261112T110000",
        end: "20261112T130000",
        prerequisites: ["Python installed", "API key"]
      },
      {
        type: "Workshop",
        level: "All Levels",
        time: "02:00 PM - 04:00 PM",
        title: "Serverless Web Apps with Next.js",
        description: "Build and deploy full-stack applications using modern cloud infrastructure.",
        speaker: "Subhashree Mohanty",
        role: "Frontend Engineer",
        image: "assets/images/speaker-3.jpg",
        location: "Seminar Hall B",
        start: "20261112T140000",
        end: "20261112T160000",
        prerequisites: []
      },
      {
        type: "Talk",
        level: "Intermediate",
        time: "04:30 PM - 06:00 PM",
        title: "Web3 & Cloud Security",
        description: "Explore secure credentials, OAuth, and modern application security.",
        speaker: "Vikramaditya Dash",
        role: "Security Architect",
        image: "",
        location: "Main Auditorium",
        start: "20261112T163000",
        end: "20261112T180000",
        prerequisites: []
      }
    ],

    2: [
      {
        type: "Hack Sprint",
        level: "Teams of up to 4",
        time: "09:00 AM - 01:00 PM",
        title: "24-Hour AI/ML Hack Sprint",
        description: "Work in teams to design and build prototypes addressing real-world problems.",
        speaker: "GDG Mentor Team",
        role: "Technical Mentors",
        image: "",
        location: "Innovation Lab",
        start: "20261113T090000",
        end: "20261113T130000",
        prerequisites: ["Team registration", "Laptop"]
      },
      {
        type: "Workshop",
        level: "Beginner",
        time: "02:00 PM - 04:00 PM",
        title: "Flutter & Firebase Mobile Development",
        description: "Build cross-platform applications and integrate authentication and cloud data.",
        speaker: "Priyanka Mishra",
        role: "Mobile Development Lead",
        image: "assets/images/speaker-3.jpg",
        location: "Computer Lab 2",
        start: "20261113T140000",
        end: "20261113T160000",
        prerequisites: ["Dart basics"]
      },
      {
        type: "Community",
        level: "All Levels",
        time: "04:30 PM - 06:00 PM",
        title: "Open Source Contribution Lab",
        description: "Learn Git workflows, issues, pull requests, and collaborative development.",
        speaker: "Open Source Mentors",
        role: "Community Team",
        image: "",
        location: "Seminar Hall A",
        start: "20261113T163000",
        end: "20261113T180000",
        prerequisites: ["GitHub account"]
      }
    ],

    3: [
      {
        type: "Workshop",
        level: "Advanced",
        time: "09:30 AM - 11:00 AM",
        title: "Shipping Cloud-Native Apps with Docker & Kubernetes",
        description: "Learn containerization, deployment, and scalable application design.",
        speaker: "Amitabh Swain",
        role: "Staff Engineer",
        image: "assets/images/speaker-4.jpg",
        location: "Innovation Lab",
        start: "20261114T093000",
        end: "20261114T110000",
        prerequisites: ["Linux CLI basics"]
      },
      {
        type: "Showcase",
        level: "Registered Teams",
        time: "11:30 AM - 01:30 PM",
        title: "Hack Sprint Demo Day",
        description: "Present prototypes, demonstrate projects, and receive feedback.",
        speaker: "Review Panel",
        role: "Industry and Faculty Reviewers",
        image: "",
        location: "Main Auditorium",
        start: "20261114T113000",
        end: "20261114T133000",
        prerequisites: ["Working prototype"]
      },
      {
        type: "Awards",
        level: "All Attendees",
        time: "03:00 PM - 04:30 PM",
        title: "Awards, Certificates & Closing Celebration",
        description: "Celebrate projects, achievements, and contributions from the community.",
        speaker: "Organizing Team",
        role: "GDG @ SOA",
        image: "",
        location: "Main Auditorium",
        start: "20261114T150000",
        end: "20261114T163000",
        prerequisites: []
      }
    ]
  };

  const dayNotes = {
    1: [
      "Day 1 · Learn, connect, and explore",
      "Start with the keynote and hands-on technical workshops."
    ],
    2: [
      "Day 2 · Collaborate and build",
      "Explore mobile development, open source, and the AI/ML sprint."
    ],
    3: [
      "Day 3 · Demo, celebrate, and share",
      "Present your work and celebrate standout projects."
    ]
  };

  const syllabi = {
    ai: {
      title: "Generative AI & Machine Learning",
      intro: "Build practical AI applications using foundation models.",
      points: [
        "Gemini API and multimodal prompting",
        "Tool use and function calling",
        "RAG and vector databases",
        "Evaluation and deployment"
      ]
    },
    web: {
      title: "Full-Stack Web & Cloud Architecture",
      intro: "Build and deploy full-stack applications.",
      points: [
        "Next.js and reusable UI patterns",
        "REST APIs and microservices",
        "Cloud deployment",
        "Observability and production readiness"
      ]
    },
    mobile: {
      title: "Mobile & Cross-Platform Development",
      intro: "Create applications using Flutter and Dart.",
      points: [
        "Dart fundamentals",
        "Flutter widgets and navigation",
        "Firebase Authentication",
        "State management"
      ]
    },
    devops: {
      title: "Open Source & DevOps Engineering",
      intro: "Learn collaborative software delivery.",
      points: [
        "Git and GitHub collaboration",
        "Docker and containers",
        "Kubernetes fundamentals",
        "CI/CD and infrastructure automation"
      ]
    }
  };

  /* ======================================
     HELPERS AND NOTIFICATIONS
     ====================================== */
  let toastTimer;

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[character]));
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join("")
      .toUpperCase();
  }

  /* ======================================
     DAY SELECTOR AND EVENT SCHEDULE
     ====================================== */
  function renderSessions(day = 1) {
    const list = $("#scheduleList");
    if (!list || !sessions[day]) return;

    list.replaceChildren();

    sessions[day].forEach(session => {
      const card = document.createElement("article");
      card.className = "surface-card event-card";

      const prereqs = session.prerequisites.length
        ? `
          <div class="event-prereqs">
            <strong>Prerequisites:</strong>
            ${session.prerequisites.map(item =>
              `<span>${escapeHTML(item)}</span>`
            ).join("")}
          </div>
        `
        : "";

      const avatar = session.image
        ? `<img class="speaker-mini" src="${session.image}" alt="" loading="lazy">`
        : `<span class="speaker-mini speaker-placeholder">${initials(session.speaker)}</span>`;

      card.innerHTML = `
        <div class="event-main">
          <div class="event-tags">
            <span class="tag type">${escapeHTML(session.type)}</span>
            <span class="tag">${escapeHTML(session.level)}</span>
            <span class="event-time">${escapeHTML(session.time)}</span>
          </div>
          <h3>${escapeHTML(session.title)}</h3>
          <p class="event-description">${escapeHTML(session.description)}</p>
          ${prereqs}
          <div class="event-meta">
            <div class="event-speaker">
              ${avatar}
              <span>
                <b>${escapeHTML(session.speaker)}</b>
                <small>${escapeHTML(session.role)}</small>
              </span>
            </div>
            <span class="event-location">${escapeHTML(session.location)}</span>
          </div>
        </div>
        <div class="event-actions">
          <button class="btn btn-outline-dark calendar-btn" type="button">
            ▦ Add to Calendar
          </button>
          <button class="btn btn-primary register-event" type="button">
            Register Track →
          </button>
        </div>
      `;

      $(".calendar-btn", card).addEventListener("click", () => {
        downloadCalendar(session);
      });

      $(".register-event", card).addEventListener("click", () => {
        openModal("register", session.title);
      });

      list.appendChild(card);
    });
  }

  $$(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".day-tab").forEach(button => {
        button.classList.remove("active");
        button.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const day = Number(tab.dataset.day);

      $("#day-note-title").textContent = dayNotes[day][0];
      $("#day-note-text").textContent = dayNotes[day][1];

      renderSessions(day);
    });
  });

  renderSessions(1);

  /* ======================================
     DOWNLOAD .ICS CALENDAR FILE
     ====================================== */
  function escapeICS(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function downloadCalendar(session) {
    const stamp = new Date().toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Tekno Krraft 2026//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@teknokrraft.local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${session.start}`,
      `DTEND:${session.end}`,
      `SUMMARY:${escapeICS(session.title)}`,
      `DESCRIPTION:${escapeICS(session.description)}`,
      `LOCATION:${escapeICS(session.location)}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([calendar], {
      type: "text/calendar;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tekno-krraft-event.ics";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showToast("Calendar file downloaded. Check the sample date before importing.");
  }

  /* ======================================
     DESKTOP SIDEBAR AND MOBILE DRAWER
     ====================================== */
  const sidebar = $("#sidebar");
  const menuToggle = $("#menuToggle");
  const sidebarScrim = $("#sidebarScrim");

  function openMobileSidebar() {
    sidebar.classList.add("open");
    sidebarScrim.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("open");
    sidebarScrim.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      if (sidebar.classList.contains("open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    } else {
      document.body.classList.toggle("sidebar-collapsed");

      menuToggle.setAttribute(
        "aria-expanded",
        String(!document.body.classList.contains("sidebar-collapsed"))
      );
    }
  });

  sidebarScrim.addEventListener("click", closeMobileSidebar);

  $$("#mainNav a, .sidebar-overview").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) {
        closeMobileSidebar();
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
      closeMobileSidebar();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMobileSidebar();
    }
  });

  /* ======================================
     LIGHT/DARK MODE AND FIVE COLOR THEMES
     ====================================== */
  const themeToggle = $("#themeToggle");
  const paletteButtons = $$(".palette-option");
  const paletteActiveName = $("#paletteActiveName");
  const paletteDescription = $("#paletteDescription");

  const paletteStorageKey = "tekno-palette";
  const themeStorageKey = "tekno-theme";

  const paletteInfo = {
    aurora: {
      name: "Aurora",
      description: "Violet glass with arctic-cyan reflections."
    },
    ocean: {
      name: "Ocean",
      description: "Deep sapphire glass with luminous teal edges."
    },
    ember: {
      name: "Ember",
      description: "Warm smoked glass with coral and amber highlights."
    },
    orchid: {
      name: "Orchid",
      description: "Electric rose glass with soft ultraviolet shimmer."
    },
    citrus: {
      name: "Citrus",
      description: "Fresh lime glass with molten-gold reflections."
    }
  };

  function syncThemeButton() {
    const dark = document.body.dataset.theme === "dark";

    $(".theme-icon", themeToggle).textContent = dark ? "☾" : "☼";
    $(".theme-label", themeToggle).textContent = dark ? "Dark" : "Light";

    themeToggle.classList.toggle("is-dark", dark);

    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );

    themeToggle.title = dark
      ? "Switch to light theme"
      : "Switch to dark theme";
  }

  function syncPalette(palette, save = true) {
    const validPalette = Object.hasOwn(paletteInfo, palette)
      ? palette
      : "aurora";

    document.body.dataset.palette = validPalette;

    paletteButtons.forEach(button => {
      const selected = button.dataset.palette === validPalette;

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    paletteActiveName.textContent = paletteInfo[validPalette].name;
    paletteDescription.textContent = paletteInfo[validPalette].description;

    const metaTheme = $('meta[name="theme-color"]');

    if (metaTheme) {
      metaTheme.content =
        getComputedStyle(document.body).getPropertyValue("--bg").trim() ||
        "#f2f0ff";
    }

    if (save) {
      try {
        localStorage.setItem(paletteStorageKey, validPalette);
      } catch (error) {
        // Palette switching still works if browser storage is unavailable.
      }
    }
  }

  try {
    const savedTheme = localStorage.getItem(themeStorageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      document.body.dataset.theme = savedTheme;
    }
  } catch (error) {
    // Use the default theme if local storage is blocked.
  }

  try {
    const savedPalette = localStorage.getItem(paletteStorageKey);

    if (savedPalette && Object.hasOwn(paletteInfo, savedPalette)) {
      document.body.dataset.palette = savedPalette;
    }
  } catch (error) {
    // Use Aurora as the default palette.
  }

  syncThemeButton();
  syncPalette(document.body.dataset.palette || "aurora", false);

  themeToggle.addEventListener("click", () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "light" : "dark";

    try {
      localStorage.setItem(themeStorageKey, document.body.dataset.theme);
    } catch (error) {
      // The toggle remains functional without storage.
    }

    syncThemeButton();
    syncPalette(document.body.dataset.palette || "aurora", false);
  });

  paletteButtons.forEach(button => {
    button.addEventListener("click", () => {
      syncPalette(button.dataset.palette);
    });
  });

  /* ======================================
     LIVE GLASS CLARITY / TRANSPARENCY
     ====================================== */
  const clarityInput = $("#glassClarity");
  const clarityOutput = $("#glassClarityValue");
  const clarityStorageKey = "tekno-glass-clarity";

  function applyGlassClarity(rawValue, save = true) {
    const parsed = Number(rawValue);
    const clarity = Math.min(
      100,
      Math.max(0, Number.isFinite(parsed) ? parsed : 68)
    );

    const amount = clarity / 100;

    // Higher clarity means the glass becomes more transparent.
    const glassAlpha = 0.94 - amount * 0.60;

    // Cards remain more opaque for readable content.
    const contentAlpha = 0.98 - amount * 0.34;

    // Forms retain additional opacity.
    const modalAlpha = 0.98 - amount * 0.16;

    document.documentElement.style.setProperty(
      "--glass-alpha",
      glassAlpha.toFixed(3)
    );

    document.documentElement.style.setProperty(
      "--content-alpha",
      contentAlpha.toFixed(3)
    );

    document.documentElement.style.setProperty(
      "--modal-alpha",
      modalAlpha.toFixed(3)
    );

    document.documentElement.style.setProperty(
      "--glass-clarity",
      String(clarity)
    );

    clarityInput.value = String(clarity);

    clarityInput.style.setProperty(
      "--range-progress",
      `${clarity}%`
    );

    clarityInput.setAttribute(
      "aria-valuetext",
      `${clarity} percent transparent`
    );

    clarityOutput.value = `${clarity}%`;
    clarityOutput.textContent = `${clarity}%`;

    if (save) {
      try {
        localStorage.setItem(clarityStorageKey, String(clarity));
      } catch (error) {
        // Slider remains functional if storage is unavailable.
      }
    }
  }

  if (clarityInput && clarityOutput) {
    let initialClarity = clarityInput.value || "68";

    try {
      const savedClarity = localStorage.getItem(clarityStorageKey);

      if (
        savedClarity !== null &&
        Number.isFinite(Number(savedClarity))
      ) {
        initialClarity = savedClarity;
      }
    } catch (error) {
      // Use the slider's HTML default.
    }

    applyGlassClarity(initialClarity, false);

    clarityInput.addEventListener("input", () => {
      applyGlassClarity(clarityInput.value);
    });
  }

  /* ======================================
     FAQ ACCORDION
     ====================================== */
  $$(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const item = question.closest(".faq-item");
      const shouldOpen = !item.classList.contains("open");

      $$(".faq-item").forEach(other => {
        other.classList.remove("open");

        $(".faq-question", other).setAttribute(
          "aria-expanded",
          "false"
        );
      });

      if (shouldOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ======================================
     MODAL FORM HELPERS
     ====================================== */
  const backdrop = $("#modalBackdrop");
  const modal = $(".modal");
  const modalTitle = $("#modalTitle");
  const modalDescription = $("#modalDescription");
  const modalFields = $("#modalFields");
  const modalForm = $("#modalForm");
  const modalSubmit = $("#modalSubmit");
  const formNote = $("#formNote");

  let activeModalType = "register";

  function makeField(name, label, type = "text", options = {}) {
    const full = options.full ? " full" : "";
    const required = options.required === false ? "" : " required";

    let control;

    if (type === "select") {
      const choices = options.choices.map(choice =>
        `<option value="${escapeHTML(choice)}">${escapeHTML(choice)}</option>`
      ).join("");

      control = `
        <select id="field-${name}" name="${name}"${required}>
          <option value="">${escapeHTML(options.placeholder || "Choose an option")}</option>
          ${choices}
        </select>
      `;
    } else if (type === "textarea") {
      control = `
        <textarea id="field-${name}" name="${name}" rows="3"
          placeholder="${escapeHTML(options.placeholder || "")}"${required}></textarea>
      `;
    } else {
      control = `
        <input id="field-${name}" type="${type}" name="${name}"
          placeholder="${escapeHTML(options.placeholder || "")}"${required}>
      `;
    }

    return `
      <div class="form-field${full}">
        <label for="field-${name}">${escapeHTML(label)}${options.required === false ? " (optional)" : ""}</label>
        ${control}
      </div>
    `;
  }

  function openModal(type, selectedTrack = "") {
    activeModalType = type;

    modalFields.replaceChildren();
    $(".modal-syllabus-list", modal)?.remove();

    modalForm.hidden = false;
    formNote.hidden = false;
    modalSubmit.hidden = false;

    $("#modalEyebrow").textContent = "Tekno Krraft 2026";

    if (type === "register") {
      modalTitle.textContent = "Register for Tekno Krraft";
      modalDescription.textContent = "Enter your details and choose a technical track.";
      modalSubmit.textContent = "Continue →";

      modalFields.innerHTML =
        makeField("fullName", "Full name", "text", {
          placeholder: "Your name"
        }) +
        makeField("email", "Email address", "email", {
          placeholder: "you@example.com"
        }) +
        makeField("institution", "College / organization", "text", {
          placeholder: "Your institution",
          required: false
        }) +
        makeField("track", "Preferred track", "select", {
          placeholder: "Choose a track",
          full: true,
          required: false,
          choices: [
            "Generative AI & Machine Learning",
            "Full-Stack Web & Cloud Architecture",
            "Mobile & Cross-Platform Development",
            "Open Source & DevOps Engineering",
            "Hack Sprint",
            "Not decided yet"
          ]
        });

      formNote.textContent =
        "Demo form only. No details are sent to a server.";
    } else if (type === "sponsor") {
      modalTitle.textContent = "Become an Event Sponsor";
      modalDescription.textContent = "Tell us about your organization and sponsorship interests.";
      modalSubmit.textContent = "Send enquiry →";

      modalFields.innerHTML =
        makeField("company", "Company / organization", "text") +
        makeField("contactName", "Contact person", "text") +
        makeField("email", "Work email", "email") +
        makeField("interest", "Sponsorship interest", "select", {
          placeholder: "Choose level",
          full: true,
          choices: [
            "Title sponsor",
            "Platinum partner",
            "Gold partner",
            "Community partner"
          ]
        }) +
        makeField("message", "Additional information", "textarea", {
          full: true,
          required: false
        });

      formNote.textContent =
        "Demo form only. Enquiries are not sent or stored.";
    } else {
      modalTitle.textContent = "Contact the Organizing Team";
      modalDescription.textContent = "Describe your question or message.";
      modalSubmit.textContent = "Prepare message →";

      modalFields.innerHTML =
        makeField("fullName", "Your name", "text") +
        makeField("email", "Email address", "email") +
        makeField("subject", "Subject", "text", { full: true }) +
        makeField("message", "Message", "textarea", { full: true });

      formNote.textContent =
        "Demo form only. No email is sent from this static page.";
    }

    modalForm.dataset.mode = type;
    modalForm.reset();

    if (type === "register" && selectedTrack) {
      const select = $('select[name="track"]', modalFields);

      if (select) {
        const option = [...select.options].find(
          item => item.value === selectedTrack
        );

        if (option) select.value = selectedTrack;
      }
    }

    backdrop.hidden = false;
    document.body.classList.add("modal-open");
    $("#modalClose").focus();
  }

  function openSyllabus(key) {
    const content = syllabi[key];
    if (!content) return;

    activeModalType = "syllabus";

    modalFields.replaceChildren();
    modalForm.hidden = true;
    formNote.hidden = true;
    modalSubmit.hidden = true;

    $("#modalEyebrow").textContent = "Track syllabus";
    modalTitle.textContent = content.title;
    modalDescription.textContent = content.intro;

    $(".modal-syllabus-list", modal)?.remove();

    const list = document.createElement("ul");
    list.className = "modal-syllabus-list";

    content.points.forEach(point => {
      const item = document.createElement("li");
      item.textContent = point;
      list.appendChild(item);
    });

    modal.appendChild(list);

    backdrop.hidden = false;
    document.body.classList.add("modal-open");
    $("#modalClose").focus();
  }

  $$("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
      openModal(
        button.dataset.modal,
        button.dataset.track || ""
      );
    });
  });

  $$(".syllabus-btn").forEach(button => {
    button.addEventListener("click", () => {
      openSyllabus(button.dataset.syllabus);
    });
  });

  function closeModal() {
    backdrop.hidden = true;
    document.body.classList.remove("modal-open");

    $(".modal-syllabus-list", modal)?.remove();

    modalForm.hidden = false;
    formNote.hidden = false;
    modalSubmit.hidden = false;
  }

  $("#modalClose").addEventListener("click", closeModal);

  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !backdrop.hidden) {
      closeModal();
    }
  });

  modalForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!modalForm.reportValidity()) return;

    const messages = {
      register: "Form validated. Connect a backend to submit registration details.",
      sponsor: "Enquiry validated. Connect a backend to deliver the message.",
      contact: "Message prepared. Connect an email service to send it."
    };

    closeModal();
    showToast(messages[activeModalType] || "Form validated locally.");
  });

  /* ======================================
     IMAGE FALLBACKS
     Missing portraits show initials instead.
     ====================================== */
  document.addEventListener("error", event => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement)) return;
    if (!image.matches(".speaker-photo, .speaker-mini")) return;

    const isProfile = image.classList.contains("speaker-photo");
    const card = image.closest(".speaker-card");
    const eventCard = image.closest(".event-card");

    const name = isProfile
      ? ($("h3", card)?.textContent || "Speaker")
      : ($(".event-speaker b", eventCard)?.textContent || "Speaker");

    const fallback = document.createElement("span");

    fallback.className = isProfile
      ? "speaker-photo speaker-photo-fallback"
      : "speaker-mini speaker-placeholder";

    fallback.setAttribute("aria-label", name);
    fallback.textContent = initials(name);

    image.replaceWith(fallback);
  }, true);

  /* ======================================
     SPEAKER SHARE AND SIDEBAR ACTIONS
     ====================================== */
  $$("[data-toast]").forEach(button => {
    button.addEventListener("click", () => {
      showToast(button.dataset.toast);
    });
  });

  $$("[data-share]").forEach(button => {
    button.addEventListener("click", async () => {
      const text = `${button.dataset.share} — Tekno Krraft 2026`;

      try {
        if (navigator.share) {
          await navigator.share({
            title: "Tekno Krraft 2026",
            text
          });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          showToast("Speaker details copied to clipboard.");
        } else {
          showToast(text);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          showToast(text);
        }
      }
    });
  });

  /* ======================================
     ACTIVE SECTION HIGHLIGHT
     ====================================== */
  const navLinks = $$("#mainNav a");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    });

    ["about", "schedule", "tracks", "speakers", "sponsors", "faqs"]
      .forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
  }
})();