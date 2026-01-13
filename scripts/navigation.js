const hamButton = document.querySelector('#hamburgerBtn');
const navList = document.querySelector('#navLinks');


hamButton.addEventListener('click', () => {


    navList.classList.toggle('open');


    hamButton.classList.toggle('open');


    const icon = hamButton.querySelector('span');

    if (navList.classList.contains('open')) {

        icon.textContent = 'X';
    } else {

        icon.innerHTML = '&#9776;';
    }
});