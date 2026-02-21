// Reading progress bar for long-form content
(function() {
  'use strict';
  
  // Only add on post pages with substantial content
  if (!document.querySelector('.post-content')) {
    return;
  }
  
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-label', 'Reading progress');
  document.body.prepend(progressBar);
  
  // Update progress on scroll
  function updateProgress() {
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Calculate progress (only count from start of post content)
    const contentStart = postContent.offsetTop;
    const contentHeight = postContent.offsetHeight;
    const scrollFromContent = Math.max(0, scrollTop - contentStart);
    const progress = Math.min(100, (scrollFromContent / contentHeight) * 100);
    
    progressBar.style.width = progress + '%';
  }
  
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', updateProgress, { passive: true });
  
  // Initial update
  updateProgress();
})();
