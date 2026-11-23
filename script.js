const typedText = document.getElementById("typed-text");
const roles = ["AI automation learner", "prompt writer", "web basics builder"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedText) {
  if (prefersReducedMotion) {
    typedText.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const role = roles[roleIndex];
      typedText.textContent = role.slice(0, charIndex);

      let delay = 110;

      if (!deleting && charIndex === role.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      } else {
        charIndex += deleting ? -1 : 1;
      }

      window.setTimeout(tick, delay);
    };

    window.setTimeout(tick, 800);
  }
}

const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const toast = document.getElementById("thank-you");
const closeToast = toast ? toast.querySelector(".toast-close") : null;
let toastTimer;

function hideThanks() {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.classList.remove("is-visible");
  toast.setAttribute("aria-hidden", "true");
}

function showThanks() {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.classList.add("is-visible");
  toast.setAttribute("aria-hidden", "false");
  toastTimer = window.setTimeout(hideThanks, 5000);
}

document.querySelectorAll("[data-thanks]").forEach((button) => {
  button.addEventListener("click", showThanks);
});

if (closeToast) {
  closeToast.addEventListener("click", hideThanks);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideThanks();
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
