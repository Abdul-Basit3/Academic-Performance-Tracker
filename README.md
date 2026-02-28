# GPA & CGPA Calculator

A modern, responsive web application for tracking and analyzing academic performance. Built with React, TypeScript, and Vite, featuring real-time calculations, visual analytics, and offline-first data persistence.

## Features

- **Dashboard**: At-a-glance overview of CGPA, latest semester GPA, total credits, and academic classification
- **GPA Calculator**: Real-time semester GPA calculation with dynamic course management
- **CGPA Tracker**: Comprehensive semester management with edit, delete, and detailed course views
- **Analytics**: Visual performance trends with charts and statistical insights
- **Goal Predictor**: Calculate required GPA to achieve target CGPA with feasibility assessment
- **Settings**: Customizable grading scale (4.0/5.0), theme toggle (light/dark), and data management
- **Welcome Banner**: First-time user onboarding with grading scale selection
- **Mobile Navigation**: Responsive sidebar with hamburger menu for mobile devices
- **Offline-First**: All data persists in browser localStorage for offline access
- **Performance Monitoring**: Integrated Vercel Speed Insights and Analytics

## Development

### Prerequisites
- Node.js 16+ and npm 8+
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Code editor (VS Code recommended)

### Local Setup

```bash
# Clone repository
git clone <repository-url>
cd gpa-calculator

# Install dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:5173

# Build for production
npm run build
# Output in dist/ directory

# Preview production build
npm run preview
# Access at http://localhost:4173
```

### Development Workflow
1. Make changes to source files in `src/`
2. Vite hot-reloads changes automatically
3. Test in browser (check both light and dark themes)
4. Verify responsive design on different screen sizes
5. Run production build to check for errors
6. Commit changes with descriptive messages

## Quick Start

1. **First Visit**: Select your grading scale (4.0 or 5.0) from the welcome banner
2. **Add Semester**: Navigate to GPA Calculator and add courses with names, credits, and grades
3. **Save & Track**: Save the semester to automatically calculate and track your CGPA
4. **View Analytics**: Check the Analytics page for performance trends and insights
5. **Plan Ahead**: Use Goal Predictor to calculate required GPA for target achievement
6. **Customize**: Adjust settings for theme and grading scale preferences

## Key Features

### Grading Scales
- **4.0 Scale**: A/A+ = 4.0, B+ = 3.5, B = 3.0, C+ = 2.5, C = 2.0, D+ = 1.5, D = 1.0, F = 0.0
- **5.0 Scale**: A+ = 5.0, A = 4.5, B+ = 4.0, B = 3.5, C+ = 3.0, C = 2.5, D+ = 2.0, D = 1.5, F = 0.0

### Academic Classifications
Classifications automatically adjust based on your selected grading scale with color-coded indicators.

## Technology Stack

- **React 18.2.0** - Modern UI library with hooks
- **TypeScript 5.3.0** - Type-safe development
- **Vite 5.0.0** - Fast build tool and dev server
- **CSS3** - Responsive design with custom properties
- **LocalStorage API** - Client-side data persistence
- **Vercel Analytics** - User behavior tracking
- **Vercel Speed Insights** - Performance monitoring

## Responsive Design

Fully responsive interface optimized for all devices:
- **Desktop** (1200px+): Full horizontal navigation with expanded layouts
- **Tablet** (768px - 1199px): Horizontal navigation with optimized spacing
- **Mobile** (< 768px): Hamburger menu with slide-in sidebar navigation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Project Structure

```
src/
├── components/       # React components (Dashboard, GPA Calculator, etc.)
├── styles/          # Component-specific CSS files
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (calculations, storage)
├── App.tsx          # Root component with state management
└── main.tsx         # Entry point with analytics integration
```

## Deployment

### Vercel (Recommended)
The app is optimized for Vercel deployment with built-in analytics:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Analytics and Speed Insights are automatically enabled when deployed to Vercel.

### Other Platforms
The app can be deployed to any static hosting service:
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Deploy `dist/` to gh-pages branch
- **Custom Server**: Serve `dist/` folder with any web server

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

For questions or issues, please open an issue in the repository.

## Documentation Files

- **README.md**: Quick start guide and overview
- **DOCUMENTATION.md**: Complete technical documentation with API details
- **PROJECT_REPORT.md**: Comprehensive project report with architecture and analysis

## License

MIT

---

**Last Updated**: February 28, 2026  
**Version**: 1.0.0  
**Status**: Production Ready
