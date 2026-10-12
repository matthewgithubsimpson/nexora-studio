const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Abrir y cerrar el menú móvil
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Cerrar el menú después de pulsar un enlace
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });
}

// Seleccionar automáticamente el plan elegido
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const planSelect = document.getElementById("clientPlan");

    if (planSelect) {
      planSelect.value = button.dataset.plan;
    }
  });
});

// Año automático en el pie de página
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formFeedback.textContent = "Enviando tu consulta...";

    const formData = new FormData(contactForm);
    formData.append("access_key", "417c0df5-6b0a-413d-871e-70d9a23e6e68");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        formFeedback.textContent =
          "¡Gracias! Tu consulta se ha enviado correctamente.";
        contactForm.reset();
      } else {
        formFeedback.textContent =
          "No se pudo enviar la consulta. Comprueba tu clave de Web3Forms.";
      }
    } catch (error) {
      formFeedback.textContent =
        "Error de conexión. Comprueba tu internet e inténtalo de nuevo.";
    }
  });
}