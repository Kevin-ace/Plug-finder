class MapTester {
    static async runTests() {
        console.log('Running map tests...');
        
        try {
            // Test 1: API Connection
            const map = new MapManager();
            await map.initialize();
            console.log('✓ Map initialization successful');

            // Test 2: Geocoding
            const geocoder = new google.maps.Geocoder();
            const result = await map.geocodeAddress(geocoder, 'Los Angeles, CA');
            if (result) {
                console.log('✓ Geocoding successful');
            }

            // Test 3: Places API
            const position = { lat: 34.0522, lng: -118.2437 }; // LA coordinates
            await map.searchNearbyDispensaries(position);
            console.log('✓ Places API successful');

        } catch (error) {
            console.error('Test failed:', error);
        }
    }
}

// Run tests when in development mode
if (process.env.NODE_ENV === 'development') {
    document.addEventListener('DOMContentLoaded', () => {
        MapTester.runTests();
    });
} 