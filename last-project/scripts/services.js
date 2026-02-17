const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    });
}

async function loadServices() {
    try {
        const response = await fetch('./scripts/data.json');
        const data = await response.json();

        const container = document.getElementById('services-container');


        const filtered = data.services.filter(service => service.year >= 2024);

        container.innerHTML = filtered.map(service => `
      <div class="service-card">
        <img src="images/${service.image}" alt="${service.name}" loading="lazy">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p><strong>Sector:</strong> ${service.sector}</p>
        <p><strong>Year:</strong> ${service.year}</p>
        <button class="details-btn" 
          data-name="${service.name}" 
          data-description="${service.description}">
          Details
        </button>
      </div>
    `).join('');

        // Event handling for modal
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showModal(btn.dataset.name, btn.dataset.description);
            });
        });

    } catch (error) {
        console.error('Error loading services:', error);
    }
}

function showModal(title, description) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      <p>${description}</p>
      <button id="close-modal">Close</button>
    </div>
  `;
    document.body.appendChild(modal);

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

loadServices();

// Footer script
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const modifiedSpan = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});
