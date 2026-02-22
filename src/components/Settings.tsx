import { AppSettings } from '../types';
import '../styles/Settings.css';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
  onReset: () => void;
  onNavigate: (view: string) => void;
}

/**
 * Settings component - allows users to customize app preferences
 * Includes grading scale, theme selection, and data reset
 */
function Settings({ settings, onUpdate, onReset, onNavigate }: SettingsProps) {
  /**
   * Handles data reset with confirmation
   */
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      onReset();
      alert('All data has been reset successfully.');
      onNavigate('dashboard');
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Grading Scale</h3>
        <div className="setting-item">
          <label>
            <input
              type="radio"
              name="gradingScale"
              checked={settings.gradingScale === 4.0}
              onChange={() => onUpdate({ ...settings, gradingScale: 4.0 })}
            />
            4.0 Scale (Standard)
          </label>
          <label>
            <input
              type="radio"
              name="gradingScale"
              checked={settings.gradingScale === 5.0}
              onChange={() => onUpdate({ ...settings, gradingScale: 5.0 })}
            />
            5.0 Scale
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Theme</h3>
        <div className="setting-item">
          <label>
            <input
              type="radio"
              name="theme"
              checked={settings.theme === 'light'}
              onChange={() => onUpdate({ ...settings, theme: 'light' })}
            />
            ☀️ Light Mode
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              checked={settings.theme === 'dark'}
              onChange={() => onUpdate({ ...settings, theme: 'dark' })}
            />
            🌙 Dark Mode
          </label>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h3>Danger Zone</h3>
        <p>Reset all stored data including semesters and courses.</p>
        <button onClick={handleReset} className="reset-btn">Reset All Data</button>
      </div>
    </div>
  );
}

export default Settings;
