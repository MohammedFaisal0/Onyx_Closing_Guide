# دليل الإقفال السنوي — Onyx Pro ERP (الإصدار الثامن)
## Annual Closing Guide — Onyx Pro ERP (Version 8)

A comprehensive, interactive web guide for the annual closing process in Onyx Pro ERP Version 8. This guide provides step-by-step instructions, checklists, and detailed procedures for completing the annual closing workflow.

## Features

- 📋 **Interactive Checklist** - Track your progress with a persistent checklist that saves your state
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Fully responsive and works on all devices
- 🎯 **Table of Contents** - Easy navigation with active section highlighting
- 📊 **Progress Tracking** - Visual progress bar showing reading completion
- 🔍 **Copy to Clipboard** - Quick copy buttons for important codes and commands
- ✨ **Smooth Animations** - Enhanced user experience with smooth transitions
- 🌐 **RTL Support** - Optimized for Arabic (Right-to-Left) content

## Project Structure

```
Onyx_Closing_Guide/
├── index.html      # Main HTML file with all content
├── styles.css      # Custom styles and animations
├── app.js          # Interactive functionality and features
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and animations
- **JavaScript (Vanilla)** - Interactive features
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **LocalStorage API** - For saving user preferences and checklist state

## Key Features Explained

### Interactive Checklist
- Save and restore your checklist progress
- Reset functionality to start over
- Visual indicators for completed items

### Theme Toggle
- Persistent theme preference (saved in localStorage)
- Smooth transitions between light and dark modes
- Automatic system preference detection

### Navigation
- Sticky header with smooth scrolling
- Active section highlighting in table of contents
- Back to top button for easy navigation

### Accordion Sections
- Expandable/collapsible content sections
- Expand all / Collapse all functionality
- Smooth animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Usage

Simply open `index.html` in your web browser. No build process or server required - it's a static website that works offline.

## Customization

### Changing Colors
Edit the Tailwind config in `index.html` to modify the brand colors:
```javascript
colors: {
  brand: {
    500: "#6366f1", // Primary color
    // ... other shades
  }
}
```

### Adding Content
Add new sections in `index.html` following the existing accordion structure:
```html
<div class="accordion bg-white dark:bg-gray-800 ...">
  <button class="accordion-btn">...</button>
  <div class="accordion-body">...</div>
</div>
```

## Design & Development

**Designed by:** Mohammed Al-Shamy

## License

This project is created for internal use with Onyx Pro ERP.

---

For deployment instructions, see the GitHub Pages documentation or contact the developer.

