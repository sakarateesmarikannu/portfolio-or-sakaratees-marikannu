document.addEventListener('DOMContentLoaded', () => {

  // 1. Automatically Calculate Experience (Starts from April 2025)
  const expCounter = document.getElementById('exp-counter');
  if (expCounter) {
    const startDate = new Date(2025, 3, 1); // 2025, index 3 = April
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    let expString = "With ";
    if (years > 0) {
      expString += years === 1 ? "1 Year " : `${years} Years `;
    }
    
    if (months > 0) {
      if (years > 0) expString += "& ";
      expString += months === 1 ? "1 Month " : `${months} Months `;
    }
    
    expString += "of Experience";
    
    if (years === 0 && months === 0) {
      expString = "Recently Started Experience"; 
    }
    
    expCounter.textContent = expString;
  }


  // 2. Single Page Tab Switching Logic
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active status from all tabs and content sections
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate the clicked tab and corresponding section
      button.classList.add('active');
      const targetElement = document.getElementById(targetTab);
      if (targetElement) {
        targetElement.classList.add('active');
        
        // Auto-scroll down slightly if on mobile so content is clearly visible
        if (window.innerWidth < 768) {
           targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 3. Dark/Light Mode Theme Toggle
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
