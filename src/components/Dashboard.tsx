import { Semester } from '../types';
import { calculateCGPA, getAcademicClass } from '../utils/calculations';
import '../styles/Dashboard.css';

interface DashboardProps {
  semesters: Semester[];
  onNavigate: (view: string) => void;
  gradingScale: number;
}

/**
 * Dashboard component - displays academic performance overview
 * Shows CGPA, latest GPA, total credits, and quick action buttons
 */
function Dashboard({ semesters, onNavigate, gradingScale }: DashboardProps) {
  // Calculate cumulative GPA from all semesters
  const cgpa = calculateCGPA(semesters);
  
  // Calculate total credits earned
  const totalCredits = semesters.reduce((sum, sem) => sum + sem.totalCredits, 0);
  
  // Get the most recent semester data
  const latestSemester = semesters[semesters.length - 1];
  const latestGPA = latestSemester?.gpa || 0;

  // Get academic class based on CGPA
  const academicClass = getAcademicClass(cgpa, gradingScale);

  return (
    <div className="dashboard">
      <h2>Academic Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Current CGPA</h3>
            <p className="stat-value">{cgpa.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Latest Semester GPA</h3>
            <p className="stat-value">{latestGPA.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Total Credits</h3>
            <p className="stat-value">{totalCredits}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Academic Class</h3>
            <p className="stat-value" style={{ color: academicClass.color }}>{academicClass.class}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => onNavigate('gpa')} className="action-btn">
            ➕ Calculate GPA
          </button>
          <button onClick={() => onNavigate('cgpa')} className="action-btn">
            📚 View Semesters
          </button>
          <button onClick={() => onNavigate('analytics')} className="action-btn">
            📊 View Analytics
          </button>
          <button onClick={() => onNavigate('goals')} className="action-btn">
            🎯 Set Goals
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
