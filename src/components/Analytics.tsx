import { Semester } from '../types';
import '../styles/Analytics.css';

interface AnalyticsProps {
  semesters: Semester[];
}

/**
 * Analytics component - visualizes academic performance over time
 * Shows GPA trends, charts, and semester comparisons
 */
function Analytics({ semesters }: AnalyticsProps) {
  // Show empty state if no data
  if (semesters.length === 0) {
    return (
      <div className="analytics">
        <h2>Academic Analytics</h2>
        <p className="empty-message">No data available. Add semesters to see analytics.</p>
      </div>
    );
  }

  // Extract all GPA values
  const gpas = semesters.map(s => s.gpa);
  
  // Calculate statistics
  const highestGPA = Math.max(...gpas);
  const lowestGPA = Math.min(...gpas);
  const averageGPA = gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length;

  /**
   * Determines performance trend based on recent semesters
   * Compares last 3 semesters to identify improvement/decline
   */
  const getTrend = () => {
    if (semesters.length < 2) return 'stable';
    const recent = semesters.slice(-3);
    const trend = recent[recent.length - 1].gpa - recent[0].gpa;
    if (trend > 0.1) return 'improving';
    if (trend < -0.1) return 'declining';
    return 'stable';
  };

  const trend = getTrend();
  const maxGPA = 4.0; // For chart scaling

  return (
    <div className="analytics">
      <h2>Academic Analytics</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Performance Summary</h3>
          <div className="stat-row">
            <span>Highest GPA:</span>
            <span className="highlight">{highestGPA.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span>Lowest GPA:</span>
            <span className="highlight">{lowestGPA.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span>Average GPA:</span>
            <span className="highlight">{averageGPA.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span>Trend:</span>
            <span className={`trend ${trend}`}>
              {trend === 'improving' && '📈 Improving'}
              {trend === 'declining' && '📉 Declining'}
              {trend === 'stable' && '➡️ Stable'}
            </span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>GPA Progression</h3>
          <div className="chart">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="chart-bar-container">
                <div 
                  className="chart-bar" 
                  style={{ height: `${(semester.gpa / maxGPA) * 100}%` }}
                  title={`${semester.name}: ${semester.gpa.toFixed(2)}`}
                >
                  <span className="bar-label">{semester.gpa.toFixed(1)}</span>
                </div>
                <span className="bar-name">S{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="semester-comparison">
        <h3>Semester Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Semester</th>
              <th>GPA</th>
              <th>Credits</th>
              <th>Courses</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester, index) => {
              const change = index > 0 ? semester.gpa - semesters[index - 1].gpa : 0;
              return (
                <tr key={semester.id}>
                  <td>{semester.name}</td>
                  <td>{semester.gpa.toFixed(2)}</td>
                  <td>{semester.totalCredits}</td>
                  <td>{semester.courses.length}</td>
                  <td className={change > 0 ? 'positive' : change < 0 ? 'negative' : ''}>
                    {index > 0 ? (change > 0 ? '+' : '') + change.toFixed(2) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
