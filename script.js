(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Mobile menu ----------
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.querySelector(".mobile-close");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  function setMenuOpen(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      mobileMenu.hidden = false;
      // Allow CSS to animate if user adds it later.
      mobileMenu.dataset.open = "true";
    } else {
      mobileMenu.hidden = true;
      delete mobileMenu.dataset.open;
    }
  }

  if (menuBtn) menuBtn.addEventListener("click", () => setMenuOpen(true));
  if (mobileClose) mobileClose.addEventListener("click", () => setMenuOpen(false));
  if (mobileLinks && mobileLinks.length) {
    mobileLinks.forEach((a) => a.addEventListener("click", () => setMenuOpen(false)));
  }

  // ---------- Smooth anchor scrolling ----------
  function isSameOriginHashLink(el) {
    if (!el || !el.getAttribute) return false;
    const href = el.getAttribute("href");
    return typeof href === "string" && href.startsWith("#") && href.length > 1;
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    const link = target && target.closest ? target.closest("a[href^='#']") : null;
    if (!isSameOriginHashLink(link)) return;

    const id = link.getAttribute("href").slice(1);
    if (!id) {
      e.preventDefault();
      return;
    }
    const section = document.getElementById(id);
    if (!section) return;

    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---------- Destination filters ----------
  const filterChips = document.querySelectorAll(".filter-chip");
  const destinationCards = document.querySelectorAll("#destinationGrid .destination-card");
  const filterStatus = document.getElementById("filterStatus");

  function applyDestinationFilter(filter) {
    let visible = 0;
    destinationCards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "")
        .split(/\s+/)
        .filter(Boolean);
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("is-filtered-out", !show);
      if (show) visible += 1;
    });
    if (!filterStatus) return;
    if (visible === 0) filterStatus.textContent = "No destinations match this filter.";
    else if (filter === "all") filterStatus.textContent = `All ${visible} destinations shown.`;
    else filterStatus.textContent = `${visible} destination${visible === 1 ? "" : "s"} match this filter.`;
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.getAttribute("data-filter") || "all";
      filterChips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      applyDestinationFilter(f);
    });
  });

  // ---------- Back to top ----------
  const backToTop = document.getElementById("backToTop");
  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.hidden = window.scrollY < 420;
  }
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      const mainEl = document.getElementById("main");
      if (mainEl) mainEl.focus({ preventScroll: true });
      if (mainEl) mainEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // ---------- Booking form ----------
  const form = document.getElementById("bookingForm");
  const modal = document.getElementById("confirmationModal");
  const modalBody = document.getElementById("modalBody");
  const modalTitle = document.getElementById("modalTitle");

  function showModal(html) {
    if (!modal) return;
    if (modalBody) modalBody.innerHTML = html;
    if (modalTitle) modalTitle.textContent = "Booking confirmed (demo)";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    // Basic focus: move to close button.
    const closeBtn = modal.querySelector("[data-close-modal]");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target && e.target.closest ? e.target.closest("[data-close-modal]") : null;
    if (btn) closeModal();
    const backdrop = e.target && e.target.matches ? e.target.matches("[data-close-modal]") : false;
    void backdrop;
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      const isBackdrop = e.target && e.target.classList && e.target.classList.contains("modal-backdrop");
      if (isBackdrop) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  const fieldErrors = {
    name: form ? form.querySelector('[data-error-for="name"]') : null,
    email: form ? form.querySelector('[data-error-for="email"]') : null,
    destination: form ? form.querySelector('[data-error-for="destination"]') : null,
    startDate: form ? form.querySelector('[data-error-for="startDate"]') : null,
    travelers: form ? form.querySelector('[data-error-for="travelers"]') : null,
  };

  function setError(fieldKey, message) {
    const el = fieldErrors[fieldKey];
    if (!el) return;
    el.textContent = message || "";
  }

  function clearErrors() {
    Object.keys(fieldErrors).forEach((k) => setError(k, ""));
  }

  function emailLooksValid(email) {
    // Simple but practical email pattern.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  }

  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterThanks = document.getElementById("newsletterThanks");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[name="email"]');
      const val = input ? String(input.value).trim() : "";
      if (!emailLooksValid(val)) {
        if (input) input.focus();
        return;
      }
      newsletterForm.reset();
      if (newsletterThanks) newsletterThanks.hidden = false;
    });
  }

  function formatDate(dateStr) {
    // dateStr is YYYY-MM-DD from input[type=date].
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  }

  function todayISO() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const startDateInput = document.getElementById("startDate");
  if (startDateInput && !startDateInput.value) {
    // Default min to today and pre-fill tomorrow to reduce invalid submits.
    startDateInput.min = todayISO();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    startDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const destination = form.destination.value;
      const startDate = form.startDate.value;
      const travelers = Number(form.travelers.value);

      let ok = true;

      if (!name) {
        setError("name", "Please enter your full name.");
        ok = false;
      }

      if (!email || !emailLooksValid(email)) {
        setError("email", "Please enter a valid email address.");
        ok = false;
      }

      if (!destination) {
        setError("destination", "Please choose a destination.");
        ok = false;
      }

      if (!startDate) {
        setError("startDate", "Please select a start date.");
        ok = false;
      } else {
        const min = form.startDate.min || todayISO();
        if (startDate < min) {
          setError("startDate", "Start date can’t be in the past.");
          ok = false;
        }
      }

      if (!Number.isFinite(travelers) || travelers < 1 || travelers > 8) {
        setError("travelers", "Travelers must be between 1 and 8.");
        ok = false;
      }

      if (!ok) return;

      const notes = form.message.value.trim();
      const summary = `
        <div class="summary">
          <p style="margin:0 0 10px; font-weight:800;">Here’s your trip confirmation (demo):</p>
          <ul style="margin:0; padding-left: 18px; line-height: 1.8;">
            <li><strong>Name:</strong> ${escapeHtml(name)}</li>
            <li><strong>Email:</strong> ${escapeHtml(email)}</li>
            <li><strong>Destination:</strong> ${escapeHtml(destination)}</li>
            <li><strong>Start date:</strong> ${escapeHtml(formatDate(startDate))}</li>
            <li><strong>Travelers:</strong> ${travelers}</li>
            ${notes ? `<li><strong>Notes:</strong> ${escapeHtml(notes)}</li>` : ""}
          </ul>
          <p style="margin:12px 0 0; color: rgba(255,255,255,0.78);">
            This is a frontend-only demo. Connect it to a backend to process bookings.
          </p>
        </div>
      `;

      showModal(summary);
      form.reset();
      // Re-apply sensible defaults.
      if (startDateInput) {
        startDateInput.min = todayISO();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
        const dd = String(tomorrow.getDate()).padStart(2, "0");
        startDateInput.value = `${yyyy}-${mm}-${dd}`;
      }
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
})();

