# GPA & CGPA Calculator - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technical Stack](#technical-stack)
5. [Project Structure](#project-structure)
6. [Core Components](#core-components)
7. [Utilities](#utilities)
8. [Data Models](#data-models)
9. [Calculations](#calculations)
10. [Storage](#storage)
11. [Styling](#styling)
12. [Development Guide](#development-guide)
13. [Build & Deployment](#build--deployment)

---

## Project Overview

The GPA & CGPA Calculator is a modern, responsive web application designed to help students track and analyze their academic performance. Built with React, TypeScript, and Vite, it provides a comprehensive suite of tools for GPA calculation, semester management, performance analytics, and goal planning.

### Key Capabilities
- Real-time GPA and CGPA calculations
- Multi-semester tracking and management
- Visual analytics with performance trends
- Goal prediction for target CGPA achievement
- Customizable grading scales (4.0 and 5.0)
- Dark/Light theme support
- Offline-first with localStorage persistence
- Fully responsive design for all devices

---

## Architecture

### Application Flow
```
User Interface (React Components)
    ↓
State Management (React Hooks)
    ↓
Business Logic (Utility Functions)
    ↓
Data Persistence (LocalStorage API)
```

### Component Hierarchy
```
App (Root)
├── Dashboard
├── GPACalculator
├── CGPACalculator
├── Analytics
├── GoalPredictor
└── Settings
```

---

## Features

### 1. Dashboard
- **Overview Display**: Shows current CGPA, latest semester GPA, total credits, and academic class
- **Quick Actions**: Fast navigation to key features
- **Performance Status**: Color-coded academic classification
- **Real-time Updates**: Automatically reflects changes from other views

### 2. GPA Calculator
- **Course Management**: Add/remove courses with name, credits, and grades
- **Dynamic Calculation**: Real-time GPA computation as courses are added
- **Grade Selection**: Dropdown with all available letter grades
- **Semester Saving**: Save calculated semester to CGPA tracker
- **Validation**: Ensures all required fields are filled

### 3. CGPA Tracker
- **Semester List**: View all saved semesters with details
- **Expandable Details**: Click to view course breakdown for each semester
- **Edit Capability**: Modify existing semester data including name, courses, credits, and grades
- **Delete Function**: Remove semesters with confirmation
- **Cumulative Display**: Shows overall CGPA across all semesters
- **Summary Statistics**: Total semesters, total credits, and academic class
- **Real-time Recalculation**: GPA automatically recalculates when editing

### 4. Analytics
- **GPA Progression Chart**: Visual representation of GPA trends
- **Performance Insights**: Statistical analysis of academic performance
- **Semester Comparison**: Compare performance across different terms
- **Credit Distribution**: View credit hours per semester

### 5. Goal Predictor
- **Target Setting**: Input desired CGPA goal
- **Required GPA Calculation**: Computes needed GPA for remaining credits
- **Feasibility Check**: Validates if goal is achievable
- **Planning Tool**: Helps students plan future academic performance

### 6. Settings
- **Grading Scale**: Switch between 4.0 and 5.0 scales
- **Theme Toggle**: Light and dark mode support
- **Data Management**: Reset all data option
- **Preferences Persistence**: Settings saved to localStorage

---

## Technical Stack

### Frontend Framework
- **React 18.2.0**: Component-based UI library
- **TypeScript 5.3.0**: Type-safe JavaScript superset
- **Vite 5.0.0**: Fast build tool and dev server

### Development Tools
- **@vitejs/plugin-react**: React integration for Vite
- **@types/react**: TypeScript definitions for React
- **@types/react-dom**: TypeScript definitions for React DOM

### Browser APIs
- **LocalStorage**: Client-side data persistence
- **CSS3**: Modern styling with custom properties

---

## Project Structure

```
gpa-calculator/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx
│   │   ├── GPACalculator.tsx
│   │   ├── CGPACalculator.tsx
│   │   ├── Analytics.tsx
│   │   ├── GoalPredictor.tsx
│   │   └── Settings.tsx
│   ├── styles/              # CSS stylesheets
│   │   ├── App.css
│   │   ├── Dashboard.css
│   │   ├── GPACalculator.css
│   │   ├── CGPACalculator.css
│   │   ├── Analytics.css
│   │   ├── GoalPredictor.css
│   │   ├── Settings.css
│   │   └── global.css
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts
│   │   └── storage.ts
│   ├── App.tsx              # Root component
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project readme

```

---

## Core Components

### App.tsx
**Purpose**: Root component managing application state and routing

**State Management**:
- `activeView`: Current active view/page
- `semesters`: Array of all semester data
- `settings`: Application settings (theme, grading scale)

**Key Functions**:
- `addSemester()`: Adds new semester to state
- `updateSemester()`: Updates existing semester
- `deleteSemester()`: Removes semester from state

**Effects**:
- Loads data from localStorage on mount
- Saves semesters when they change
- Saves settings and applies theme when settings change

### Dashboard.tsx
**Purpose**: Overview of academic performance

**Props**:
- `semesters`: Array of semester data
- `onNavigate`: Navigation callback function
- `gradingScale`: Current grading scale (4.0 or 5.0)

**Displays**:
- Current CGPA
- Latest semester GPA
- Total credits earned
- Academic classification
- Quick action buttons

### GPACalculator.tsx
**Purpose**: Calculate GPA for a single semester

**Props**:
- `onSave`: Callback to save semester
- `gradingScale`: Current grading scale

**Features**:
- Add/remove courses dynamically
- Real-time GPA calculation
- Grade dropdown selection
- Semester naming
- Validation before saving

### CGPACalculator.tsx
**Purpose**: View and manage all semesters

**Props**:
- `semesters`: Array of all semesters
- `onUpdate`: Callback to update semester
- `onDelete`: Callback to delete semester
- `gradingScale`: Current grading scale

**State**:
- `expandedSemester`: Tracks which semester is expanded
- `editingSemester`: Tracks which semester is being edited
- `editedData`: Holds temporary edited semester data

**Features**:
- List all semesters with GPA and credits
- Expand/collapse semester details
- Edit semester name and courses inline
- Add/remove courses while editing
- Real-time GPA recalculation on save
- Delete semesters with confirmation
- Display cumulative CGPA and academic class
- Show course breakdown for each semester

**Edit Functions**:
- `startEdit()`: Initiates edit mode for a semester
- `cancelEdit()`: Cancels editing and discards changes
- `saveEdit()`: Saves changes and recalculates GPA
- `updateSemesterName()`: Updates semester name
- `updateCourse()`: Updates individual course fields
- `addCourse()`: Adds new course to semester
- `removeCourse()`: Removes course from semester

### Analytics.tsx
**Purpose**: Visualize academic performance trends

**Props**:
- `semesters`: Array of semester data

**Features**:
- GPA progression chart
- Performance statistics
- Trend analysis
- Semester comparisons

### GoalPredictor.tsx
**Purpose**: Calculate required GPA for target CGPA

**Props**:
- `semesters`: Array of semester data
- `gradingScale`: Current grading scale

**Features**:
- Target CGPA input
- Remaining credits input
- Required GPA calculation
- Feasibility validation

### Settings.tsx
**Purpose**: Manage application preferences

**Props**:
- `settings`: Current settings object
- `onUpdate`: Callback to update settings
- `onReset`: Callback to reset all data

**Features**:
- Grading scale toggle (4.0/5.0)
- Theme toggle (light/dark)
- Data reset with confirmation

---

## Utilities

### calculations.ts
**Purpose**: Core calculation logic for GPA/CGPA

#### Functions:

**`getGradeScale(maxScale: number)`**
- Returns grade mapping for specified scale
- 4.0 scale: A+ and A both = 4.0
- 5.0 scale: A+ = 5.0, A = 4.5

**`calculateGPA(courses: Course[])`**
- Formula: Σ(grade points × credits) / Σ(credits)
- Returns weighted average GPA for courses

**`calculateCGPA(semesters: Semester[])`**
- Formula: Σ(semester GPA × semester credits) / Σ(all credits)
- Returns cumulative GPA across all semesters

**`calculateRequiredGPA(currentCGPA, currentCredits, targetCGPA, remainingCredits)`**
- Calculates GPA needed in remaining credits to achieve target
- Formula: (target × total credits - current points) / remaining credits

**`getAcademicClass(cgpa: number, gradingScale: number)`**
- Returns academic classification based on CGPA
- Different thresholds for 4.0 and 5.0 scales
- Returns class name and color code

#### Grade Scales:

**4.0 Scale**:
- A+/A: 4.0
- B+: 3.5
- B: 3.0
- C+: 2.5
- C: 2.0
- D+: 1.5
- D: 1.0
- F: 0.0

**5.0 Scale**:
- A+: 5.0
- A: 4.5
- B+: 4.0
- B: 3.5
- C+: 3.0
- C: 2.5
- D+: 2.0
- D: 1.5
- F: 0.0

### storage.ts
**Purpose**: LocalStorage abstraction layer

#### Functions:

**`saveToStorage<T>(key: string, data: T)`**
- Saves data to localStorage with JSON serialization
- Error handling for storage failures
- Generic type support

**`loadFromStorage<T>(key: string)`**
- Loads and parses data from localStorage
- Returns null if not found or error occurs
- Generic type support

---

## Data Models

### Course Interface
```typescript
interface Course {
  id: string;           // Unique identifier (UUID)
  name: string;         // Course name/title
  credits: number;      // Credit hours (typically 1-4)
  grade: string;        // Letter grade (A, B+, C, etc.)
  gradePoint: number;   // Numeric grade value
}
```

### Semester Interface
```typescript
interface Semester {
  id: string;           // Unique identifier (UUID)
  name: string;         // Semester name (e.g., "Fall 2024")
  courses: Course[];    // Array of courses
  gpa: number;          // Calculated semester GPA
  totalCredits: number; // Total credit hours
  date: string;         // ISO date string
}
```

### AppSettings Interface
```typescript
interface AppSettings {
  gradingScale: number;        // 4.0 or 5.0
  theme: 'light' | 'dark';     // UI theme
}
```

### GradeScale Interface
```typescript
interface GradeScale {
  [key: string]: number;  // Maps grade letters to points
}
```

---

## Calculations

### GPA Calculation
**Formula**: `GPA = Σ(Grade Points × Credits) / Σ(Credits)`

**Example**:
```
Course 1: A (4.0) × 3 credits = 12.0
Course 2: B+ (3.5) × 4 credits = 14.0
Course 3: A (4.0) × 3 credits = 12.0
Total: 38.0 / 10 credits = 3.8 GPA
```

### CGPA Calculation
**Formula**: `CGPA = Σ(Semester GPA × Semester Credits) / Σ(All Credits)`

**Example**:
```
Semester 1: 3.8 GPA × 15 credits = 57.0
Semester 2: 3.6 GPA × 16 credits = 57.6
Semester 3: 3.9 GPA × 15 credits = 58.5
Total: 173.1 / 46 credits = 3.76 CGPA
```

### Required GPA Calculation
**Formula**: `Required GPA = (Target CGPA × Total Credits - Current Points) / Remaining Credits`

**Example**:
```
Current CGPA: 3.5
Current Credits: 60
Target CGPA: 3.7
Remaining Credits: 30
Total Credits Needed: 90

Required GPA = (3.7 × 90 - 3.5 × 60) / 30
             = (333 - 210) / 30
             = 123 / 30
             = 4.1
```

---

## Storage

### LocalStorage Keys
- `semesters`: Array of all semester data
- `settings`: Application settings object

### Data Persistence Flow
1. User makes changes in UI
2. State updates in React component
3. useEffect hook detects state change
4. Data serialized to JSON
5. Saved to localStorage
6. On app reload, data loaded from localStorage

### Storage Limits
- LocalStorage typically allows 5-10MB per domain
- JSON serialization used for complex objects
- Error handling prevents data loss

---

## Styling

### CSS Architecture
- Component-specific stylesheets
- Global styles in `global.css`
- CSS custom properties for theming
- Mobile-first responsive design

### Theme System
**Light Theme**:
- Background: #f5f5f5
- Text: #333333
- Primary: #3498db
- Accent: #2ecc71

**Dark Theme**:
- Background: #1a1a1a
- Text: #e0e0e0
- Primary: #2980b9
- Accent: #27ae60

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1199px
- Desktop: ≥ 1200px

---

## Development Guide

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Code editor (VS Code recommended)

### Setup
```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173
```

### Development Workflow
1. Make changes to source files
2. Vite hot-reloads changes automatically
3. Test in browser
4. Commit changes with descriptive messages

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components focused and reusable
- Add comments for complex logic

### Testing Locally
- Test all features in both themes
- Verify responsive design on different screen sizes
- Test localStorage persistence
- Validate calculations with known values

---

## Build & Deployment

### Production Build
```bash
# Build for production
npm run build

# Output in dist/ directory
# Includes optimized and minified files
```

### Build Output
- `dist/index.html`: Entry HTML file
- `dist/assets/`: Bundled JS and CSS files
- All files optimized and minified

### Deployment Options
1. **Static Hosting**: Deploy dist/ folder to any static host
2. **Netlify**: Drag and drop dist/ folder
3. **Vercel**: Connect repository for automatic deployments
4. **GitHub Pages**: Use gh-pages branch
5. **Custom Server**: Serve dist/ folder with any web server

### Preview Build
```bash
# Preview production build locally
npm run preview

# Access at http://localhost:4173
```

### Environment Variables
- No environment variables required
- All data stored client-side
- No backend or API dependencies

---

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- ES6+ JavaScript support
- LocalStorage API
- CSS Grid and Flexbox
- CSS Custom Properties

---

## Future Enhancements

### Potential Features
- Export data to PDF/CSV
- Import data from files
- Cloud sync across devices
- Grade distribution charts
- Course recommendations
- GPA comparison with peers
- Academic calendar integration
- Mobile app version

---

## License

MIT License - Free to use, modify, and distribute

---

## Support

For issues, questions, or contributions, please refer to the project repository.

---

**Last Updated**: February 2026
**Version**: 1.0.0
