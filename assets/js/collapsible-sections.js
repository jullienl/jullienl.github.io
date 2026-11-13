// Collapses each "#" section of a post into a <details> element.
// Sub headings (##, ###, ...) stay inside their parent section.
// Enabled per post with `collapsible: true` in the front matter.
// Add `collapsible_expanded: true` to start with every section open.
(function () {
  'use strict';

  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  const loader = document.getElementById('collapsible-sections-script');
  const startOpen = !!loader && loader.dataset.expanded === 'true';

  Array.from(postContent.querySelectorAll('h1')).forEach(function (h1) {
    const details = document.createElement('details');
    details.className = 'collapsible-section';
    details.open = startOpen;
    const summary = document.createElement('summary');
    h1.replaceWith(details);
    details.appendChild(summary);
    summary.appendChild(h1);

    // Move the content that follows, up to the next h1
    let node = details.nextElementSibling;
    while (node && node.tagName !== 'H1') {
      const current = node;
      node = node.nextElementSibling;
      details.appendChild(current);
    }
  });

  // Open the section containing the hash target (anchor links, table of contents)
  function openHashTarget() {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    let parent = target.closest('details');
    while (parent) {
      parent.open = true;
      parent = parent.parentElement && parent.parentElement.closest('details');
    }
    target.scrollIntoView();
  }

  openHashTarget();
  window.addEventListener('hashchange', openHashTarget);
})();
