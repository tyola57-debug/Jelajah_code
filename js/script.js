/* =========================================
   Jelajah Code - Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    initNavigation();
    
    // FAQ accordion
    initFAQ();
    
    // Portfolio modal
    initPortfolioModal();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
});

/* =========================================
   Navigation
   ========================================= */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Active link on scroll
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* =========================================
   Navbar Scroll Effect
   ========================================= */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* =========================================
   Smooth Scroll
   ========================================= */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =========================================
   FAQ Accordion
   ========================================= */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Set initial ARIA
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

/* =========================================
   Portfolio Modal
   ========================================= */
function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const modalClose = modal.querySelector('.modal-close');
    const detailBtns = document.querySelectorAll('button.portfolio-detail-btn');
    
    // Portfolio data
    const portfolioData = {
        'rt-rw': {
            title: 'RT/RW Management System',
            category: 'Sistem Informasi',
            description: `
                <p>Sistem manajemen data warga RT/RW yang dirancang untuk memudahkan pengelolaan data penduduk, pembayaran iuran, dan pelaporan kegiatan di tingkat RT/RW.</p>
                <p>Sistem ini membantu pengurus RT/RW dalam mengelola data warga secara digital, mempercepat proses pendataan, dan meningkatkan transparansi pengelolaan keuangan.</p>
            `,
            techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML/CSS'],
            features: [
                'Dashboard admin yang intuitif',
                'Pendataan warga lengkap',
                'Sistem pembayaran iuran online',
                'Laporan keuangan otomatis',
                'Pengumuman dan notifikasi warga',
                'Backup data otomatis'
            ],
            images: ['images/gambar_pendukung_design.webp']
        },
        'peminjaman': {
            title: 'Sistem Peminjaman Barang',
            category: 'Dashboard Admin',
            description: `
                <p>Aplikasi web untuk mengelola peminjaman dan pengembalian inventaris kantor atau lembaga. Sistem ini memudahkan dalam pelacakan barang yang dipinjam.</p>
                <p>Dengan fitur pencatatan otomatis, pengguna dapat melihat riwayat peminjaman, status barang, dan menghasilkan laporan inventaris.</p>
            `,
            techStack: ['Node.js', 'MongoDB', 'React', 'Express.js', 'Tailwind CSS'],
            features: [
                'Manajemen inventaris lengkap',
                'Sistem peminjaman dan pengembalian',
                'Notifikasi pengingat pengembalian',
                'Laporan stok barang',
                'Multi-user dengan role berbeda',
                'Barcode scanning'
            ],
            images: ['images/Inventaris.mp4']
        },
        'absensi': {
            title: 'Sistem Absensi Barcode',
            category: 'Sistem Informasi',
            description: `
                <p>Sistem kehadiran berbasis barcode yang dirancang untuk sekolah dan kantor. Memudahkan pencatatan kehadiran secara akurat dan cepat.</p>
                <p>Sistem ini menghasilkan laporan kehadiran otomatis yang dapat digunakan untuk keperluan administrasi dan evaluasi.</p>
            `,
            techStack: ['Laravel', 'MySQL', 'Vue.js', 'Bootstrap', 'JavaScript'],
            features: [
                'Scan barcode untuk absensi',
                'Real-time monitoring kehadiran',
                'Laporan kehadiran harian/mingguan/bulanan',
                'Export data ke Excel/PDF',
                'Dashboard admin lengkap',
                'Integrasi dengan sistem lain'
            ],
            images: ['images/Absen_barcode.mp4']
        },
        'madrasah': {
            title: 'Website Madrasah Diniyah',
            category: 'Company Profile',
            description: `
                <p>Website profil madrasah yang menampilkan informasi kegiatan, jadwal pelajaran, dan galeri foto sekolah. Dirancang untuk memperkenalkan madrasah kepada calon siswa dan wali murid.</p>
                <p>Website ini mudah dikelola oleh admin sekolah dan memiliki tampilan yang profesional serta responsif.</p>
            `,
            techStack: ['WordPress', 'PHP', 'Elementor', 'MySQL', 'JavaScript'],
            features: [
                'Profil sekolah lengkap',
                'Jadwal pelajaran online',
                'Galeri foto kegiatan',
                'Berita dan pengumuman',
                'Formulir pendaftaran online',
                'Responsive design'
            ],
            images: ['images/madrasah.webp']
        },
        'landing-page': {
            title: 'Landing Page UMKM',
            category: 'Landing Page',
            description: `
                <p>Halaman penjualan yang dirancang khusus untuk produk UMKM dengan fokus pada konversi tinggi. Desain yang menarik dan persuasif untuk meningkatkan penjualan.</p>
                <p>Landing page ini dioptimalkan untuk mobile dan memiliki loading time yang sangat cepat.</p>
            `,
            techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'PHP'],
            features: [
                'Desain yang menarik dan profesional',
                'Mobile-first responsive',
                'Formulir kontak/orderyang terintegrasi WhatsApp',
                'Loading time cepat',
                'SEO optimized',
                'Animasi micro-interaction'
            ],
            images: ['images/sayur_busutik.webp']
        }
    };
    
    // Open modal
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const projectData = portfolioData[projectKey];
            
            if (projectData) {
                openModal(projectData);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openModal(data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-category').textContent = data.category;
        
        document.getElementById('modal-description').innerHTML = data.description;
        
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = `
            <h4>Tech Stack</h4>
            <div class="tech-tags">
                ${data.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        
        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = `
            <h4>Fitur Utama</h4>
            <ul>
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        
        const galleryContainer = document.getElementById('modal-gallery');
        galleryContainer.innerHTML = `
            <h4>Gallery</h4>
            <div class="gallery-grid">
                ${data.images.map(file => {
                    const isVideo = file.match(/\.(mp4|webm|mov)$/i);
                    if (isVideo) {
                        return `
                            <div class="gallery-item gallery-video-item">
                                <video src="${file}" controls muted playsinline preload="metadata"></video>
                            </div>
                        `;
                    }
                    return `
                        <div class="gallery-item">
                            <img src="${file}" alt="${data.title}" loading="lazy">
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        modalClose.focus();
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* =========================================
   Scroll Animations
   ========================================= */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .portfolio-card, .process-step, .faq-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* =========================================
   Utility Functions
   ========================================= */

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add debounced scroll handler for performance
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based functionality can be added here
}, 100));