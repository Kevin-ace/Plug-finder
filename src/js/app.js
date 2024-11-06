class PlugFinder {
    constructor() {
        this.mapManager = new MapManager();
        this.searchInput = document.querySelector('input[type="text"]');
        this.filterButtons = document.querySelectorAll('button');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchInput.placeholder = "Enter location in Nairobi (e.g., Westlands)";
        
        this.searchInput.addEventListener('input', debounce((e) => this.handleSearch(e), 500));
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    async handleSearch(e) {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length < 3) return;

        try {
            const geocoder = new google.maps.Geocoder();
            const result = await this.geocodeAddress(geocoder, `${searchTerm}, Nairobi, Kenya`);
            
            if (result) {
                const location = {
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng()
                };
                
                this.mapManager.map.setCenter(location);
                await this.mapManager.searchNearbyPlaces(location);
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            this.mapManager.showError('Location not found. Please try again.');
        }
    }

    geocodeAddress(geocoder, address) {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    resolve(results[0]);
                } else {
                    reject(new Error(`Geocoding failed: ${status}`));
                }
            });
        });
    }

    handleFilter(e) {
        const filter = e.target.textContent.toLowerCase();
        this.filterButtons.forEach(btn => {
            btn.classList.remove('bg-emerald-500', 'text-white');
            btn.classList.add('bg-emerald-100', 'text-emerald-700');
        });
        e.target.classList.remove('bg-emerald-100', 'text-emerald-700');
        e.target.classList.add('bg-emerald-500', 'text-white');
        // Implement filter functionality
    }

    showError(message) {
        // Implement error notification
        alert(message);
    }
}

// Debounce helper function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PlugFinder();
}); 