// Certificate data and rendering
const certificateData = [
  {
    id: 1,
    title: "C Intermediate",
    issuer: "Sololearn",
    date: "19/03/2026",
    url: "assets/certificates/C Intermediate.pdf",
    image: "assets/certificates/C Intermediate.png",
    category: "Programming",
    icon: "assets/icons/C+_Logo.png",
    type: "programming"
  },
  {
    id: 2,
    title: "C Essentials",
    issuer: "Cisco Networking Academy",
    date: "18/05/2026",
    url: "assets/certificates/C_Essentials_1_certificate_sathsara77kavindu-gmail-com_dd561785-30f6-45b4-b101-c6c52dfe61a5.pdf",
    image: "assets/certificates/C_Essentials_1_certificate_sathsara77kavindu-gmail-com_dd561785-30f6-45b4-b101-c6c52dfe61a5.png",
    category: "Programming",
    icon: "assets/icons/C+_Logo.png",
    type: "programming"
  },
  {
    id: 3,
    title: "Introduction to C",
    issuer: "Sololearn",
    date: "15/03/2025",
    url: "assets/certificates/Introduction to C.pdf",
    image: "assets/certificates/Introduction to C.png",
    category: "Programming",
    icon: "assets/icons/C+_Logo.png",
    type: "programming"
  },
  {
    id: 4,
    title: "Python for Beginners",
    issuer: "Centre for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka",
    date: "16/03/2024",
    url: "assets/certificates/Python_for_Beginners_E-Certificate.pdf",
    image: "assets/certificates/Python_for_Beginners_E-Certificate.png",
    category: "Programming",
    icon: "assets/icons/python.jpg",
    type: "programming"
  },
  {
    id: 5,
    title: "Web Design for Beginners",
    issuer: "Centre for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka",
    date: "2024",
    url: "assets/certificates/Web_Design_for_Beginners_E-Certificate.pdf",
    image: "assets/certificates/Web_Design_for_Beginners_E-Certificate.png",
    category: "Web",
    icon: "assets/icons/images.png",
    type: "programming"
  },
  {
    id: 6,
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "13/14/2026",
    url: "assets/certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate_sathsara77kavindu-gmail-com_2c00fa4c-a17b-4b45-bc4e-1eaf34e15d12.pdf",
    image: "assets/certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate_sathsara77kavindu-gmail-com_2c00fa4c-a17b-4b45-bc4e-1eaf34e15d12.png",
    category: "Networking",
    icon: "assets/icons/Cisco_Systems-Logo.wine.png",
    type: "networking"
  },
  {
    id: 7,
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "14/08/2026",
    url: "assets/certificates/Networking_Basics_certificate_sathsara77kavindu-gmail-com_701ccc79-cba7-4a81-8262-68e5ab6583d7.pdf",
    image: "assets/certificates/Networking_Basics_certificate_sathsara77kavindu-gmail-com_701ccc79-cba7-4a81-8262-68e5ab6583d7.png",
    category: "Networking",
    icon: "assets/icons/Cisco_Systems-Logo.wine.png",
    type: "networking"
  },
  {
    id: 8,
    title: "Introduction to Kubernetes (LFS158)",
    issuer: "The Linux Foundation",
    date: "15/08/2026",
    url: "assets/certificates/Introduction to K8s.pdf",
    image: "assets/certificates/Introduction to K8s.png",
    category: "Cloud / Kubernetes",
    icon: "assets/icons/Kubernetes-Logo.wine.png",
    type: "kubernetes"
  }
];

class CertificateCarousel {
  constructor(containerId, indicatorsId) {
    this.container = document.getElementById(containerId);
    this.indicatorsContainer = document.getElementById(indicatorsId);
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.touchStartX = 0;
    this.touchCurrentX = 0;

    if (!this.container) return;

    this.init();
  }

  init() {
    this.renderSlides();
    this.renderIndicators();
    this.attachEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
  }

