// Weather Widget Script
const weatherWidget = {
  // Weather code mapping to conditions
  weatherCodes: {
    0: { condition: 'Clear', icon: 'sun' },
    1: { condition: 'Mostly Clear', icon: 'sun' },
    2: { condition: 'Partly Cloudy', icon: 'cloud-sun' },
    3: { condition: 'Overcast', icon: 'cloud' },
    45: { condition: 'Foggy', icon: 'cloud' },
    48: { condition: 'Foggy', icon: 'cloud' },
    51: { condition: 'Light Drizzle', icon: 'cloud-rain' },
    53: { condition: 'Drizzle', icon: 'cloud-rain' },
    55: { condition: 'Heavy Drizzle', icon: 'cloud-rain' },
    61: { condition: 'Light Rain', icon: 'cloud-rain' },
    63: { condition: 'Rain', icon: 'cloud-rain' },
    65: { condition: 'Heavy Rain', icon: 'cloud-rain' },
    71: { condition: 'Light Snow', icon: 'cloud-snow' },
    73: { condition: 'Snow', icon: 'cloud-snow' },
    75: { condition: 'Heavy Snow', icon: 'cloud-snow' },
    77: { condition: 'Snow Grains', icon: 'cloud-snow' },
    80: { condition: 'Light Showers', icon: 'cloud-rain' },
    81: { condition: 'Rain Showers', icon: 'cloud-rain' },
    82: { condition: 'Heavy Showers', icon: 'cloud-rain' },
    85: { condition: 'Light Snow Showers', icon: 'cloud-snow' },
    86: { condition: 'Snow Showers', icon: 'cloud-snow' },
    95: { condition: 'Thunderstorm', icon: 'zap' },
    96: { condition: 'Thunderstorm', icon: 'zap' },
    99: { condition: 'Thunderstorm', icon: 'zap' },
  },

  // SVG Icons
  icons: {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    'cloud-sun': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m10.12 10.12l1.42 1.42M1 12h2m16 0h2M4.22 19.78l1.42-1.42M17.66 6.34l1.42-1.42"></path><path d="M16 12a4 4 0 1 1-8 0"></path><path d="M16 5H9.5A3.5 3.5 0 1 0 13 8.5"></path></svg>',
    'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l.06-.06A7 7 0 1 0 5 11.5M9.5 16v3m3-3v3m3-3v3"></path></svg>',
    'cloud-snow': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
  },

  init() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.getWeather(position.coords.latitude, position.coords.longitude),
        (error) => this.handleError(error)
      );
    } else {
      this.handleError('Geolocation not supported');
    }
  },

  async getWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
      );
      const data = await response.json();
      await this.displayWeather(data, latitude, longitude);
    } catch (error) {
      this.handleError(error);
    }
  },

  async getLocation(latitude, longitude) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const address = data.address;
      
      // Try to get city, then town, then village, fallback to county
      const city = address.city || address.town || address.village || address.county || 'Unknown';
      const state = address.state || '';
      
      return state ? `${city}, ${state}` : city;
    } catch (error) {
      console.log('Could not get location name:', error);
      return 'Your Location';
    }
  },

  async displayWeather(data, latitude, longitude) {
    const current = data.current;
    const weatherCode = current.weather_code;
    const weatherInfo = this.weatherCodes[weatherCode] || { condition: 'Unknown', icon: 'cloud' };
    const temp = Math.round(current.temperature_2m);
    
    // Get location name
    const locationName = await this.getLocation(latitude, longitude);

    const iconElement = document.getElementById('weatherIcon');
    const tempElement = document.getElementById('weatherTemp');
    const conditionElement = document.getElementById('weatherCondition');
    const locationElement = document.getElementById('weatherLocation');
    const contentElement = document.getElementById('weatherContent');
    const loadingElement = document.querySelector('.weather-loading');
    const fallbackElement = document.getElementById('weatherFallback');

    iconElement.innerHTML = this.icons[weatherInfo.icon];
    tempElement.textContent = `${temp}°F`;
    conditionElement.textContent = weatherInfo.condition;
    locationElement.textContent = locationName;

    // Hide loading and fallback, show content
    loadingElement.classList.add('hidden');
    fallbackElement.classList.add('hidden');
    contentElement.classList.remove('hidden');
  },

  handleError(error) {
    console.log('Weather widget error:', error);
    const loadingElement = document.querySelector('.weather-loading');
    const fallbackElement = document.getElementById('weatherFallback');
    const contentElement = document.getElementById('weatherContent');
    
    // Hide loading and content, show fallback
    loadingElement.classList.add('hidden');
    contentElement.classList.add('hidden');
    fallbackElement.classList.remove('hidden');
  }
};

// Initialize weather widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => weatherWidget.init());
} else {
  weatherWidget.init();
}

// Weather Widget Scroll Handler
const weatherWidgetElement = document.getElementById('weatherWidget');
let lastScrollTop = 0;
const scrollThreshold = 300;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > scrollThreshold) {
    weatherWidgetElement.classList.add('condensed');
  } else {
    weatherWidgetElement.classList.remove('condensed');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Expand on hover
weatherWidgetElement.addEventListener('mouseenter', () => {
  weatherWidgetElement.classList.remove('condensed');
});

// Re-condense on mouse leave if scrolled past threshold
weatherWidgetElement.addEventListener('mouseleave', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > scrollThreshold) {
    weatherWidgetElement.classList.add('condensed');
  }
});
