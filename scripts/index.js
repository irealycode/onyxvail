const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const closeBtn = document.getElementById('closeBtn');

    // Toggle sidebar open/close
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });

    // Close sidebar if click outside
    document.addEventListener('click', (event) => {
      if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(event.target) &&
        event.target !== toggleBtn
      ) {
        sidebar.classList.remove('open');
      }
    });