  getVisibleCards() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  renderSlides() {
    this.container.style.setProperty('--visible-cards', this.getVisibleCards());
    this.container.innerHTML = certificateData.map((cert, index) => `
      <article class="certificate-slide ${index === this.currentIndex ? 'is-active' : ''}" data-index="${index}">
        <div class="certificate-card section-card" style="--certificate-image: url('${cert.image}')">
          <div class="certificate-header">
            <div class="certificate-icon ${cert.type}">
              <img src="${cert.icon}" alt="${cert.category} logo" loading="lazy">
            </div>
            <span class="certificate-badge">${cert.category}</span>
          </div>

          <div>
            <h3>${cert.title}</h3>
            <div class="certificate-meta">
              <span><strong>Issued by:</strong> ${cert.issuer}</span>
              <span><strong>Completed:</strong> ${cert.date}</span>
            </div>
          </div>

          <div class="actions">
            <button class="certificate-link" type="button" data-certificate-index="${index}">
              View Certificate <span class="link-arrow">↗</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  renderIndicators() {
    this.indicatorsContainer.innerHTML = certificateData.map((_, index) => `
      <button class="carousel-dot ${index === this.currentIndex ? 'active' : ''}" data-index="${index}" type="button" aria-label="Go to certificate ${index + 1}"></button>
    `).join('');

    this.indicatorsContainer.querySelectorAll('.carousel-dot').forEach((dot) => {
      dot.addEventListener('click', (event) => {
        this.currentIndex = Number(event.currentTarget.dataset.index);
        this.updateCarousel();
        this.restartAutoPlay();
      });
    });
  }

  attachEventListeners() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const viewport = this.container.closest('.certificate-viewport');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    this.container.addEventListener('click', (event) => {
      const button = event.target.closest('.certificate-link');
      if (!button) return;

      const certificate = certificateData[Number(button.dataset.certificateIndex)];
      openCertificateModal(certificate);
    });

    if (viewport) {
      viewport.addEventListener('mouseenter', () => this.stopAutoPlay());
      viewport.addEventListener('mouseleave', () => this.startAutoPlay());

      viewport.addEventListener('touchstart', (event) => {
        this.touchStartX = event.touches[0].clientX;
        this.touchCurrentX = this.touchStartX;
      }, { passive: true });

      viewport.addEventListener('touchmove', (event) => {
        this.touchCurrentX = event.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        const delta = this.touchCurrentX - this.touchStartX;

        if (Math.abs(delta) > 40) {
          if (delta < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      });
    }

    window.addEventListener('resize', () => {
      this.container.style.setProperty('--visible-cards', this.getVisibleCards());
      this.updateCarousel();
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % certificateData.length;
    this.updateCarousel();
    this.restartAutoPlay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + certificateData.length) % certificateData.length;
    this.updateCarousel();
    this.restartAutoPlay();
  }

  updateCarousel() {
    const slides = this.container.querySelectorAll('.certificate-slide');
    const firstCard = this.container.querySelector('.certificate-slide .certificate-card');

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === this.currentIndex);
    });

    this.indicatorsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });

    if (!firstCard) return;

    const gap = parseFloat(getComputedStyle(this.container).gap || '0');
    const cardWidth = firstCard.getBoundingClientRect().width;
    const offset = this.currentIndex * (cardWidth + gap);
    this.container.style.transform = `translateX(-${offset}px)`;
  }

  startAutoPlay() {
    if (this.isReducedMotion || this.autoPlayInterval) return;

    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

const certificateModal = document.getElementById('certificate-modal');
const certificateModalBody = certificateModal?.querySelector('.certificate-modal-body');

function openCertificateModal(certificate) {
  if (!certificateModal || !certificateModalBody) return;

  certificateModalBody.innerHTML = `
    <div class="modal-header">
      <div>
        <h3 id="certificate-modal-title">${certificate.title}</h3>
        <p class="muted">${certificate.issuer} · ${certificate.date}</p>
      </div>
      <button class="close-btn" type="button" aria-label="Close certificate preview">×</button>
    </div>
    <iframe class="certificate-viewer" src="${certificate.url}" title="${certificate.title} certificate"></iframe>
    <div class="certificate-modal-actions">
      <a class="btn btn-primary" href="${certificate.url}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
    </div>
  `;

  certificateModal.classList.add('open');
  certificateModal.setAttribute('aria-hidden', 'false');
  certificateModalBody.querySelector('.close-btn').focus();
}

function closeCertificateModal() {
  if (!certificateModal || !certificateModalBody) return;

  certificateModal.classList.remove('open');
  certificateModal.setAttribute('aria-hidden', 'true');
  certificateModalBody.innerHTML = '';
}

certificateModal?.addEventListener('click', (event) => {
  if (event.target === certificateModal || event.target.closest('.close-btn')) {
    closeCertificateModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCertificateModal();
});

document.addEventListener('DOMContentLoaded', () => {
  const certificateCarousel = new CertificateCarousel('certificate-carousel', 'carousel-indicators');

  if (certificateCarousel.isReducedMotion) {
    certificateCarousel.stopAutoPlay();
  }
});
