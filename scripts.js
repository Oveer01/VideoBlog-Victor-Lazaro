// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------------
     1. Preloader
  ------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });

  /* -------------------------------------
     2. Scroll Progress Bar
  ------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  };
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();

  /* -------------------------------------
     3. Back-to-Top Button
  ------------------------------------- */
  const backToTopButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------
     4. Dark Mode Toggle
  ------------------------------------- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode')
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  /* -------------------------------------
     5. Hamburger Menu Toggle
  ------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  /* -------------------------------------
     6. Change Header on Scroll
  ------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* -------------------------------------
     7. Active Navigation Link Highlighting
  ------------------------------------- */
  const sections = document.querySelectorAll('section');
  const navLinkElements = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* -------------------------------------
     8. Calculate Age
  ------------------------------------- */
  const updateAge = () => {
    const edadElement = document.getElementById('edad');
    const birthDate = new Date(2001, 7, 2);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    edadElement.textContent = age;
  };
  updateAge();

  /* -------------------------------------
     9. Update Year in Footer
  ------------------------------------- */
  const updateYear = () => {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  };
  updateYear();

  /* -------------------------------------
     10. Portfolio Filtering
  ------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        item.style.display = filter === 'all' || item.classList.contains(filter) ? 'block' : 'none';
      });
    });
  });

  /* -------------------------------------
     11. Load Data from data.json (Portfolio, Testimonials, Studies, Contact)
  ------------------------------------- */
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Portafolio
      const portfolioContainer = document.querySelector('.portfolio-items');
      portfolioContainer.innerHTML = '';
      if (data.portfolio && data.portfolio.length > 0) {
        data.portfolio.forEach(item => {
          const div = document.createElement('div');
          div.className = `portfolio-item ${item.type}`;
          div.setAttribute('data-aos', 'zoom-in');
          div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          `;
          portfolioContainer.appendChild(div);
        });
      } else {
        portfolioContainer.innerHTML = '<p class="no-items">Actualmente no hay cortometrajes o documentales.</p>';
      }

      // Testimonios (Lista)
      const testimonialsContainer = document.querySelector('.testimonials-list');
      testimonialsContainer.innerHTML = '';
      if (data.testimonials && data.testimonials.length > 0) {
        data.testimonials.forEach(item => {
          const div = document.createElement('div');
          div.className = 'testimonial';
          div.setAttribute('data-aos', 'fade-up');
          div.innerHTML = `
            <img src="${item.image}" alt="${item.author}" loading="lazy">
            <div>
              <p>"${item.quote}"</p>
              <h4>${item.author}</h4>
            </div>
          `;
          testimonialsContainer.appendChild(div);
        });
      } else {
        testimonialsContainer.innerHTML = '<p class="no-items">Actualmente no hay testimonios.</p>';
      }
      
      // Estudios
      const studiesContainer = document.querySelector('.studies-container');
      studiesContainer.innerHTML = '';
      if (data.studies && data.studies.length > 0) {
        data.studies.forEach(study => {
          const div = document.createElement('div');
          div.className = 'estudio';
          div.setAttribute('data-aos', 'fade-up');
          div.innerHTML = `
            <img src="${study.image}" alt="${study.title}" class="estudio-img" loading="lazy">
            <h4>${study.title}</h4>
            <p>${study.description}</p>
          `;
          studiesContainer.appendChild(div);
        });
      } else {
        studiesContainer.innerHTML = '<p class="no-items">Actualmente no hay estudios.</p>';
      }
      
      // Contacto
      const contactContainer = document.querySelector('.contact-container');
      contactContainer.innerHTML = '';
      if (data.contact) {
        contactContainer.innerHTML = `
          <a href="${data.contact.tiktok}" target="_blank" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="${data.contact.whatsapp}" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="mailto:${data.contact.email}" aria-label="Correo"><i class="fas fa-envelope"></i></a>
          <a href="${data.contact.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        `;
      } else {
        contactContainer.innerHTML = '<p class="no-items">Actualmente no hay datos de contacto.</p>';
      }
    })
    .catch(error => {
      console.error('Error al cargar data.json:', error);
    });

  /* -------------------------------------
     12. Auto Play/Pause en Videoblog
  ------------------------------------- */
  const video = document.querySelector('#videoblog video');
  if (video) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(err => console.error('Error al reproducir el video:', err));
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    videoObserver.observe(video);
  }

  /* -------------------------------------
     13. GSAP Animations
  ------------------------------------- */
  gsap.from("#header", { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  const buttons = document.querySelectorAll('button, .filter-btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.1, duration: 0.3, ease: "power1.out" });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: "power1.out" });
    });
  });
});
