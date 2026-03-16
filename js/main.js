/* ============================================
   Azkar Website - Main JavaScript
   © 2026 By Mohamed Hany
   ============================================ */

// Current state
let currentCounts = {};
let rosaryCount = 0;
let currentDhikr = 'سبحان الله';

// Theme Functions
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    
    if (icon && text) {
        if (theme === 'dark') {
            icon.textContent = '☀';
            text.textContent = 'الوضع الفاتح';
        } else {
            icon.textContent = '🌙';
            text.textContent = 'الوضع الداكن';
        }
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

// Count Functions
function decrementCount(section, index, total) {
    const key = `${section}-${index}`;
    if (!currentCounts[key]) {
        currentCounts[key] = total;
    }
    
    if (currentCounts[key] > 0) {
        currentCounts[key]--;
        const display = document.getElementById(`count-${section}-${index}`);
        const btn = document.getElementById(`btn-${section}-${index}`);
        
        if (display) {
            display.textContent = `العدد: ${currentCounts[key]} / ${total}`;
        }
        
        if (btn && currentCounts[key] === 0) {
            btn.textContent = '✓ تم';
            btn.classList.add('completed');
            btn.disabled = true;
        }
    }
}

// Electronic Rosary Functions
function selectDhikr(dhikr) {
    currentDhikr = dhikr;
    const label = document.getElementById('rosaryLabel');
    if (label) {
        label.textContent = dhikr;
    }
    
    document.querySelectorAll('.dhikr-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === dhikr) {
            btn.classList.add('active');
        }
    });
}

function incrementRosary() {
    rosaryCount++;
    const display = document.getElementById('rosaryCount');
    if (display) {
        display.textContent = rosaryCount;
    }
}

function resetRosary() {
    rosaryCount = 0;
    const display = document.getElementById('rosaryCount');
    if (display) {
        display.textContent = rosaryCount;
    }
}

// Scroll Functions
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Progress Bar & Scroll Top Button
window.onscroll = function() {
    const scrollTopBtn = document.getElementById('scrollTop');
    const progressBar = document.getElementById('progressBar');
    
    // Show/hide scroll to top button
    if (scrollTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    // Update progress bar
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
});
