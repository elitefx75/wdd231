import { places } from "../data/places.mjs";

const container = document.querySelector(".grid-container");


places.forEach((place, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <figure>
            <img src="${place.photo}" alt="${place.activity}">
        </figure>
        <div class="card-body">
            <h2>${place.activity}</h2>
            <p class="description">${place.description}</p>
            <address class="location">${place.address}</address>
            <button class="learn-more">Learn More</button>
        </div>
    `;
    container.appendChild(card);
});
const membersContainer = document.querySelector('#members');
const lastModified = document.querySelector('#lastModified');
const currentYear = document.querySelector('#currentyear');

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const messageDiv = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    messageDiv.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
        messageDiv.textContent = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
        messageDiv.textContent = "You last visited 1 day ago.";
    } else {
        messageDiv.textContent = `You last visited ${daysPassed} days ago.`;
    }
}
localStorage.setItem("lastVisit", now);
