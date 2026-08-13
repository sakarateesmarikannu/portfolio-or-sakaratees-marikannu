document.addEventListener('DOMContentLoaded', () => {

  // 1. Calculate Experience
  const expCounter = document.getElementById('exp-counter');
  if (expCounter) {
    const startDate = new Date(2025, 3, 1);
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    
    if (months < 0) { years--; months += 12; }
    
    let expString = "With ";
    if (years > 0) expString += years === 1 ? "1 Year " : `${years} Years `;
    if (months > 0) {
      if (years > 0) expString += "& ";
      expString += months === 1 ? "1 Month " : `${months} Months `;
    }
    expString += "of Experience";
    if (years === 0 && months === 0) expString = "Recently Started Experience"; 
    
    expCounter.textContent = expString;
  }

  // 2. Parallax and Scroll Fade Effects
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    const heroBgLayer = document.getElementById('hero-bg-layer');
    if (heroBgLayer) {
      let opacity = 1 - (scrollY / 600); 
      heroBgLayer.style.opacity = Math.max(opacity, 0);
    }
    
    if (window.innerWidth > 900) {
      const portrait = document.getElementById('parallax-portrait');
      if (portrait) portrait.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;

      const textGroup = document.getElementById('parallax-text');
      const cardLeft = document.getElementById('parallax-card-left');
      const cardRight = document.getElementById('parallax-card-right');
      
      if (textGroup) textGroup.style.transform = `translateY(${scrollY * -0.15}px)`;
      if (cardLeft) cardLeft.style.transform = `translateY(calc(-50% + ${scrollY * -0.1}px))`;
      if (cardRight) cardRight.style.transform = `translateY(calc(-50% + ${scrollY * -0.1}px))`;
    }
  });

  // 3. Tab Switching Logic
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const targetElement = document.getElementById(targetTab);
      if (targetElement) {
        targetElement.classList.add('active');
        if (window.innerWidth < 768) {
           targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 4. Regular Works Carousel
  const worksTrack = document.getElementById('works-carousel');
  const worksLeft = document.getElementById('works-left');
  const worksRight = document.getElementById('works-right');

  if (worksTrack && worksLeft && worksRight) {
    worksLeft.addEventListener('click', () => worksTrack.scrollBy({ left: -320, behavior: 'smooth' }));
    worksRight.addEventListener('click', () => worksTrack.scrollBy({ left: 320, behavior: 'smooth' }));
  }

  // 5. 3D Coverflow Logic (Featured Section)
  const cfItems = document.querySelectorAll('.cf-item');
  const cfLeft = document.getElementById('cf-left');
  const cfRight = document.getElementById('cf-right');
  let currentCfIndex = 0;

  function updateCoverflow() {
    if (cfItems.length === 0) return;
    
    cfItems.forEach((item, index) => {
      item.className = 'cf-item'; 
      if (index === currentCfIndex) {
        item.classList.add('active');
      } else if (index === (currentCfIndex - 1 + cfItems.length) % cfItems.length) {
        item.classList.add('prev');
      } else if (index === (currentCfIndex + 1) % cfItems.length) {
        item.classList.add('next');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  if (cfItems.length > 0) {
    updateCoverflow();
    cfRight.addEventListener('click', () => {
      currentCfIndex = (currentCfIndex + 1) % cfItems.length;
      updateCoverflow();
    });
    cfLeft.addEventListener('click', () => {
      currentCfIndex = (currentCfIndex - 1 + cfItems.length) % cfItems.length;
      updateCoverflow();
    });
    
    cfItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('prev') || item.classList.contains('next')) {
          currentCfIndex = index;
          updateCoverflow();
        }
      });
    });
  }

  // 6. Theme Toggle with Icon Pop Animation
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    if(themeIcon) themeIcon.className = 'fas fa-moon';
    if(themeText) themeText.textContent = 'Dark Mode';
  } else {
    body.classList.add('dark-theme');
    if(themeIcon) themeIcon.className = 'fas fa-sun';
    if(themeText) themeText.textContent = 'Light Mode';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // Trigger the spring pop animation
      themeIcon.classList.remove('theme-icon-animate');
      void themeIcon.offsetWidth; // forces a reflow to restart animation
      themeIcon.classList.add('theme-icon-animate');

      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');

      // Change icon halfway through the animation for a smoother look
      setTimeout(() => {
        if (isDark) {
          themeIcon.className = 'fas fa-sun theme-icon-animate';
          themeText.textContent = 'Light Mode';
          localStorage.setItem('theme', 'dark');
        } else {
          themeIcon.className = 'fas fa-moon theme-icon-animate';
          themeText.textContent = 'Dark Mode';
          localStorage.setItem('theme', 'light');
        }
      }, 150);
    });
  }

  // 7. Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom of the screen
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

});
