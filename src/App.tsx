import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import GPACalculator from './components/GPACalculator';
import CGPACalculator from './components/CGPACalculator';
import Analytics from './components/Analytics';
import GoalPredictor from './components/GoalPredictor';
import Settings from './components/Settings';
import { Semester, AppSettings } from './types';
import { loadFromStorage, saveToStorage } from './utils/storage';
import './styles/App.css';

/**
 * Main App component - manages application state and routing
 */
function App() {
  // Active view state for navigation
  const [activeView, setActiveView] = useState<string>('dashboard');
  
  // Semesters data - stores all academic records
  const [semesters, setSemesters] = useState<Semester[]>([]);
  
  // Application settings - theme and grading scale
  const [settings, setSettings] = useState<AppSettings>({
    gradingScale: 4.0,
    theme: 'light',
  });

  // Load saved data from localStorage on initial mount
  useEffect(() => {
    const savedSemesters = loadFromStorage<Semester[]>('semesters') || [];
    const savedSettings = loadFromStorage<AppSettings>('settings') || settings;
    setSemesters(savedSemesters);
    setSettings(savedSettings);
    document.body.className = savedSettings.theme;
  }, []);

  // Save semesters to localStorage whenever they change
  useEffect(() => {
    saveToStorage('semesters', semesters);
  }, [semesters]);

  // Save settings to localStorage and apply theme whenever settings change
  useEffect(() => {
    saveToStorage('settings', settings);
    document.body.className = settings.theme;
  }, [settings]);

  /**
   * Adds a new semester to the list
   */
  const addSemester = (semester: Semester) => {
    setSemesters([...semesters, semester]);
  };

  /**
   * Updates an existing semester
   */
  const updateSemester = (id: string, updated: Semester) => {
    setSemesters(semesters.map(s => s.id === id ? updated : s));
  };

  /**
   * Deletes a semester by ID
   */
  const deleteSemester = (id: string) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Academic Performance Tracker</h1>
        <nav className="nav-menu">
          <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => setActiveView('gpa')} className={activeView === 'gpa' ? 'active' : ''}>GPA Calculator</button>
          <button onClick={() => setActiveView('cgpa')} className={activeView === 'cgpa' ? 'active' : ''}>CGPA Tracker</button>
          <button onClick={() => setActiveView('analytics')} className={activeView === 'analytics' ? 'active' : ''}>Analytics</button>
          <button onClick={() => setActiveView('goals')} className={activeView === 'goals' ? 'active' : ''}>Goal Predictor</button>
          <button onClick={() => setActiveView('settings')} className={activeView === 'settings' ? 'active' : ''}>Settings</button>
        </nav>
      </header>

      <main className="app-main">
        {activeView === 'dashboard' && <Dashboard semesters={semesters} onNavigate={setActiveView} gradingScale={settings.gradingScale} />}
        {activeView === 'gpa' && <GPACalculator onSave={addSemester} gradingScale={settings.gradingScale} />}
        {activeView === 'cgpa' && <CGPACalculator semesters={semesters} onUpdate={updateSemester} onDelete={deleteSemester} gradingScale={settings.gradingScale} />}
        {activeView === 'analytics' && <Analytics semesters={semesters} />}
        {activeView === 'goals' && <GoalPredictor semesters={semesters} gradingScale={settings.gradingScale} />}
        {activeView === 'settings' && <Settings settings={settings} onUpdate={setSettings} onReset={() => setSemesters([])} />}
      </main>
    </div>
  );
}

export default App;
