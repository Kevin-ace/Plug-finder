const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'AIzaSyD1qkaMqSq469nQ0rkw5Tfqil_Pq5yMQmE',
    DEFAULT_RADIUS: 5000, // 5km search radius
    DEFAULT_ZOOM: 13,
    SEARCH_DELAY: 500, // milliseconds
};

// Add error messages
const ERRORS = {
    LOCATION_DENIED: 'Location access was denied. Please enable location services to find nearby dispensaries.',
    GEOCODING_FAILED: 'Unable to find this location. Please try a different search term.',
    API_ERROR: 'There was an error connecting to the service. Please try again later.',
}; 