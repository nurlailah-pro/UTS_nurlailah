// Smooth scroll animation
document.addEventListener('DOMContentLoaded', function() {
    // Profile image upload functionality with fallback
    const profileInput = document.getElementById('upload-profile');
    const profileImg = document.getElementById('profile-img');
    const profilePlaceholder = document.getElementById('profile-placeholder');
    const defaultProfileImg = 'images/noen1.jpeg';
    
    if (profileInput) {
        profileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profilePlaceholder.style.display = 'none';
                    profileImg.src = e.target.result;
                    profileImg.style.display = 'block';
                    
                    // Save to localStorage with error handling
                    try {
                        localStorage.setItem('profile-img', e.target.result);
                        showNotification('✅ Foto profil berhasil diupload!');
                    } catch (err) {
                        console.error('Error saving to localStorage:', err);
                        showNotification('⚠️ Foto diupload tapi tidak tersimpan permanen', 'warning');
                    }
                };
                
                reader.readAsDataURL(file);
            } else {
                showNotification('⚠️ File harus berupa gambar', 'warning');
            }
        });
    }
    
    // Load saved profile image or use default
    try {
        const savedProfile = localStorage.getItem('profile-img');
        if (savedProfile && profileImg && profilePlaceholder) {
            profileImg.src = savedProfile;
            profileImg.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        } else if (profileImg) {
            // Use default image if no saved image
            profileImg.src = defaultProfileImg;
            profileImg.style.display = 'block';
            if (profilePlaceholder) {
                profilePlaceholder.style.display = 'none';
            }
        }
    } catch (err) {
        console.error('Error loading profile image:', err);
        // Fallback to default image
        if (profileImg) {
            profileImg.src = defaultProfileImg;
            profileImg.style.display = 'block';
        }
    }

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animate numbers on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            // Format number properly - show 1 decimal if needed, 2 if very small
            if (Math.abs(end) < 1) {
                element.textContent = value.toFixed(2);
            } else {
                // For numbers >= 1, show with comma as decimal separator
                element.textContent = value.toFixed(2).replace('.', ',');
            }
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate result highlights when visible
    const resultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Store original value with proper parsing
                const originalText = element.textContent.trim().replace(',', '.');
                const value = parseFloat(originalText);
                if (!isNaN(value)) {
                    element.textContent = '0';
                    animateValue(element, 0, value, 1000);
                    resultObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    const resultHighlights = document.querySelectorAll('.result-highlight');
    resultHighlights.forEach(highlight => {
        resultObserver.observe(highlight);
    });

    // Add click effect to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Parallax effect on hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add ripple effect to scenario items
    const scenarioItems = document.querySelectorAll('.scenario-item');
    scenarioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Highlight active section in navigation (if you add nav later)
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.card');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add confetti effect on verdict
    const verdict = document.querySelector('.verdict');
    if (verdict) {
        const verdictObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createConfetti();
                    verdictObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        verdictObserver.observe(verdict);
    }

    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.opacity = '1';
                confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
                confetti.style.transition = 'all 3s ease-out';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.style.top = window.innerHeight + 'px';
                    confetti.style.opacity = '0';
                    confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
                }, 100);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    // Add interactive tooltip for formulas
    const formulas = document.querySelectorAll('.formula');
    formulas.forEach(formula => {
        formula.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        formula.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Print functionality
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ Print Analisis';
        printBtn.style.position = 'fixed';
        printBtn.style.bottom = '20px';
        printBtn.style.right = '20px';
        printBtn.style.padding = '15px 30px';
        printBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        printBtn.style.color = 'white';
        printBtn.style.border = 'none';
        printBtn.style.borderRadius = '50px';
        printBtn.style.cursor = 'pointer';
        printBtn.style.fontSize = '16px';
        printBtn.style.fontWeight = 'bold';
        printBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        printBtn.style.zIndex = '1000';
        printBtn.style.transition = 'transform 0.3s ease';
        
        printBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        printBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printBtn);
    };
    
    addPrintButton();

    // Console message
    console.log('%c📊 Analisis Likuiditas Toko Sembako Berkah', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite dibuat dengan ❤️ untuk tugas mahasiswa', 'color: #764ba2; font-size: 14px;');

    // Image zoom functionality for manual calculations
    const manualImages = document.querySelectorAll('.manual-calculation-img');
    manualImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: zoom-out;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0,0,0,0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });

    // Image upload functionality - ENABLED with default fallback
    const uploadCR = document.getElementById('upload-cr');
    const uploadQR = document.getElementById('upload-qr');
    
    // Upload CR image
    if (uploadCR) {
        uploadCR.addEventListener('change', function(e) {
            handleImageUpload(e, 'img-cr', 'placeholder-cr', 'CR');
        });
    }
    
    // Upload QR image
    if (uploadQR) {
        uploadQR.addEventListener('change', function(e) {
            handleImageUpload(e, 'img-qr', 'placeholder-qr', 'QR');
        });
    }
    
    function handleImageUpload(event, imgId, placeholderId, type) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = document.getElementById(imgId);
                const placeholder = document.getElementById(placeholderId);
                
                img.src = e.target.result;
                img.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Save to localStorage with error handling
                try {
                    localStorage.setItem(imgId, e.target.result);
                    showNotification(`✅ Foto ${type} berhasil diupload!`);
                } catch (err) {
                    console.error('Error saving to localStorage:', err);
                    showNotification('⚠️ Foto diupload tapi tidak tersimpan permanen', 'warning');
                }
            };
            
            reader.readAsDataURL(file);
        } else {
            showNotification('⚠️ File harus berupa gambar', 'warning');
        }
    }
    
    // Load saved images from localStorage with fallback to default images
    function loadSavedImages() {
        const images = [
            { id: 'img-cr', placeholderId: 'placeholder-cr', defaultSrc: 'images/CR.jpeg', storageKey: 'img-cr' },
            { id: 'img-qr', placeholderId: 'placeholder-qr', defaultSrc: 'images/QR.jpeg', storageKey: 'img-qr' }
        ];
        
        images.forEach(imgData => {
            const img = document.getElementById(imgData.id);
            const placeholder = document.getElementById(imgData.placeholderId);
            
            if (!img) return;
            
            try {
                const savedImg = localStorage.getItem(imgData.storageKey);
                
                if (savedImg) {
                    // Use saved image from localStorage
                    img.src = savedImg;
                } else {
                    // Use default image from folder
                    img.src = imgData.defaultSrc;
                }
                
                img.style.display = 'block';
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            } catch (err) {
                console.error(`Error loading ${imgData.id}:`, err);
                // Fallback to default image
                img.src = imgData.defaultSrc;
                img.style.display = 'block';
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            }
            
            // Add error handler in case image fails to load
            img.onerror = function() {
                console.error(`Failed to load image: ${this.src}`);
                showNotification(`⚠️ Gagal memuat gambar ${imgData.storageKey}`, 'warning');
            };
        });
    }
    
    // Load saved images on page load
    loadSavedImages();
    
    // Re-enable upload functionality
    const uploadInputs = document.querySelectorAll('input[type="file"]');
    uploadInputs.forEach(input => {
        input.disabled = false;
    });
    
    // Re-enable all upload buttons
    const uploadButtons = document.querySelectorAll('.upload-btn, .upload-profile-btn');
    uploadButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
    
    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)' : 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)'};
            color: white;
            border-radius: 10px;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Add notification animations to CSS
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notifStyle);
});
