const menuButtons = Array.from(document.querySelectorAll("[data-menu]"));

menuButtons.forEach((menuButton) => {
  const navLinks = menuButton.closest(".site-header")?.querySelector("[data-nav]");
  if (!navLinks) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
});

const stickyCtas = Array.from(document.querySelectorAll("[data-sticky-cta]"));

stickyCtas.forEach((stickyCta) => {
  const pathwaySection = document.querySelector("[data-pathway-section]");
  const finalCta = document.querySelector("[data-final-cta]");
  if (!pathwaySection || !finalCta) return;
  let lastY = window.scrollY;

  const updateStickyCta = () => {
    const currentY = window.scrollY;
    const pathwayBottom = pathwaySection.offsetTop + pathwaySection.offsetHeight;
    const finalRect = finalCta.getBoundingClientRect();
    const isPastPathway = currentY > pathwayBottom - 90;
    const isScrollingUp = currentY < lastY;
    const isNearFinalCta = finalRect.top < window.innerHeight * 0.9;
    const shouldShow = isPastPathway && !isScrollingUp && !isNearFinalCta;

    stickyCta.classList.toggle("visible", shouldShow);
    stickyCta.setAttribute("aria-hidden", String(!shouldShow));
    lastY = Math.max(currentY, 0);
  };

  window.addEventListener("scroll", updateStickyCta, { passive: true });
  window.addEventListener("resize", updateStickyCta);
  updateStickyCta();
});

const form = document.querySelector("[data-enquiry-form]");

if (form) {
  const steps = Array.from(form.querySelectorAll("[data-step]"));
  const bars = Array.from(document.querySelectorAll("[data-progress]"));
  const nextButtons = Array.from(form.querySelectorAll("[data-next]"));
  const backButtons = Array.from(form.querySelectorAll("[data-back]"));
  const routeRadios = Array.from(form.querySelectorAll("input[name='pathway']"));
  const routeFields = Array.from(form.querySelectorAll("[data-route-fields]"));
  const summaries = Array.from(document.querySelectorAll("[data-summary]"));
  const submit = form.querySelector("[data-submit]");
  const kitTrack = form.querySelector("[data-kit-track]");
  const kitPrev = form.querySelector("[data-kit-prev]");
  const kitNext = form.querySelector("[data-kit-next]");
  const kitSizeRadios = Array.from(form.querySelectorAll("[data-kit-size]"));
  const otherSizeFields = Array.from(form.querySelectorAll("[data-other-size-fields]"));
  let currentStep = 0;

  const params = new URLSearchParams(window.location.search);
  const requestedRoute = params.get("route");
  const shouldSkipRouteStep = requestedRoute === "kit" || requestedRoute === "custom";
  if (requestedRoute === "kit" || requestedRoute === "custom") {
    const radio = form.querySelector(`input[name='pathway'][value='${requestedRoute}']`);
    if (radio) {
      radio.checked = true;
    }
  }

  const getRoute = () => {
    const checked = form.querySelector("input[name='pathway']:checked");
    return checked ? checked.value : "";
  };

  const routeLabel = () => {
    const route = getRoute();
    if (!route) return "Not selected yet";
    return route === "kit" ? "Supply Only Kit" : "Custom Shed";
  };

  const updateRouteFields = () => {
    const route = getRoute();
    routeFields.forEach((group) => {
      const isActive = group.dataset.routeFields === route;
      group.classList.toggle("active", isActive);
      group.querySelectorAll("input, select, textarea").forEach((field) => {
        field.disabled = !isActive;
      });
    });
    updateOtherSizeFields();
  };

  const updateOtherSizeFields = () => {
    const selectedOther = getRoute() === "kit" && Boolean(form.querySelector("[data-other-size]:checked"));
    otherSizeFields.forEach((group) => {
      group.hidden = !selectedOther;
      group.querySelectorAll("input").forEach((field) => {
        field.disabled = !selectedOther;
        field.required = selectedOther;
      });
    });
  };

  const updateSummary = () => {
    if (!summaries.length) return;
    const data = new FormData(form);
    const parts = [
      `<strong>Project type:</strong> ${routeLabel()}`,
      `<strong>Shed type:</strong> ${data.get("shed_type") || "Not selected yet"}`,
      `<strong>Location:</strong> ${data.get("location") || "Not entered yet"}`,
      `<strong>Timeframe:</strong> ${data.get("timeframe") || "Not selected yet"}`
    ];
    summaries.forEach((summary) => {
      summary.innerHTML = parts.join("<br>");
    });
  };

  const showStep = (index) => {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));
    bars.forEach((bar, i) => bar.classList.toggle("active", i <= currentStep));
    updateRouteFields();
    updateSummary();
  };

  const visibleRequiredFields = () => {
    const activeStep = steps[currentStep];
    return Array.from(activeStep.querySelectorAll("[required]")).filter((field) => {
      return !field.disabled && !field.closest("[hidden]") && (field.offsetParent !== null || field.getClientRects().length > 0);
    });
  };

  const canAdvance = () => {
    const fields = visibleRequiredFields();
    return fields.every((field) => field.reportValidity());
  };

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (canAdvance()) {
        showStep(currentStep + 1);
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => showStep(currentStep - 1));
  });

  routeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateRouteFields();
      updateSummary();
    });
  });

  kitSizeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateOtherSizeFields();
      updateSummary();
    });
  });

  const scrollKitTrack = (direction) => {
    if (!kitTrack) return;
    const card = kitTrack.querySelector(".kit-card");
    const distance = card ? card.getBoundingClientRect().width + 12 : 220;
    kitTrack.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  if (kitPrev) {
    kitPrev.addEventListener("click", () => scrollKitTrack(-1));
  }

  if (kitNext) {
    kitNext.addEventListener("click", () => scrollKitTrack(1));
  }

  form.addEventListener("input", updateSummary);
  form.addEventListener("change", () => {
    updateOtherSizeFields();
    updateSummary();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canAdvance()) return;
    if (submit) {
      submit.textContent = routeLabel() === "Supply Only Kit" ? "Kit quote request ready" : "Consultation request ready";
      submit.disabled = true;
    }
    const confirmation = form.querySelector("[data-confirmation]");
    if (confirmation) {
      confirmation.hidden = false;
      confirmation.focus();
    }
  });

  updateRouteFields();
  updateOtherSizeFields();
  showStep(shouldSkipRouteStep ? 1 : 0);
}
