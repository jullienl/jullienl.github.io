// Add lazy loading to images that don't already have it
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLazyLoading);
  } else {
    addLazyLoading();
  }
  
  function addLazyLoading() {
    // Get all images in post content that don't already have loading attribute
    const images = document.querySelectorAll('.post-content img:not([loading]), .card img:not([loading])');
    
    images.forEach(function(img) {
      // Skip images that are already loaded or in viewport
      if (!img.complete && img.getBoundingClientRect().top > window.innerHeight) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
})();
