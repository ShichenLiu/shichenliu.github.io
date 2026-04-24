// Simple smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded successfully!');
    
    // Handle home link smooth scroll to top
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Home link clicked, scrolling to top...');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found', navLinks.length, 'navigation links');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            const targetId = this.getAttribute('href').substring(1); // Remove the #
            console.log('Clicked link, scrolling to:', targetId);
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                console.log('Found target element, scrolling...');
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (targetId === '') {
                // Handle empty hash (just #) - scroll to top
                console.log('Empty hash, scrolling to top...');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                console.log('Target element not found:', targetId);
            }
        });
    });
    
    // Publications toggle functionality with interleaving
    const showAllBtn = document.getElementById('show-all-publications');
    const publicationsList = document.getElementById('publications-list');
    const allPublications = document.getElementById('all-publications');
    
    let isExpanded = false;
    
    if (showAllBtn && publicationsList && allPublications) {
        showAllBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Show all publications with interleaving
                interleavePublications();
                showAllBtn.textContent = 'Show Less';
                isExpanded = true;
            } else {
                // Hide all publications and show only featured
                showOnlyFeatured();
                showAllBtn.textContent = 'Show Full List';
                isExpanded = false;
            }
        });
    }
    
    function interleavePublications() {
        // Get featured items (already visible)
        const featuredItems = Array.from(publicationsList.querySelectorAll('.featured-publication'));
        
        // Store original positions of featured items
        const originalPositions = featuredItems.map(item => ({
            element: item,
            rect: item.getBoundingClientRect()
        }));
        
        // Get ONLY non-featured items from all-publications
        const allItemsFromContainer = Array.from(allPublications.querySelectorAll('.publication-item'));
        const nonFeaturedItems = allItemsFromContainer.filter(item => 
            item.dataset.featured !== 'true'
        );
        
        // Move non-featured items from all-publications to publications-list as transparent
        nonFeaturedItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            publicationsList.appendChild(item);
        });
        
        // Now we have all items in publications-list, sort them by date
        const allItems = Array.from(publicationsList.querySelectorAll('.publication-item'));
        const sortedItems = allItems.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA;
        });
        
        // Reorder in DOM (this will cause instant jump)
        sortedItems.forEach((item, index) => {
            publicationsList.appendChild(item);
        });
        
        // Calculate new positions and animate featured items from old to new positions
        originalPositions.forEach(({element, rect}) => {
            const newRect = element.getBoundingClientRect();
            const deltaY = rect.top - newRect.top;
            
            if (Math.abs(deltaY) > 1) { // Only animate if there's significant movement
                // Start from original position
                element.style.transform = `translateY(${deltaY}px)`;
                element.style.transition = 'none';
                
                // Force reflow to apply the transform
                element.offsetHeight;
                
                // Animate to new position
                requestAnimationFrame(() => {
                    element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.transform = 'translateY(0)';
                });
            }
        });
        
        // Start non-featured items animation
        setTimeout(() => {
            nonFeaturedItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    // Reset transition after animation completes to restore hover effects
                    setTimeout(() => {
                        item.style.transition = '';
                    }, 600);
                }, index * 80);
            });
        }, 100); // Slightly longer delay to ensure featured items start moving first
    }
    
    function showOnlyFeatured() {
        const featuredItems = Array.from(publicationsList.querySelectorAll('.featured-publication'));
        const nonFeaturedItems = Array.from(publicationsList.querySelectorAll('.publication-item')).filter(item => 
            !item.classList.contains('featured-publication')
        );
        
        // 1. Capture current positions of featured items
        const oldPositions = featuredItems.map(item => ({
            element: item,
            rect: item.getBoundingClientRect()
        }));
        
        // 2. Start fading out non-featured items
        nonFeaturedItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'opacity 0.8s ease';
                item.style.opacity = '0';
            }, index * 80);
        });
        
        // 3. After fade starts, remove non-featured items from DOM and animate featured items
        setTimeout(() => {
            // Create placeholder to maintain space during animation
            let totalHeight = 0;
            nonFeaturedItems.forEach(item => {
                totalHeight += item.offsetHeight;
                const style = window.getComputedStyle(item);
                totalHeight += parseInt(style.marginTop) || 0;
                totalHeight += parseInt(style.marginBottom) || 0;
            });
            
            const placeholder = document.createElement('div');
            placeholder.style.height = totalHeight + 'px';
            placeholder.style.transition = 'height 0.8s ease';
            placeholder.className = 'publications-placeholder';
            
            // Insert placeholder before removing items
            if (nonFeaturedItems.length > 0) {
                publicationsList.insertBefore(placeholder, nonFeaturedItems[0]);
            }
            
            // Remove non-featured items from DOM
            nonFeaturedItems.forEach(item => {
                allPublications.appendChild(item);
                item.style.opacity = '';
                item.style.transition = '';
                item.style.transform = '';
            });
            
            // Get new positions after DOM removal (but with placeholder maintaining space)
            const newPositions = featuredItems.map(item => ({
                element: item,
                rect: item.getBoundingClientRect()
            }));
            
            // Apply FLIP animation
            oldPositions.forEach(({element, rect: oldRect}) => {
                const newPos = newPositions.find(pos => pos.element === element);
                if (newPos) {
                    const deltaY = oldRect.top - newPos.rect.top;
                    
                    if (Math.abs(deltaY) > 1) {
                        // Start from old position
                        element.style.transform = `translateY(${deltaY}px)`;
                        element.style.transition = 'none';
                        element.offsetHeight; // Force reflow
                        
                        // Animate to new position
                        element.style.transition = 'transform 0.8s ease';
                        element.style.transform = 'translateY(0)';
                        
                        // Clean up after animation
                        setTimeout(() => {
                            element.style.transform = '';
                            element.style.transition = '';
                        }, 800);
                    }
                }
            });
            
            // Gradually shrink placeholder to allow sections below to move up smoothly
            setTimeout(() => {
                placeholder.style.height = '0px';
                
                // Remove placeholder after it shrinks
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                    }
                }, 800);
            }, 100); // Start shrinking shortly after FLIP animation starts
            
        }, 400); // Wait for fade to be well underway
    }
    
    
    // Photo gallery modal
    const showPhotoBtn = document.getElementById('show-photo-gallery');
    const photoModal = document.getElementById('photo-modal');
    const photoClose = document.getElementById('photo-close');
    const photoPrev = document.getElementById('photo-prev');
    const photoNext = document.getElementById('photo-next');
    const mainImage = document.getElementById('main-image');
    const slideCaption = document.getElementById('slide-caption');
    const photoThumbnails = document.getElementById('photo-thumbnails');
    
    let currentSlideIndex = 0;
    let allImages = [];
    let preloadedImages = new Map(); // Cache for preloaded images
    
    // Initialize gallery data
    function initializeGallery(startIndex = 0) {
        // Get all images from the gallery data container
        const galleryDataContainer = document.getElementById('gallery-data');
        const galleryItems = galleryDataContainer.querySelectorAll('div');
        allImages = Array.from(galleryItems).map(item => ({
            thumbnail: item.dataset.thumbnail,
            fullsize: item.dataset.fullsize,
            title: item.dataset.title,
            alt: item.dataset.alt
        }));
        
        // Create thumbnails
        createThumbnails();
        
        // Show specified image
        showSlide(startIndex);
    }
    
    function createThumbnails() {
        photoThumbnails.innerHTML = '';
        allImages.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'photo-thumbnail';
            if (index === currentSlideIndex) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = image.thumbnail;
            img.alt = image.alt;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => showSlide(index));
            photoThumbnails.appendChild(thumbnail);
        });
    }
    
    function showSlide(index) {
        if (index < 0 || index >= allImages.length) return;
        
        currentSlideIndex = index;
        const image = allImages[index];
        
        // Check if image is already preloaded
        if (preloadedImages.has(image.fullsize)) {
            // Image is already loaded, show immediately
            mainImage.src = image.fullsize;
            mainImage.alt = image.alt;
            mainImage.classList.add('loaded');
            slideCaption.textContent = image.title;
        } else {
            // Show loading animation
            showLoadingAnimation();
            
            // Set up image loading
            const img = new Image();
            img.onload = function() {
                hideLoadingAnimation();
                mainImage.src = image.fullsize;
                mainImage.alt = image.alt;
                mainImage.classList.add('loaded');
                slideCaption.textContent = image.title;
                
                // Cache the loaded image
                preloadedImages.set(image.fullsize, true);
            };
            img.onerror = function() {
                hideLoadingAnimation();
                slideCaption.textContent = 'Error loading image';
            };
            img.src = image.fullsize;
        }
        
        // Update thumbnail active state
        const thumbnails = photoThumbnails.querySelectorAll('.photo-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Preload adjacent images for smoother navigation
        preloadAdjacentImages(index);
    }
    
    function preloadAdjacentImages(currentIndex) {
        const preloadIndexes = [
            (currentIndex - 1 + allImages.length) % allImages.length,
            (currentIndex + 1) % allImages.length
        ];
        
        preloadIndexes.forEach(index => {
            const image = allImages[index];
            if (!preloadedImages.has(image.fullsize)) {
                const img = new Image();
                img.onload = function() {
                    preloadedImages.set(image.fullsize, true);
                };
                img.src = image.fullsize;
            }
        });
    }
    
    function showLoadingAnimation() {
        // Remove existing loading elements
        hideLoadingAnimation();
        
        // Create loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'photo-loading';
        loadingSpinner.id = 'photo-loading-spinner';
        
        // Create loading text
        const loadingText = document.createElement('div');
        loadingText.className = 'photo-loading-text';
        loadingText.id = 'photo-loading-text';
        loadingText.textContent = 'Loading high-quality image...';
        
        // Add to slideshow
        const slideshow = document.querySelector('.photo-slideshow');
        slideshow.appendChild(loadingSpinner);
        slideshow.appendChild(loadingText);
    }
    
    function hideLoadingAnimation() {
        const spinner = document.getElementById('photo-loading-spinner');
        const text = document.getElementById('photo-loading-text');
        
        if (spinner) spinner.remove();
        if (text) text.remove();
    }
    
    function nextSlide() {
        const nextIndex = (currentSlideIndex + 1) % allImages.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlideIndex - 1 + allImages.length) % allImages.length;
        showSlide(prevIndex);
    }
    
    function openModal(startIndex = 0) {
        photoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Trigger fade in after a brief delay to ensure display is set
        setTimeout(() => {
            photoModal.classList.add('show');
        }, 10);
        
        initializeGallery(startIndex);
    }
    
    function closeModal() {
        photoModal.classList.remove('show');
        
        // Wait for fade out transition to complete before hiding
        setTimeout(() => {
            photoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 300); // Match CSS transition duration
    }
    
    // Event listeners
    if (showPhotoBtn && photoModal) {
        showPhotoBtn.addEventListener('click', () => openModal(0));
    }
    
    // Make main page thumbnails clickable
    const mainPageThumbnails = document.querySelectorAll('#photo-preview-grid .photo-item');
    mainPageThumbnails.forEach((thumbnail, index) => {
        thumbnail.style.cursor = 'pointer';
        thumbnail.addEventListener('click', () => {
            // Show loading state on clicked thumbnail
            thumbnail.classList.add('loading');
            
            // Find the index of this image in the full gallery data
            const thumbnailSrc = thumbnail.querySelector('img').src;
            const galleryDataContainer = document.getElementById('gallery-data');
            const galleryItems = galleryDataContainer.querySelectorAll('div');
            let galleryIndex = -1;
            
            for (let i = 0; i < galleryItems.length; i++) {
                if (galleryItems[i].dataset.thumbnail === thumbnailSrc) {
                    galleryIndex = i;
                    break;
                }
            }
            
            // Small delay to show loading state, then open modal
            setTimeout(() => {
                openModal(galleryIndex >= 0 ? galleryIndex : index);
                // Remove loading state after modal opens
                setTimeout(() => {
                    thumbnail.classList.remove('loading');
                }, 500);
            }, 150);
        });
    });
    
    if (photoClose) {
        photoClose.addEventListener('click', closeModal);
    }
    
    if (photoPrev) {
        photoPrev.addEventListener('click', prevSlide);
    }
    
    if (photoNext) {
        photoNext.addEventListener('click', nextSlide);
    }
    
    // Close modal when clicking on background or outside image/buttons
    if (photoModal) {
        photoModal.addEventListener('click', function(e) {
            // Close if clicking on the modal background
            if (e.target === photoModal) {
                closeModal();
            }
            // Close if clicking on the slideshow area but not on the image or buttons
            const slideshow = document.querySelector('.photo-slideshow');
            if (slideshow && slideshow.contains(e.target)) {
                // Check if click is not on image, buttons, or caption
                const isImage = e.target.tagName === 'IMG';
                const isButton = e.target.closest('.photo-prev, .photo-next, .photo-close');
                const isCaption = e.target.closest('.photo-slide-caption');
                
                if (!isImage && !isButton && !isCaption) {
                    closeModal();
                }
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (photoModal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        }
    });
});