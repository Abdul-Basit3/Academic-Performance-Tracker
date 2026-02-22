import { useState } from 'react';
import { Semester, Course } from '../types';
import { calculateCGPA, getAcademicClass, getGradeScale, calculateGPA } from '../utils/calculations';
import '../styles/CGPACalculator.css';

interface CGPACalculatorProps {
  semesters: Semester[];
  onUpdate: (id: string, semester: Semester) => void;
  onDelete: (id: string) => void;
  gradingScale: number;
}

/**
 * CGPA Calculator component - displays cumulative GPA and semester history
 * Allows users to view, expand, edit, and delete semesters
 */
function CGPACalculator({ semesters, onUpdate, onDelete, gradingScale }: CGPACalculatorProps) {
  // Track which semester is currently expanded
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  // Track which semester is being edited
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  // Track edited semester data
  const [editedData, setEditedData] = useState<Semester | null>(null);
  
  // Calculate cumulative GPA
  const cgpa = calculateCGPA(semesters);
  
  // Get academic class
  const academicClass = getAcademicClass(cgpa, gradingScale);

  /**
   * Toggles the expanded state of a semester
   */
  const toggleExpand = (id: string) => {
    setExpandedSemester(expandedSemester === id ? null : id);
  };

  /**
   * Handles semester deletion with confirmation
   */
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this semester?')) {
      onDelete(id);
    }
  };

  /**
   * Starts editing a semester
   */
  const startEdit = (semester: Semester) => {
    setEditingSemester(semester.id);
    setEditedData({ ...semester, courses: [...semester.courses] });
  };

  /**
   * Cancels editing
   */
  const cancelEdit = () => {
    setEditingSemester(null);
    setEditedData(null);
  };

  /**
   * Saves edited semester
   */
  const saveEdit = () => {
    if (!editedData) return;
    
    // Recalculate GPA and total credits
    const gradeScale = getGradeScale(gradingScale);
    const courses = editedData.courses.map(course => ({
      ...course,
      gradePoint: gradeScale[course.grade] || 0
    }));
    
    const gpa = calculateGPA(courses);
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    
    const updatedSemester: Semester = {
      ...editedData,
      courses,
      gpa,
      totalCredits
    };
    
    onUpdate(editedData.id, updatedSemester);
    setEditingSemester(null);
    setEditedData(null);
  };

  /**
   * Updates semester name
   */
  const updateSemesterName = (name: string) => {
    if (editedData) {
      setEditedData({ ...editedData, name });
    }
  };

  /**
   * Updates a course in the edited semester
   */
  const updateCourse = (courseId: string, field: keyof Course, value: string | number) => {
    if (!editedData) return;
    
    const updatedCourses = editedData.courses.map(course => {
      if (course.id === courseId) {
        return { ...course, [field]: value };
      }
      return course;
    });
    
    setEditedData({ ...editedData, courses: updatedCourses });
  };

  /**
   * Adds a new course to the edited semester
   */
  const addCourse = () => {
    if (!editedData) return;
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      grade: 'A',
      gradePoint: 0
    };
    
    setEditedData({
      ...editedData,
      courses: [...editedData.courses, newCourse]
    });
  };

  /**
   * Removes a course from the edited semester
   */
  const removeCourse = (courseId: string) => {
    if (!editedData) return;
    
    setEditedData({
      ...editedData,
      courses: editedData.courses.filter(c => c.id !== courseId)
    });
  };

  // Get available grades from grade scale
  const gradeScale = getGradeScale(gradingScale);
  const availableGrades = Object.keys(gradeScale);

  return (
    <div className="cgpa-calculator">
      <h2>CGPA Tracker</h2>

      <div className="cgpa-summary">
        <h3>Cumulative GPA: <span className="cgpa-value">{cgpa.toFixed(2)}</span></h3>
        <p>Academic Class: <span style={{ color: academicClass.color, fontWeight: 'bold' }}>{academicClass.class}</span></p>
        <p>Total Semesters: {semesters.length}</p>
        <p>Total Credits: {semesters.reduce((sum, s) => sum + s.totalCredits, 0)}</p>
      </div>

      <div className="semesters-list">
        <h3>Semester History</h3>
        {semesters.length === 0 ? (
          <p className="empty-message">No semesters recorded yet. Start by calculating your first semester GPA!</p>
        ) : (
          semesters.map((semester) => (
            <div key={semester.id} className="semester-card">
              <div className="semester-header" onClick={() => editingSemester !== semester.id && toggleExpand(semester.id)}>
                <div>
                  <h4>{semester.name}</h4>
                  <p>GPA: {semester.gpa.toFixed(2)} | Credits: {semester.totalCredits}</p>
                </div>
                <div className="semester-actions">
                  <button onClick={(e) => { e.stopPropagation(); startEdit(semester); }} className="edit-btn">
                    ✏️
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(semester.id); }} className="delete-btn">
                    🗑️
                  </button>
                  <span className="expand-icon">{expandedSemester === semester.id ? '▼' : '▶'}</span>
                </div>
              </div>

              {editingSemester === semester.id && editedData ? (
                <div className="semester-edit">
                  <div className="edit-header">
                    <label>
                      Semester Name:
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => updateSemesterName(e.target.value)}
                        className="semester-name-input"
                      />
                    </label>
                  </div>

                  <table className="edit-table">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedData.courses.map((course) => (
                        <tr key={course.id}>
                          <td>
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                              placeholder="Course name"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.5"
                            />
                          </td>
                          <td>
                            <select
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            >
                              {availableGrades.map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button onClick={() => removeCourse(course.id)} className="remove-course-btn">
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button onClick={addCourse} className="add-course-btn">
                    ➕ Add Course
                  </button>

                  <div className="edit-actions">
                    <button onClick={saveEdit} className="save-btn">
                      💾 Save Changes
                    </button>
                    <button onClick={cancelEdit} className="cancel-btn">
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : expandedSemester === semester.id && (
                <div className="semester-details">
                  <table>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course) => (
                        <tr key={course.id}>
                          <td>{course.name}</td>
                          <td>{course.credits}</td>
                          <td>{course.grade}</td>
                          <td>{course.gradePoint.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CGPACalculator;
