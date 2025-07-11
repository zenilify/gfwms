// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search functionality
function createSearchOverlay() {
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <div class="search-header">
                <h3>Dokumentation durchsuchen</h3>
                <button class="close-search">&times;</button>
            </div>
            <input type="text" id="search-input" placeholder="Nach Störungscode oder Stichwort suchen...">
            <div class="search-results"></div>
        </div>
    `;
    document.body.appendChild(searchOverlay);
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.querySelector('.search-results');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Simple search through documentation
        const results = searchDocumentation(query);
        displaySearchResults(results);
    });
    
    // Close search overlay
    document.querySelector('.close-search').addEventListener('click', () => {
        document.body.removeChild(searchOverlay);
    });
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            document.body.removeChild(searchOverlay);
        }
    });
    
    searchInput.focus();
}

function searchDocumentation(query) {
    const searchData = [
        { title: '10003 - Kommunikationsstörung', url: 'docs/wiki.html#10003', type: 'Fördertechnik' },
        { title: '10006 - Konturenfehler', url: 'docs/wiki.html#10006', type: 'Fördertechnik' },
        { title: '10009 - Befristete Annahmesperre', url: 'docs/wiki.html#10009', type: 'Fördertechnik' },
        { title: '10024 - Ziel unerreichbar', url: 'docs/wiki.html#10024', type: 'Fördertechnik' },
        { title: '10039 - Timeout Platzbelegung', url: 'docs/wiki.html#10039', type: 'Fördertechnik' },
        { title: '10045 - Protokollfehler', url: 'docs/wiki.html#10045', type: 'Fördertechnik' },
        { title: '10053 - Kein Weg modelliert', url: 'docs/wiki.html#10053', type: 'Fördertechnik' },
        { title: '20162 - TE-ID ist Null', url: 'docs/wiki.html#20162', type: 'Fördertechnik' },
        { title: '10004 - Zielfach belegt', url: 'docs/wiki.html#10004', type: 'Behälter-RBG' },
        { title: '10005 - Quellfach nicht belegt', url: 'docs/wiki.html#10005', type: 'Behälter-RBG' },
        { title: '10007 - LAM belegt vor Aufnahme', url: 'docs/wiki.html#10007', type: 'Behälter-RBG' },
        { title: '10008 - LAM frei vor Abgabe', url: 'docs/wiki.html#10008', type: 'Behälter-RBG' },
        { title: 'Fördertechnik Störungen Guide', url: 'docs/conveyor_system_errors.html', type: 'Spezialguide' },
        { title: 'Vollständige Dokumentation', url: 'docs/wiki.html', type: 'Vollständig' }
    ];
    
    return searchData.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">Keine Ergebnisse gefunden</p>';
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result">
            <h4><a href="${result.url}">${result.title}</a></h4>
            <span class="result-type">${result.type}</span>
        </div>
    `).join('');
}

// Add keyboard shortcut for search (Ctrl+K)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        createSearchOverlay();
    }
});

// Add search styles
const searchStyles = `
    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .search-container {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .close-search {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    }
    
    #search-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    
    #search-input:focus {
        outline: none;
        border-color: #3498db;
    }
    
    .search-result {
        padding: 1rem;
        border-bottom: 1px solid #e9ecef;
        transition: background-color 0.3s ease;
    }
    
    .search-result:hover {
        background-color: #f8f9fa;
    }
    
    .search-result h4 {
        margin: 0 0 0.5rem 0;
    }
    
    .search-result a {
        color: #3498db;
        text-decoration: none;
    }
    
    .search-result a:hover {
        text-decoration: underline;
    }
    
    .result-type {
        background-color: #ecf0f1;
        color: #2c3e50;
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .no-results {
        text-align: center;
        color: #666;
        padding: 2rem;
    }
`;

// Add search styles to head
const styleElement = document.createElement('style');
styleElement.textContent = searchStyles;
document.head.appendChild(styleElement);

// Add search button to navigation
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav ul');
    if (nav) {
        const searchButton = document.createElement('li');
        searchButton.innerHTML = '<a href="#" class="nav-link" id="search-btn"><i class="fas fa-search"></i> Suchen</a>';
        nav.appendChild(searchButton);
        
        document.getElementById('search-btn').addEventListener('click', (e) => {
            e.preventDefault();
            createSearchOverlay();
        });
    }
});

// Add loading animation for page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add tooltip functionality for error codes
document.addEventListener('DOMContentLoaded', () => {
    const errorCodes = document.querySelectorAll('strong');
    
    errorCodes.forEach(code => {
        if (code.textContent.match(/^\d{5}$/)) {
            code.style.cursor = 'help';
            code.title = `Fehlercode ${code.textContent} - Klicken für Details`;
        }
    });
});