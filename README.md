# Laura Adesoro — UX Designer Portfolio

A personal portfolio site for Laura Adesoro, a UX designer and experience strategist. The site features password protection, a live weather widget, and a showcase of featured design work.

## Features

- **Password Protected:** Client-side session-based password gate (password: `pleaseenter`)
- **Live Weather Widget:** Displays current weather based on geolocation (via Open-Meteo API)
- **Responsive Design:** Mobile-first design with warm, modern aesthetic
- **Featured Work:** Portfolio section showcasing 4 design projects
- **About Section:** Bio with headshot and (currently commented out) expertise breakdown
- **Contact Section:** Call-to-action with email and LinkedIn links

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with CSS variables, gradients, and animations
- **JavaScript (Vanilla)** — No build tools or frameworks
- **APIs:**
  - Open-Meteo (weather data)
  - Nominatim/OpenStreetMap (reverse geolocation)
  - Browser Geolocation API

## Project Structure

```
my-site/
├── index.html              # Main page
├── work.html               # Work/portfolio page
├── css/
│   └── style.css           # All site styles
├── js/
│   ├── auth.js             # Password protection (session-based)
│   └── app.js              # Weather widget and UI handlers
├── assets/
│   └── images/
│       └── headshot.jpg    # Laura's headshot
└── README.md               # This file
```

## Setup & Running

### Option 1: Local Static Server (Recommended)

```bash
cd /Users/laura.adesoro/Desktop/my-site
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Why?** Geolocation and weather widget require HTTP/HTTPS (not `file://`).

### Option 2: Direct File Access

Open `index.html` directly in your browser:
```bash
open index.html
```

**Note:** Geolocation & weather widget won't work via `file://` protocol.

## Password Protection

**Password:** `pleaseenter`

The password protection is **client-side only** (stored in `sessionStorage`). This is suitable for demo/preview purposes but **not secure** for sensitive content. For production:
- Use server-side HTTP Basic Auth
- Add a proper backend authentication system
- Use HTTPS

To modify or remove password protection, edit `js/auth.js`.

## Key Pages & Sections

- **Hero:** Introduction with call-to-action buttons
- **Featured Work:** Grid of 4 design projects with descriptions and tags
- **About:** Bio, headshot, and expertise (expertise list currently commented out)
- **Contact:** Email and LinkedIn links
- **Weather Widget:** Fixed widget in top-right corner; collapses when scrolled

## Customization

### Change Password
Edit `js/auth.js`, line 3:
```javascript
const PASSWORD = 'pleaseenter'; // Change this value
```

### Update Headshot
Replace `assets/images/headshot.jpg` with your own image (recommended: ~800px wide, optimized JPG/WebP).

### Modify Color Palette
Edit CSS variables in `css/style.css`, lines 8–17:
```css
--primary: #2a221f;
--secondary: #e43d12;
--accent: #fff3e6;
/* etc. */
```

### Add/Edit Projects
Modify the `.work-grid` section in `index.html` to add, remove, or update portfolio items.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Geolocation feature requires HTTPS or localhost

## Notes

- The expertise list section is currently commented out in `index.html` (around line 148–172).
- Weather widget gracefully falls back if geolocation is denied or APIs are unavailable.
- All animations and interactions are CSS-based for performance.

## Future Enhancements

- Uncomment and style the expertise list
- Add more portfolio projects
- Implement form submission for contact section
- Add dark mode toggle
- Server-side password protection for production use

---

**Last Updated:** May 15, 2026  
**Author:** Laura Adesoro  
**Co-authored by:** GitHub Copilot
