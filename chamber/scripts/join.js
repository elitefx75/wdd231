document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = "opacity 1s ease-in, transform 0.5s ease";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, i * 400);
    });

    const modals = document.querySelectorAll(".modal");
    const links = document.querySelectorAll(".card a");
    const closeButtons = document.querySelectorAll(".modal .close");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const modal = document.querySelector(targetId);
            if (modal) {
                modal.style.display = "block";
                modal.setAttribute("aria-hidden", "false");
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const modal = btn.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                modal.setAttribute("aria-hidden", "true");
            }
        });
    });

    window.addEventListener("click", e => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
                modal.setAttribute("aria-hidden", "true");
            }
        });
    });

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                modal.style.display = "none";
                modal.setAttribute("aria-hidden", "true");
            });
        }
    });

    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});
