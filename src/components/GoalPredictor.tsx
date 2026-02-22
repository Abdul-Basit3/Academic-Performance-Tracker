import { useState } from 'react';
import { Semester } from '../types';
import { calculateCGPA, calculateRequiredGPA } from '../utils/calculations';
import '../styles/GoalPredictor.css';

interface GoalPredictorProps {
  semesters: Semester[];
  gradingScale: number;
}

/**
 * Goal Predictor component - calculates required GPA to achieve target CGPA
 * Helps students plan future academic performance
 */
function GoalPredictor({ semesters, gradingScale }: GoalPredictorProps) {
  // User input for target CGPA
  const [targetCGPA, setTargetCGPA] = useState<number>(0);
  
  // User input for remaining credits
  const [remainingCredits, setRemainingCredits] = useState<number>(0);
  
  // Calculation result
  const [result, setResult] = useState<any>(null);

  // Get current academic standing
  const currentCGPA = calculateCGPA(semesters);
  const currentCredits = semesters.reduce((sum, s) => sum + s.totalCredits, 0);

  /**
   * Calculates required GPA and determines difficulty level
   */
  const calculateGoal = () => {
    // Validate inputs
    if (targetCGPA <= 0 || remainingCredits <= 0) {
      alert('Please enter valid target CGPA and remaining credits');
      return;
    }

    // Calculate required GPA
    const requiredGPA = calculateRequiredGPA(currentCGPA, currentCredits, targetCGPA, remainingCredits);
    
    // Determine difficulty level based on required GPA
    let difficulty = 'Realistic';
    let color = '#27ae60';
    
    if (requiredGPA > gradingScale) {
      difficulty = 'Impossible';
      color = '#e74c3c';
    } else if (requiredGPA > gradingScale * 0.9) {
      difficulty = 'Very Difficult';
      color = '#e67e22';
    } else if (requiredGPA > gradingScale * 0.75) {
      difficulty = 'Challenging';
      color = '#f39c12';
    }

    // Set result state
    setResult({
      requiredGPA: requiredGPA.toFixed(2),
      difficulty,
      color,
      achievable: requiredGPA <= gradingScale
    });
  };

  return (
    <div className="goal-predictor">
      <h2>GPA Goal Predictor</h2>

      <div className="current-stats">
        <div className="stat-item">
          <label>Current CGPA:</label>
          <span className="stat-value">{currentCGPA.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <label>Current Credits:</label>
          <span className="stat-value">{currentCredits}</span>
        </div>
      </div>

      <div className="goal-inputs">
        <div className="input-group">
          <label>Target CGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max={gradingScale}
            value={targetCGPA || ''}
            onChange={(e) => setTargetCGPA(parseFloat(e.target.value) || 0)}
            placeholder={`Max: ${gradingScale}`}
          />
        </div>

        <div className="input-group">
          <label>Remaining Credits:</label>
          <input
            type="number"
            min="1"
            value={remainingCredits || ''}
            onChange={(e) => setRemainingCredits(parseInt(e.target.value) || 0)}
            placeholder="Credits left to complete"
          />
        </div>

        <button onClick={calculateGoal} className="calculate-btn">Calculate Required GPA</button>
      </div>

      {result && (
        <div className="result-card" style={{ borderColor: result.color }}>
          <h3>Prediction Results</h3>
          <div className="result-content">
            <div className="result-item">
              <label>Required GPA:</label>
              <span className="result-value" style={{ color: result.color }}>
                {result.requiredGPA}
              </span>
            </div>
            <div className="result-item">
              <label>Difficulty:</label>
              <span className="difficulty-badge" style={{ backgroundColor: result.color }}>
                {result.difficulty}
              </span>
            </div>
            {!result.achievable && (
              <p className="warning">
                ⚠️ This goal is not achievable with the remaining credits. Consider adjusting your target.
              </p>
            )}
            {result.achievable && result.difficulty === 'Realistic' && (
              <p className="success">
                ✓ This goal is achievable! Stay focused and maintain consistent performance.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoalPredictor;
