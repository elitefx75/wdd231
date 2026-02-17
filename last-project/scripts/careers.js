// Hamburger toggle for small screens
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    });
}

// Load ALL careers data from data.json
async function loadCareers() {
    try {
        const response = await fetch('./scripts/data.json'); // check path carefully
        const data = await response.json();

        const container = document.getElementById('careers-container');

        // Ensure careers exist
        if (!data.careers || data.careers.length === 0) {
            container.innerHTML = "<p>No careers available at the moment.</p>";
            return;
        }

        // Map over ALL careers (no filtering)
        container.innerHTML = data.careers.map(career => `
      <div class="career-card">
        <img src="images/${career.image}" alt="${career.title}" loading="lazy">
        <h3>${career.title}</h3>
        <p><strong>Location:</strong> ${career.location}</p>
        <p><strong>Type:</strong> ${career.type}</p>
        <p><strong>Posted:</strong> ${career.posted}</p>
        <button class="career-details-btn"
          data-title="${career.title}"
          data-location="${career.location}"
          data-type="${career.type}"
          data-posted="${career.posted}">
          View Details
        </button>
      </div>
    `).join('');

        // Event handling for modal
        document.querySelectorAll('.career-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showCareerModal(
                    btn.dataset.title,
                    btn.dataset.location,
                    btn.dataset.type,
                    btn.dataset.posted
                );
            });
        });

    } catch (error) {
        console.error('Error loading careers:', error);
    }
}

// Modal dialog for careers
function showCareerModal(title, location, type, posted) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Posted:</strong> ${posted}</p>
      <button id="close-career-modal">Close</button>
    </div>
  `;
    document.body.appendChild(modal);

    document.getElementById('close-career-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Run loader
loadCareers();

// Footer script: update year and last modified
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    const modifiedSpan = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});
