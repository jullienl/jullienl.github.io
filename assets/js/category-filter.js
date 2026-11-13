document.addEventListener('DOMContentLoaded', function () {
  const chips = Array.from(document.querySelectorAll('.category-chip'));
  const pagedPosts = document.getElementById('paged-posts');
  const filteredPosts = document.getElementById('filtered-posts');
  if (!chips.length || !pagedPosts || !filteredPosts) return;

  const cards = Array.from(filteredPosts.querySelectorAll('.home-card'));
  const pagination = document.querySelector('.centred-homepage-content');
  const featured = document.querySelector('.home-featured');
  const empty = document.getElementById('filter-empty');
  const status = document.getElementById('filter-status');

  function applyCategory(category) {
    const active = chips.find(chip => chip.dataset.category === category);
    if (!active) return;
    const showAll = category === 'all';
    let count = 0;

    chips.forEach(chip => {
      const selected = chip === active;
      chip.classList.toggle('active', selected);
      if (selected) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
    });

    cards.forEach(card => {
      const matches = (card.dataset.categories || '').split(/\s+/).includes(category);
      card.hidden = !matches;
      if (matches) count++;
    });

    pagedPosts.hidden = !showAll;
    filteredPosts.hidden = showAll;
    if (pagination) pagination.hidden = !showAll;
    if (featured) featured.hidden = !showAll;
    if (empty) empty.hidden = showAll || count > 0;
    if (status) status.textContent = showAll ? '' : count + (count === 1 ? ' guide found.' : ' guides found.');
  }

  chips.forEach(chip => {
    chip.addEventListener('click', function (event) {
      event.preventDefault();
      const category = chip.dataset.category;
      applyCategory(category);
      history.replaceState(null, '', category === 'all' ? '#latest-guides' : '#' + category);
    });
  });

  function applyHash() {
    const category = decodeURIComponent(location.hash.slice(1));
    applyCategory(chips.some(chip => chip.dataset.category === category) ? category : 'all');
  }

  window.addEventListener('hashchange', applyHash);
  applyHash();
});
