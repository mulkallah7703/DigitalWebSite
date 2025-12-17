document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");
  const revealItems = document.querySelectorAll(".reveal");
  const typingText = document.getElementById("typing-text");
  const cursor = document.querySelector(".cursor");
  const contactForm = document.getElementById("contact-form");
  const feedbackEl = document.getElementById("form-feedback");
  const yearEl = document.getElementById("year");

  /* Mobile nav toggle */
  navToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.replace("#", "");
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      nav.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });

  /* Active link on scroll */
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < top + height) {
        link?.classList.add("active");
      } else {
        link?.classList.remove("active");
      }
    });
  };
  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  /* Reveal on scroll */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));

  /* Typing effect */
  const roles = [
    "Full-Stack Developer",
    "Prompt Engineer",
    "AI & Automation Enthusiast",
    "Digital Products Creator",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typingSpeed = 80;
  const pauseTime = 1400;

  const type = () => {
    const current = roles[roleIndex];
    if (!deleting) {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 40 : typingSpeed);
  };
  if (typingText && cursor) {
    type();
  }

  /* Contact form validation */
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contactForm) return;
    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !email || !subject || !message) {
      feedbackEl.textContent = "Please fill in all required fields.";
      feedbackEl.className = "form__feedback error";
      return;
    }
    if (!validateEmail(email)) {
      feedbackEl.textContent = "Please enter a valid email address.";
      feedbackEl.className = "form__feedback error";
      return;
    }

    feedbackEl.textContent = "Your message has been sent! (This is a demo; integrate with backend later)";
    feedbackEl.className = "form__feedback success";
    contactForm.reset();
  });

  /* Dynamic year */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
