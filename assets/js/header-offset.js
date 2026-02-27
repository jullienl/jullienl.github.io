(function () {
  function updateOffset() {
    var header = document.querySelector('header.site-header');
    if (header) {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }
  }

  // Script is loaded with defer, so DOM is already ready — run immediately
  updateOffset();

  var header = document.querySelector('header.site-header');
  if (header && typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateOffset).observe(header);
  } else {
    window.addEventListener('resize', updateOffset);
  }
})();
