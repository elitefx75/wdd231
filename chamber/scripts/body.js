const container = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const spotlightContainer = document.getElementById("spotlight-container");

// Set footer information
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Toggle view
gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Load members.json
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        // Display all members in directory
        members.forEach(m => {
            const card = document.createElement("section");
            card.innerHTML = `
        <img src="${m.logo}" alt="${m.name} logo">
        <div>
          <h3>${m.name}</h3>
          <p><strong>Phone:</strong> ${m.phone}</p>
          <p><strong>Address:</strong> ${m.address}</p>
          <a href="${m.website}" target="_blank">Visit Website</a>
          <p><em>${m.membership}</em></p>
        </div>
      `;
            container.appendChild(card);
        });

        // Filter Gold and Silver members
        const goldSilver = members.filter(m =>
            m.membership.toLowerCase() === "gold" || m.membership.toLowerCase() === "silver"
        );

        // Randomly select 2 or 3 members
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const shuffled = goldSilver.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, spotlightCount);

        // Display spotlights
        selected.forEach(m => {
            const spotlight = document.createElement("div");
            spotlight.classList.add("spotlight-card");
            spotlight.innerHTML = `
        <img src="${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><strong>Address:</strong> ${m.address}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p><em>${m.membership}</em></p>
      `;
            spotlightContainer.appendChild(spotlight);
        });

    } catch (err) {
        console.error("Error loading members:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadMembers);
