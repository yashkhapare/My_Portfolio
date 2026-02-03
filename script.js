// Typing animation (simple & small)
const lines = [
  "Python Developer",
  "Flask • Web Development",
  "IoT Enthusiast",
  "Open for internships & entry roles"
];
const typedEl = document.getElementById('typed');
const cursor = document.querySelector('.cursor');
let lineIndex = 0, charIndex = 0, forward = true;

function typeLoop(){
  const current = lines[lineIndex];
  if(forward){
    if(charIndex < current.length){
      typedEl.textContent += current[charIndex++];
      setTimeout(typeLoop, 80);
    } else {
      forward = false;
      setTimeout(typeLoop, 900);
    }
  } else {
    if(charIndex > 0){
      typedEl.textContent = current.slice(0, --charIndex);
      setTimeout(typeLoop, 40);
    } else {
      forward = true;
      lineIndex = (lineIndex + 1) % lines.length;
      setTimeout(typeLoop, 300);
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  typeLoop();
});

// Smooth contact scroll
document.getElementById('contact-scroll').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Reveal project cards on scroll using IntersectionObserver
const cards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

cards.forEach(card => observer.observe(card));

// Contact form: client-side validation + mailto fallback
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name || !email || !message){
    status.textContent = "Please fill all fields.";
    return;
  }
  // Basic email regex
  const emailRegex = /^\S+@\S+\.\S+$/;
  if(!emailRegex.test(email)){
    status.textContent = "Please enter a valid email.";
    return;
  }

  status.textContent = "Preparing email...";

  // Try to open mail client with prefilled body (works as fallback)
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--\nYash`);
  window.location.href = `mailto:yashkhapare5@gmail.com?subject=${subject}&body=${body}`;

  // Optionally show success message (if mail client handling not supported, user can copy)
  setTimeout(()=> {
    status.textContent = "If your mail client didn't open, please email at yashkhapare5@gmail.com";
  }, 800);
});

// Clear form
document.getElementById('clearForm').addEventListener('click', () => {
  form.reset();
  status.textContent = "";
});
