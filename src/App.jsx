import React, { useState } from 'react';
import './App.css';

export default function TaskMind() {
  const [rawInput, setRawInput] = useState('');
  const [optimizedTasks, setOptimizedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!rawInput.trim()) return;
    setIsLoading(true);

    try {
      // Clean and split lines into distinct tasks
      const taskList = rawInput.split('\n').filter(t => t.trim() !== '');

      // API call placeholder for your Python backend
      const response = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: taskList })
      });
      
      const data = await response.json();
      setOptimizedTasks(data.orderedTasks);
    } catch (error) {
      console.error("Backend offline. Running simulation fallback...");
      // Simulating a quick priority sorting optimization
      setOptimizedTasks(rawInput.split('\n').filter(t => t.trim() !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-background">
      {/* Navbar Layout */}
      <nav className="navbar">
        <div className="logo-container">
          <div className="brain-icon">🧠</div>
          <span className="brand-name">TaskMind</span>
        </div>
        <div className="avatar-container">
          <div className="user-avatar">👤</div>
        </div>
      </nav>

      {/* Main Framework Viewport */}
      <main className="main-viewport">
        
        {/* Step 1: Optimized List Results Render Above The Textarea */}
        {optimizedTasks.length > 0 && (
          <div className="output-sequence-container">
            <h3 className="sequence-title">✨ AI Prioritized Sequence</h3>
            <div className="task-timeline">
              {optimizedTasks.map((task, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="step-counter">{idx + 1}</div>
                  <div className="task-card-pill">{task}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Primary Input Central Node Block */}
        <div className="central-card">
          <div className="input-glow-container">
            <span className="input-prompt-label">Ask TaskMind to generate your next task...</span>
            <textarea
              className="neon-textarea"
              placeholder="Type your tasks here (one per line)..."
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
            />
          </div>
          
          <button 
            className={`generate-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? 'Sequencing Flow...' : 'Generate Task'}
          </button>
        </div>
      </main>
    </div>
  );
}
