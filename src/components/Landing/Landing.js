import React, { useState, useEffect } from 'react';
import questions from '../../data/questions';
import './Landing.css';

const Landing = ({ onStart }) => {
	const [darkMode, setDarkMode] = useState(true);
	const [quizMode, setQuizMode] = useState('standard');

	useEffect(() => {
		document.documentElement.classList.toggle('dark-theme', darkMode);
	}, [darkMode]);

	return (
		<div className='landing-container'>
			<h2>React Quiz Template</h2>
			<h3 id='total-label'>Total Questions: </h3>
			<h3 id='total-questions'>{questions.length}</h3>
			<p className='description'>
				Welcome to this React Exam Simulator!
				<br />
				This quiz simulates the structure and experience of a real-world multiple-choice exam.
				<br /><br />
				You can choose between two modes:
				<br />
				<strong>Standard Mode</strong> shows all answer options at once, as in a typical exam.
				<br />
				<strong>Blind Mode</strong> reveals one answer option at a time, helping you focus without bias or distraction.
				<br /><br />
				You can answer each question or skip it using the "Next" button.
				<br />
				The quiz will automatically submit once all questions are completed.
				<br />
				Alternatively, you can click "Submit" at any time to finish early and review your progress.
			</p>
			<div className="theme-toggle-container">
				<div className='theme-toggle'>
					<p className="theme-mode-text">
						{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
					</p>
					<label className="theme-switch">
						<input
							type="checkbox"
							checked={darkMode}
							onChange={() => setDarkMode(!darkMode)}
						/>
						<span className="slider" />
					</label>
				</div>
			</div>
			<div className="quiz-mode-toggle-container">
				<div className='quiz-mode-toggle'>
					<div className="quiz-mode-labels">
						<p className="quiz-mode-text">
							Blind Mode
						</p>
					</div>
					<label className="quiz-mode-switch">
						<input
							type="checkbox"
							checked={quizMode === 'blind'}
							onChange={() => setQuizMode(quizMode === 'standard' ? 'blind' : 'standard')}
						/>
						<span className="slider" />
					</label>
				</div>
			</div>
			<div className='button-container-landing'>
				<button onClick={() => onStart(quizMode)}>Start Quiz</button>
			</div>
		</div>
	);
};

export default Landing;
