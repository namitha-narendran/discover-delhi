const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isHidden = mobileNav.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isHidden));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const page = document.body.dataset.page;
if (page) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const isActive = link.dataset.nav === page;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const revealItems = Array.from(document.querySelectorAll(".reveal-on-scroll"));
if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("in-view");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    revealObserver.observe(item);
  });
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.classList.remove("hidden");
    contactForm.reset();
    setTimeout(() => formStatus.classList.add("hidden"), 4000);
  });
}
