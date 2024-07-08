import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactTyped } from 'react-typed';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import CleanCodeButton from './components/CleanCodeButton';
import CodeTextArea from './components/CodeTextArea';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [cleanedCode, setCleanedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleCleanCode = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/clean', { code: inputCode });
      setCleanedCode(response.data.cleanCode);
    } catch (e) {
      setError('Error cleaning code. Please try again.')
      console.error('Error cleaning code :', e);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputCode('');
    setCleanedCode('');
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setInputCode(event.target.result);
        }
        reader.readAsText(file);
    }
  }

  useEffect(() => {
    const typedElement = document.querySelector('.typed-cursor');
    if (typedElement && typingComplete) {
      typedElement.style.display = 'none';
    }
  }, [typingComplete]);

  return (
    <div className="min-h-screen text-center bg-gradient-to-b from-green-400 to-[#44BBA4] dark:from-gray-700 dark:to-gray-600 flex flex-col font-mono">
      <header className="bg-blue-700 dark:bg-[#FF9900] py-3 shadow-md flex items-center justify-between px-6">
        <ReactTyped
          strings={['Python Code Cleaner 🤖']}
          typeSpeed={80}
          onComplete={() => setTypingComplete(true)}
          className='text-white text-3xl font-extrabold mx-auto'
        />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='text-white text-[19px] dark:text-gray-200 px-2 py-1 rounded'
        >
          {darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </button>
      </header>
      <main className='flex-1 flex flex-col items-center'>
        <div className='w-full max-w-[1225px] flex-1 px-7 py-6 bg-white dark:bg-[#2C2E31] rounded-t-lg shadow-xl mt-6'>
          <div className="flex flex-1 space-x-4">
            <CodeTextArea
              value={inputCode}
              onChange={handleInputChange}
              placeholder="Paste your Python code or upload a file here"
              readOnly={false}
              onClear={handleClear}
              onFileUpload={handleFileUpload}
            />
            <CodeTextArea
              value={cleanedCode}
              placeholder="Cleaned code will appear here"
              readOnly={true}
            />
          </div>
          {error && <div className='text-red-500 mt-2'>{error}</div>}
          <CleanCodeButton onClick={handleCleanCode} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;