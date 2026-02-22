import { Course, Semester } from '../types';

/**
 * Returns the appropriate grade scale based on the maximum scale value
 * @param maxScale - Maximum GPA scale (4.0 or 5.0)
 * @returns Object mapping letter grades to numeric values
 */
export const getGradeScale = (maxScale: number): { [key: string]: number } => {
  // 5.0 scale - 0.5 interval difference
  if (maxScale === 5.0) {
    return {
      'A+': 5.0,
      'A': 4.5,
      'B+': 4.0,
      'B': 3.5,
      'C+': 3.0,
      'C': 2.5,
      'D+': 2.0,
      'D': 1.5,
      'F': 0.0
    };
  }
  // 4.0 scale - 0.5 interval difference starting from A=4.0
  return {
    'A+': 4.0,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0
  };
};

/**
 * Calculates GPA for a single semester based on courses
 * Formula: Sum(grade points × credits) / Sum(credits)
 * @param courses - Array of courses with grades and credits
 * @returns Calculated GPA value
 */
export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;
  
  // Calculate total quality points (grade points × credits)
  const totalPoints = courses.reduce((sum, course) => 
    sum + (course.gradePoint * course.credits), 0);
  
  // Calculate total credit hours
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  
  // Return weighted average
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

/**
 * Calculates cumulative GPA across all semesters
 * Formula: Sum(semester GPA × semester credits) / Sum(all credits)
 * @param semesters - Array of completed semesters
 * @returns Cumulative GPA value
 */
export const calculateCGPA = (semesters: Semester[]): number => {
  if (semesters.length === 0) return 0;
  
  // Calculate total quality points across all semesters
  const totalPoints = semesters.reduce((sum, sem) => 
    sum + (sem.gpa * sem.totalCredits), 0);
  
  // Calculate total credits across all semesters
  const totalCredits = semesters.reduce((sum, sem) => sum + sem.totalCredits, 0);
  
  // Return weighted cumulative average
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

/**
 * Calculates the required GPA needed to achieve a target CGPA
 * @param currentCGPA - Current cumulative GPA
 * @param currentCredits - Total credits completed so far
 * @param targetCGPA - Desired target CGPA
 * @param remainingCredits - Credits remaining to complete
 * @returns Required GPA for remaining credits
 */
export const calculateRequiredGPA = (
  currentCGPA: number,
  currentCredits: number,
  targetCGPA: number,
  remainingCredits: number
): number => {
  if (remainingCredits <= 0) return 0;
  
  // Calculate total credits after completion
  const totalCreditsNeeded = currentCredits + remainingCredits;
  
  // Calculate total quality points needed for target CGPA
  const totalPointsNeeded = targetCGPA * totalCreditsNeeded;
  
  // Calculate current quality points
  const currentPoints = currentCGPA * currentCredits;
  
  // Calculate additional points needed
  const requiredPoints = totalPointsNeeded - currentPoints;
  
  // Return required GPA for remaining credits
  return requiredPoints / remainingCredits;
};

/**
 * Determines academic class based on CGPA and grading scale
 * @param cgpa - Cumulative GPA value
 * @param gradingScale - Maximum GPA scale (4.0 or 5.0)
 * @returns Object with class name and color
 */
export const getAcademicClass = (cgpa: number, gradingScale: number): { class: string; color: string } => {
  if (gradingScale === 5.0) {
    // 5.0 scale classification
    if (cgpa >= 4.5) return { class: 'First Class', color: '#27ae60' };
    if (cgpa >= 3.5) return { class: 'Second Class (Upper)', color: '#2ecc71' };
    if (cgpa >= 2.5) return { class: 'Second Class (Lower)', color: '#3498db' };
    if (cgpa >= 2.0) return { class: 'Third Class', color: '#f39c12' };
    if (cgpa >= 1.5) return { class: 'Pass', color: '#e67e22' };
    return { class: 'Fail', color: '#e74c3c' };
  } else {
    // 4.0 scale classification
    if (cgpa >= 3.6) return { class: 'First Class', color: '#27ae60' };
    if (cgpa >= 3.0) return { class: 'Second Class (Upper)', color: '#2ecc71' };
    if (cgpa >= 2.0) return { class: 'Second Class (Lower)', color: '#3498db' };
    if (cgpa >= 1.5) return { class: 'Third Class', color: '#f39c12' };
    if (cgpa >= 1.0) return { class: 'Pass', color: '#e67e22' };
    return { class: 'Fail', color: '#e74c3c' };
  }
};
