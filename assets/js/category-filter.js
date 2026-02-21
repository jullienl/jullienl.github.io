document.addEventListener('DOMContentLoaded', function() {
  const chips = document.querySelectorAll('.category-chip');
  const postItems = document.querySelectorAll('.post-list li.card');
  const pagination = document.querySelector('.centred-homepage-content');
  const postsPerPage = postItems.length; // Current page size

  chips.forEach(chip => {
    chip.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get selected category
      const selectedCategory = this.getAttribute('data-category');
      
      // Update active state
      chips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Filter posts and count visible ones
      let visibleCount = 0;
      postItems.forEach(post => {
        if (selectedCategory === 'all') {
          post.style.display = 'list-item';
          visibleCount++;
        } else {
          // Check if post has the selected category
          const postCategories = post.getAttribute('data-categories') || '';
          if (postCategories.includes(selectedCategory)) {
            post.style.display = 'list-item';
            visibleCount++;
          } else {
            post.style.display = 'none';
          }
        }
      });
      
      // Show/hide pagination based on filter
      if (pagination) {
        if (selectedCategory === 'all') {
          // Show pagination when showing all posts
          pagination.style.display = 'block';
        } else {
          // Hide pagination only if filtered results fit on one page
          // Show pagination if filtered results span multiple pages
          pagination.style.display = visibleCount > postsPerPage ? 'block' : 'none';
        }
      }
    });
  });
});
