class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.infoWindow = null;
        this.placesService = null;
        this.bounds = null;
        this.loadingIndicator = document.getElementById('loading-indicator');
        // Default coordinates (Nairobi, Kenya)
        this.defaultLocation = {
            lat: -1.2921,
            lng: 36.8219
        };
    }

    async initialize() {
        try {
            this.showLoading();
            
            // Initialize map centered on Nairobi
            const mapOptions = {
                zoom: 12, // Adjusted zoom level for better city view
                center: this.defaultLocation,
                styles: this.getCustomMapStyle(),
                mapTypeControl: false
            };

            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            this.infoWindow = new google.maps.InfoWindow();
            this.placesService = new google.maps.places.PlacesService(this.map);
            this.bounds = new google.maps.LatLngBounds();
            
            // Search for nearby locations (Note: might need to adjust search terms for Nairobi)
            await this.searchNearbyPlaces(this.defaultLocation);
            
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing map:', error);
            this.hideLoading();
            this.showError('Unable to initialize map.');
        }
    }

    getCustomMapStyle() {
        return [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];
    }

    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
    }

    async searchNearbyPlaces(position) {
        const request = {
            location: position,
            radius: '5000', // 5km radius
            // Adjusted search terms for Nairobi context
            keyword: 'pharmacy medical store', // Modified search terms
            type: ['pharmacy', 'store', 'health']
        };

        try {
            const results = await this.nearbySearch(request);
            this.clearMarkers();
            
            if (results.length === 0) {
                this.showError('No locations found in this area.');
                return;
            }

            results.forEach(place => {
                this.addLocationMarker(place);
            });

            this.map.fitBounds(this.bounds);
        } catch (error) {
            console.error('Error searching nearby locations:', error);
            this.showError('Unable to find nearby locations.');
        }
    }

    nearbySearch(request) {
        return new Promise((resolve, reject) => {
            this.placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                } else {
                    reject(new Error(`Places service failed: ${status}`));
                }
            });
        });
    }

    addLocationMarker(place) {
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: place.name,
            animation: google.maps.Animation.DROP
        });

        this.markers.push(marker);
        this.bounds.extend(place.geometry.location);

        marker.addListener('click', () => {
            this.showPlaceDetails(place, marker);
        });
    }

    async showPlaceDetails(place, marker) {
        try {
            const details = await this.getPlaceDetails(place.place_id);
            const card = document.getElementById('location-card');
            
            // Update card content
            card.querySelector('h3').textContent = details.name;
            const openNowText = details.opening_hours?.isOpen() ? 
                '<span class="text-emerald-600">Open Now</span>' : 
                '<span class="text-red-600">Closed</span>';
            
            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-emerald-900">${details.name}</h3>
                    ${openNowText}
                </div>
                <div class="space-y-2 text-emerald-700">
                    <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        ${details.formatted_address}
                    </p>
                    ${details.formatted_phone_number ? `
                    <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        ${details.formatted_phone_number}
                    </p>
                    ` : ''}
                    ${details.rating ? `
                    <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        ${details.rating} (${details.user_ratings_total} reviews)
                    </p>
                    ` : ''}
                </div>
            `;

            card.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    }

    getPlaceDetails(placeId) {
        return new Promise((resolve, reject) => {
            this.placesService.getDetails(
                { placeId: placeId, fields: ['name', 'formatted_address', 'formatted_phone_number', 'opening_hours', 'rating', 'user_ratings_total'] },
                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(place);
                    } else {
                        reject(new Error(`Place details failed: ${status}`));
                    }
                }
            );
        });
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    showError(message) {
        // Implement error notification
        alert(message);
    }

    async checkApiStatus() {
        try {
            // Test API with a simple geocoding request
            const geocoder = new google.maps.Geocoder();
            await this.geocodeAddress(geocoder, 'Los Angeles, CA');
            console.log('Google Maps API connected successfully');
        } catch (error) {
            console.error('Google Maps API connection failed:', error);
            this.showError(ERRORS.API_ERROR);
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

    // Add a method to handle API errors
    handleApiError(error) {
        console.error('API Error:', error);
        
        if (error.code === 'ZERO_RESULTS') {
            this.showError('No dispensaries found in this area.');
        } else if (error.code === 'OVER_QUERY_LIMIT') {
            this.showError('Too many requests. Please try again later.');
        } else {
            this.showError(ERRORS.API_ERROR);
        }
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mapManager = new MapManager();
    mapManager.initialize();
}); 