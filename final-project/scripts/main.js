const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    });
}


const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        const name = document.getElementById('name').value;
        localStorage.setItem('userName', name);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const modifiedSpan = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});
