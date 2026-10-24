const animatedElements = document.querySelectorAll("[data-animate]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (animatedElements.length && !prefersReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  animatedElements.forEach((element, index) => {
    element.style.setProperty("--motion-delay", `${Math.min(index * 80, 400)}ms`);
    observer.observe(element);
  });
}