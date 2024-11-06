# Plug Finder 🌿

## Description
Plug Finder is a web application that helps users locate cannabis dispensaries in their area. Built with modern web technologies, it provides an interactive map interface to find and explore legal cannabis retailers.

## Features
- 🗺️ Interactive Google Maps integration
- 🔍 Real-time search functionality
- 🏷️ Filter dispensaries by type:
  - In-store
  - Delivery
  - Medical
  - Recreational
- 📍 Detailed dispensary information:
  - Operating hours
  - Contact information
  - Ratings and reviews
  - Address and directions
- 📱 Responsive design for all devices
- ⚡ Real-time updates
- 🔐 Age verification disclaimer

## Technologies Used
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Google Maps API
- Google Places API

## Prerequisites
- Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API
- Modern web browser
- Internet connection

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/plug-finder.git
cd plug-finder
```

2. Configure API Key:
   - Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
   - Replace `YOUR_API_KEY` in `index.html` with your actual API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap" async defer></script>
```

3. Set up local development:
using Python
```bash
   python -m http.server 8000
```
Or using Node.js
```bash
   npx serve
```

4. Open in browser:
   - Navigate to `http://localhost:8000` or `http://localhost:3000`

## Usage

1. Search:
   - Enter a city or ZIP code in the search bar
   - Results will update automatically on the map

2. Filters:
   - Click filter buttons to show specific types of dispensaries
   - Multiple filters can be active simultaneously

3. Viewing Details:
   - Click on any marker to view dispensary details
   - Information card shows:
     - Operating hours
     - Contact information
     - Ratings
     - Address

## API Configuration

### Required APIs
Enable the following in Google Cloud Console:
- Maps JavaScript API
- Places API
- Geocoding API

### API Key Restrictions
Recommended security measures:
- HTTP referrer restrictions
- API key usage quotas
- Application restrictions

## Development

### Project Structure
├── src/
│ ├── index.html
│ ├── js/
│ │ └── app.js
│ └── css/
│ └── style.css
├── README.md


### Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## Security Considerations
- API key protection
- Age verification
- Data privacy
- Usage limitations

## Legal Disclaimer
This application is intended for use only in jurisdictions where cannabis is legal. Users must comply with all local laws and regulations regarding cannabis use and purchase.


## Acknowledgments
- Google Maps Platform
- Tailwind CSS
- Cannabis dispensary data providers
- Open-source community

## Support
For support, please open an issue in the GitHub repository or contact [your-email@example.com]

## Future Enhancements
- [ ] User authentication
- [ ] Favorite dispensaries
- [ ] Review system
- [ ] Real-time inventory
- [ ] Mobile app version
- [ ] Delivery tracking
- [ ] Price comparison
- [ ] Strain database integration

## Version History
- 1.0.0
  - Initial release
  - Basic mapping functionality
  - Search and filter features

---
Made with 💚 by Kevin