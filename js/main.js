const header = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");

function handleScroll() {
  const scrolled = window.scrollY > 60;
  header.classList.toggle("scrolled", scrolled);
  backToTop.classList.toggle("visible", window.scrollY > 600);
}

function setNavOpen(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function highlightActiveSection(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased).toLocaleString("id-ID");
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function revealOnView(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
    observer.unobserve(entry.target);
  });
}

function staggerReveals() {
  document.querySelectorAll(".reveal").forEach((element) => {
    const siblings = [...element.parentElement.children].filter((child) => child.classList.contains("reveal"));
    element.style.transitionDelay = `${Math.min(siblings.indexOf(element), 5) * 90}ms`;
  });
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const fieldValid = field.type === "checkbox" ? field.checked : field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("invalid", !fieldValid);
    if (!fieldValid) isValid = false;
  });
  return isValid;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById("formStatus");

  if (!validateForm(form)) {
    status.className = "form-status error";
    status.textContent = "Mohon lengkapi seluruh kolom yang wajib diisi.";
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Permintaan Konsultasi — ${data.get("bidang")}`);
  const body = encodeURIComponent(
    `Nama: ${data.get("nama")}\nEmail: ${data.get("email")}\nTelepon: ${data.get("telepon")}\nBidang: ${data.get("bidang")}\n\n${data.get("pesan")}`
  );

  window.location.href = `mailto:info@smjplaw.com?subject=${subject}&body=${body}`;
  status.className = "form-status success";
  status.textContent = "Terima kasih. Permintaan Anda sedang diteruskan ke tim kami.";
  form.reset();
}

window.addEventListener("scroll", handleScroll, { passive: true });
navToggle.addEventListener("click", () => setNavOpen(!document.body.classList.contains("nav-open")));
navLinks.forEach((link) => link.addEventListener("click", () => setNavOpen(false)));
document.getElementById("contactForm").addEventListener("submit", handleSubmit);
document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(revealOnView, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(highlightActiveSection, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

staggerReveals();
handleScroll();
