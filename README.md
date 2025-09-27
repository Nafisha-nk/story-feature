# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# Stories Feature 📸

An Instagram-style stories feature built with Vue 3 and Vite. Upload images as stories that automatically disappear after 24 hours, with progress bars, swipe navigation, and a responsive design.

## ✨ Features

- **📱 Instagram-like Interface**: Familiar stories UI with circular avatars
- **🖼️ Unlimited Story Uploads**: No restrictions on the number of stories
- **📏 No Image Size Limits**: Upload images of any dimensions
- **⏰ 24-Hour Expiration**: Stories automatically disappear after 24 hours
- **🎯 Progress Indicators**: Visual progress bars for each story
- **👆 Swipe Navigation**: Swipe left/right to navigate between stories
- **⌨️ Keyboard Support**: Use arrow keys for navigation
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **💾 Client-Side Storage**: Uses localStorage (no backend required)

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nafisha-nk/story-feature.git
   cd story-feature
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
story-feature/
├── public/                 # Static files
├── src/
│   ├── components/         # Vue components
│   │   ├── StoriesContainer.vue  # Stories list display
│   │   ├── StoryViewer.vue       # Full-screen story viewer
│   │   └── UploadModal.vue       # Image upload modal
│   ├── composables/        # Composition API functions
│   │   └── useStories.js   # Stories management logic
│   ├── App.vue             # Root component
│   ├── main.js             # Application entry point
│   └── App.css             # All styles in one file
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎮 How to Use

### Adding Stories
1. Click the **"+"** button in the stories container
2. Select an image from your device (any size supported)
3. Click **"Upload Story"** - the image will be compressed and stored
4. Your story will appear in the stories list

### Viewing Stories
1. Click on any story circle to open the viewer
2. Stories automatically progress every 3 seconds
3. **Swipe left/right** or use **arrow keys** to navigate
4. Click the **"×"** button or press **Escape** to exit

### Navigation Controls
- **→** or **Swipe Left**: Next story
- **←** or **Swipe Right**: Previous story
- **Esc** or **Click ×**: Close viewer

## 🛠️ Technical Details

### Technologies Used
- **Vue 3**: Composition API for reactive state management
- **Vite**: Fast build tool and development server
- **LocalStorage**: Client-side data persistence
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Modern JavaScript features

### Key Features Implementation

#### Image Compression
```javascript
// Images are automatically compressed to reduce storage usage
const compressImage = (file) => {
  // Resizes images to max 800px dimension
  // Converts to JPEG with 70% quality
  // Reduces file size by ~60-80%
}
```

#### Storage Management
```javascript
// Automatic cleanup of expired stories
stories.value = parsedStories.filter(story => 
  now - story.timestamp < 24 * 60 * 60 * 1000 // 24 hours
);
```

#### Swipe Detection
```javascript
// Touch event handlers for mobile swipe gestures
const handleSwipe = () => {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > swipeThreshold) {
    // Navigate to next/previous story
  }
};
```

## 🎨 Customization

### Changing Colors
Edit `src/App.css` to customize the color scheme:

```css
/* Primary accent color */
.add-story-circle {
  color: #0095f6; /* Change to your preferred color */
}

/* Story gradient */
.story-avatar {
  background: linear-gradient(45deg, #f09433 0%, #bc1888 100%);
}
```

### Modifying Story Duration
Change the story display duration in `src/components/StoryViewer.vue`:

```javascript
// Change 3000 to desired milliseconds
progressInterval.value = setInterval(() => {
  // Progress logic
}, 50); // 3000ms total = 3 seconds per story
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 TODO / Future Enhancements

- [ ] Video story support
- [ ] Text overlays on stories
- [ ] Story reactions/emojis
- [ ] Story analytics
- [ ] Multiple user support
- [ ] Backend integration
- [ ] PWA capabilities
- [ ] Dark mode

## 🐛 Troubleshooting

### Common Issues

**"Quota exceeded" error**
- Solution: The app automatically manages storage by compressing images and removing oldest stories when needed

**Images not loading**
- Solution: Check browser console for errors and ensure images are valid

**Swipe not working on mobile**
- Solution: Ensure touch events are enabled and try refreshing the page

### Debug Mode
Enable debug logging by opening browser console and setting:
```javascript
localStorage.setItem('debug', 'true')
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Instagram Stories
- Built with Vue 3 Composition API
- Vite for excellent developer experience
- Modern CSS for responsive design


## Key Sections Included:

1. **Badges** - Visual indicators for technologies used
2. **Features** - Comprehensive list of what the app does
3. **Quick Start** - Easy setup instructions
4. **Project Structure** - Clear file organization
5. **How to Use** - User-friendly instructions
6. **Technical Details** - Developer-focused information
7. **Customization** - How to modify the app
8. **Troubleshooting** - Common issues and solutions
9. **Future Enhancements** - Potential improvements

https://roadmap.sh/projects/stories-feature



