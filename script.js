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
// Ventanas de detalles de los proyectos de Nexora Studio
const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalServices = document.getElementById("modalServices");


const projectDetails = [
    {
    title: "Cafetería local",
    description: "Una identidad visual cálida y cercana, inspirada en el aroma del café y en los pequeños momentos del día.",
    services: "Concepto creativo · Branding · Diseño web",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    alt: "Interior acogedor de una cafetería",
    gallery: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    title: "Estudio de bienestar",
    description: "Una propuesta visual limpia y moderna para transmitir equilibrio, energía y bienestar.",
    services: "Concepto creativo · Identidad visual · Diseño web",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80",
    alt: "Espacio de bienestar y yoga"
  },
  {
    title: "Estudio de interiores",
    description: "Una estética elegante y minimalista que destaca los espacios, los materiales y la personalidad de cada ambiente.",
    services: "Concepto creativo · Dirección visual · Diseño web",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    alt: "Interior de una vivienda de diseño contemporáneo"
  }
];

const projectCards = document.querySelectorAll(".project-card");
console.log("Tarjetas encontradas:", projectCards.length);
function openProjectModal(index) {
  const project = projectDetails[index];

  if (!project || !projectModal) return;

 modalTitle.textContent = project.title;
modalDescription.textContent = project.description;
modalServices.textContent = project.services;

const modalGallery = document.getElementById("modalGallery");

if (modalGallery) {
  modalGallery.replaceChildren();

  const images = project.gallery || [project.image];

  images.forEach((imageUrl, imageIndex) => {
    const img = document.createElement("img");

    img.className = "project-modal-image";
    img.src = imageUrl;
    img.alt = imageIndex === 0
      ? project.alt
      : `${project.title} — imagen ${imageIndex + 1}`;
    img.loading = "lazy";

    img.onerror = function () {
      console.error("No se pudo cargar la imagen:", imageUrl);
      img.remove();
    };

    modalGallery.appendChild(img);
  });
}

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeProjectModal?.focus();
}

function closeProjectDetails() {
  if (!projectModal) return;

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectCards.forEach((card, index) => {
  card.addEventListener("click", () => openProjectModal(index));
});

closeProjectModal?.addEventListener("click", closeProjectDetails);

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectDetails();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectDetails();
  }
});
