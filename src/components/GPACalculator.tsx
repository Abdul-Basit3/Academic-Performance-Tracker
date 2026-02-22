import { useState } from 'react';
import { Course, Semester } from '../types';
import { getGradeScale, calculateGPA } from '../utils/calculations';
import '../styles/GPACalculator.css';

interface GPACalculatorProps {
  onSave: (semester: Semester) => void;
  gradingScale: number;
}

/**
 * GPA Calculator component - allows users to calculate semester GPA
 * Users can add multiple courses with credits and grades
 */
function GPACalculator({ onSave, gradingScale }: GPACalculatorProps) {
  // Semester name input
  const [semesterName, setSemesterName] = useState('');
  
  // List of courses for the semester
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: 0, grade: '', gradePoint: 0 }
  ]);
  
  // Success message visibility
  const [showSuccess, setShowSuccess] = useState(false);

  // Get the appropriate grade scale
  const gradeScale = getGradeScale(gradingScale);
  
  // Calculate GPA in real-time (only for valid courses)
  const gpa = calculateGPA(courses.filter(c => c.credits > 0 && c.grade));

  /**
   * Adds a new empty course row
   */
  const addCourse = () => {
    setCourses([...courses, { 
      id: Date.now().toString(), 
      name: '', 
      credits: 0, 
      grade: '', 
      gradePoint: 0 
    }]);
  };

  /**
   * Removes a course by ID (minimum 1 course required)
   */
  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  /**
   * Updates a specific field of a course
   * Automatically updates grade point when grade changes
   */
  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        const updated = { ...course, [field]: value };
        // Auto-update grade point when grade is selected
        if (field === 'grade') {
          updated.gradePoint = gradeScale[value] || 0;
        }
        return updated;
      }
      return course;
    }));
  };

  /**
   * Validates and saves the semester
   */
  const handleSave = () => {
    // Validate semester name
    if (!semesterName.trim()) {
      alert('Please enter a semester name');
      return;
    }

    // Filter out incomplete courses
    const validCourses = courses.filter(c => c.name && c.credits > 0 && c.grade);
    if (validCourses.length === 0) {
      alert('Please add at least one valid course');
      return;
    }

    // Create semester object
    const semester: Semester = {
      id: Date.now().toString(),
      name: semesterName,
      courses: validCourses,
      gpa: calculateGPA(validCourses),
      totalCredits: validCourses.reduce((sum, c) => sum + c.credits, 0),
      date: new Date().toISOString()
    };

    // Save and reset form
    onSave(semester);
    setSemesterName('');
    setCourses([{ id: '1', name: '', credits: 0, grade: '', gradePoint: 0 }]);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="gpa-calculator">
      <h2>GPA Calculator</h2>
      
      {showSuccess && <div className="success-message">✓ Semester saved successfully!</div>}

      <div className="semester-input">
        <label>Semester Name:</label>
        <input
          type="text"
          placeholder="e.g., Fall 2024"
          value={semesterName}
          onChange={(e) => setSemesterName(e.target.value)}
        />
      </div>

      <div className="courses-section">
        <h3>Courses</h3>
        {courses.map((course, index) => (
          <div key={course.id} className="course-row">
            <span className="course-number">{index + 1}</span>
            <input
              type="text"
              placeholder="Course Code"
              value={course.name}
              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Credits"
              min="0"
              max="10"
              value={course.credits || ''}
              onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
            />
            <select
              value={course.grade}
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
            >
              <option value="">Select Grade</option>
              {Object.keys(gradeScale).map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <span className="grade-point">{course.gradePoint.toFixed(1)}</span>
            <button onClick={() => removeCourse(course.id)} className="remove-btn">✕</button>
          </div>
        ))}
        <button onClick={addCourse} className="add-course-btn">+ Add Course</button>
      </div>

      <div className="gpa-result">
        <h3>Calculated GPA: <span className="gpa-value">{gpa.toFixed(2)}</span></h3>
        <p>Total Credits: {courses.reduce((sum, c) => sum + c.credits, 0)}</p>
      </div>

      <button onClick={handleSave} className="save-btn">Save Semester</button>
    </div>
  );
}

export default GPACalculator;
