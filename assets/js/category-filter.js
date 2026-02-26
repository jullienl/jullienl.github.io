document.addEventListener('DOMContentLoaded', function() {
  const chips = document.querySelectorAll('.category-chip');
  const postItems = document.querySelectorAll('.post-list li.card');
  const pagination = document.querySelector('.centred-homepage-content');
  const postsPerPage = postItems.length; // Current page size

  function applyCategoryFilter(selectedCategory) {
    const activeChip = Array.from(chips).find((chip) => {
      return chip.getAttribute('data-category') === selectedCategory;
    }) || Array.from(chips).find((chip) => {
      return chip.getAttribute('data-category') === 'all';
    });

    if (!activeChip) return;

    const activeCategory = activeChip.getAttribute('data-category');

    chips.forEach(c => c.classList.remove('active'));
    activeChip.classList.add('active');

    let visibleCount = 0;
    postItems.forEach(post => {
      if (activeCategory === 'all') {
        post.style.display = 'list-item';
        visibleCount++;
      } else {
        const postCategories = post.getAttribute('data-categories') || '';
        if (postCategories.includes(activeCategory)) {
          post.style.display = 'list-item';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      }
    });

    if (pagination) {
      if (activeCategory === 'all') {
        pagination.style.display = 'block';
      } else {
        pagination.style.display = visibleCount > postsPerPage ? 'block' : 'none';
      }
    }

    if (activeCategory === 'all') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      history.replaceState(null, '', '#' + activeCategory);
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', function(e) {
      e.preventDefault();

      const selectedCategory = this.getAttribute('data-category') || 'all';
      applyCategoryFilter(selectedCategory);
    });
  });

  const initialCategory = window.location.hash ? window.location.hash.substring(1) : 'all';
  applyCategoryFilter(initialCategory || 'all');
});
