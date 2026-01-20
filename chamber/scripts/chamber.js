const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');

  if (navMenu.classList.contains('open')) {
    hamburger.textContent = '✖';
  } else {
    hamburger.textContent = '☰';
  }
});


const membersContainer = document.querySelector('#members');
const lastModified = document.querySelector('#lastModified');
lastModified.textContent = document.lastModified;

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>${member.info}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${member.membership}</p>
    `;

    membersContainer.appendChild(card);
  });
}

// Toggle view
document.querySelector('#grid').addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

document.querySelector('#list').addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

getMembers();
