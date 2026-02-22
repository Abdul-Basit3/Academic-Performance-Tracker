/**
 * Represents a single course with its grade information
 */
export interface Course {
  id: string;           // Unique identifier for the course
  name: string;         // Course name/title
  credits: number;      // Credit hours for the course
  grade: string;        // Letter grade (A, B+, C, etc.)
  gradePoint: number;   // Numeric grade point value
}

/**
 * Represents a complete semester with all courses and calculated GPA
 */
export interface Semester {
  id: string;           // Unique identifier for the semester
  name: string;         // Semester name (e.g., "Fall 2024")
  courses: Course[];    // Array of courses taken in this semester
  gpa: number;          // Calculated GPA for this semester
  totalCredits: number; // Total credit hours for this semester
  date: string;         // ISO date string when semester was created
}

/**
 * Application settings for user preferences
 */
export interface AppSettings {
  gradingScale: number;        // Grading scale (4.0 or 5.0)
  theme: 'light' | 'dark';     // UI theme preference
}

/**
 * Grade scale mapping letter grades to numeric values
 */
export interface GradeScale {
  [key: string]: number;  // Maps grade letters to point values
}
