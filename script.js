// Mobile Menu Toggle
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li a");

// Toggle Menu
if (menuToggle) {
    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
}

// Close menu when a link is clicked
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

