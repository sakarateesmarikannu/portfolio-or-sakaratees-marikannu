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
    
    // Fade out the blue background color layer seamlessly
    const heroBgLayer = document.getElementById('hero-bg-layer');
    if (heroBgLayer) {
      let opacity = 1 - (scrollY / 600); 
      heroBgLayer.style.opacity = Math.max(opacity, 0);
    }
    
    // Parallax the Portrait & Cards
    if (window.innerWidth > 900) {
      const portrait = document.getElementById('parallax-portrait');
      if (portrait) {
        portrait.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
      }

      const textGroup = document.getElementById('parallax-text');
      const cardLeft = document.getElementById('parallax-card-left');
      const cardRight = document.getElementById('parallax-card-right');
      
      if (textGroup) textGroup.style.transform = `translateY(${scrollY * -0.15}px)`;
      if (cardLeft) cardLeft.style.transform = `translateY(calc(-50% + ${scrollY * -0.1}px))`;
      if (cardRight) cardRight.style.transform = `translateY(calc(-50% + ${scrollY * -0.1}px))`;
    }
  });


  // 3. Scroll Reveal Animation for Tabs and Content
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adds the .visible class to make the element slide up smoothly
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });


  // 4. Tab Switching Logic
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

  // 5. Theme Toggle
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
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');

      if (isDark) {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
