/**
 * Saves data to browser's localStorage
 * @param key - Storage key identifier
 * @param data - Data to be stored (will be JSON stringified)
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Loads data from browser's localStorage
 * @param key - Storage key identifier
 * @returns Parsed data or null if not found/error
 */
export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};
