<script>
    // Toggle desktop dropdowns
    document.querySelectorAll('.desktop-dropdown-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const menu = document.getElementById(button.dataset.target);
        menu.classList.toggle('active');
      });
    });

    // Toggle mobile menu
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('active');
    });

    // Toggle mobile submenus
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const menu = document.getElementById(button.dataset.target);
        menu.classList.toggle('active');
      });
    });
  </script>