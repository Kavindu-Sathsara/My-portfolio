// Certificate data and rendering
const certificateData = [
  {
    id: 1,
    title: "C Intermediate",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/C Intermediate.pdf",
    category: "programming"
  },
  {
    id: 2,
    title: "C Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/C_Essentials_1_certificate_sathsara77kavindu-gmail-com_dd561785-30f6-45b4-b101-c6c52dfe61a5.pdf",
    category: "programming"
  },
  {
    id: 3,
    title: "Introduction to C",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/Introduction to C.pdf",
    category: "programming"
  },
  {
    id: 4,
    title: "Python for Beginners",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/Python_for_Beginners_E-Certificate.pdf",
    category: "programming"
  },
  {
    id: 5,
    title: "Web Design for Beginners",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/Web_Design_for_Beginners_E-Certificate.pdf",
    category: "web"
  },
  {
    id: 6,
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate_sathsara77kavindu-gmail-com_2c00fa4c-a17b-4b45-bc4e-1eaf34e15d12.pdf",
    category: "networking"
  },
  {
    id: 7,
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "assets/certificates/Networking_Basics_certificate_sathsara77kavindu-gmail-com_701ccc79-cba7-4a81-8262-68e5ab6583d7.pdf",
    category: "networking"
  }
];

// Carousel functionality - Multi-item display
class CertificateCarousel {
  constructor(containerId, indicatorsId) {
    this.container = document.getElementById(containerId);
    this.indicatorsContainer = document.getElementById(indicatorsId);
    this.itemsPerPage = 3; // Show 3 certificates at a time
    this.currentPage = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 6000; // 6 seconds
    
    if (!this.container) return;
    
    this.totalPages = Math.ceil(certificateData.length / this.itemsPerPage);
    this.init();
  }
  
  init() {
    this.renderSlides();
    this.renderIndicators();
    this.attachEventListeners();
    this.startAutoPlay();
  }
  
  renderSlides() {
    this.container.innerHTML = certificateData.map((cert, index) => `
      <div class="certificate-slide" data-slide="${index}">
        <div class="certificate-card section-card">
          <div>
            <h3>${cert.title}</h3>
            <p class="muted"><strong>${cert.issuer}</strong></p>
            <p class="muted">${cert.date}</p>
          </div>
          <div class="actions">
            <a class="btn btn-secondary" href="${cert.url}" target="_blank" rel="noopener noreferrer">View Certificate</a>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderIndicators() {
    this.indicatorsContainer.innerHTML = Array.from({ length: this.totalPages }, (_, index) => `
      <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-page="${index}" type="button" aria-label="Page ${index + 1}"></button>
    `).join('');
    
    // Attach click handlers to dots
    this.indicatorsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        this.goToPage(parseInt(e.target.dataset.page));
      });
    });
  }
  
  attachEventListeners() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevPage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
    
    // Pause on hover
    this.container.parentElement.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.parentElement.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  goToPage(page) {
    this.currentPage = (page + this.totalPages) % this.totalPages;
    this.updateCarousel();
    this.restartAutoPlay();
  }
  
  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
  
  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
  
  updateCarousel() {
    // Calculate offset: move by itemsPerPage * slideWidth
    const offset = -this.currentPage * this.itemsPerPage * (100 / certificateData.length) * certificateData.length / this.itemsPerPage;
    this.container.style.transform = `translateX(${-this.currentPage * 100}%)`;
    
    // Update indicators
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentPage);
    });
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextPage(), this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }
  
  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  new CertificateCarousel('certificate-carousel', 'carousel-indicators');
});
