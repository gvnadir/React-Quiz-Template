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
			<h2>SailPoint IIQ Associate Exam Simulator</h2>
			<h3 id='total-label'>Total Questions: </h3>
			<h3 id='total-questions'>{questions.length}</h3>
			<p className='description'>
				Welcome to the SailPoint IIQ Associate Exam Simulator!
				<br />
				This is a simulation inspired by the SailPoint IdentityIQ Associate Certification Exam.
				<br /><br />
				You'll be presented with one answer at a time for each question.
				<br />
				You can choose to either select the answer or skip it using the "Next" button.
				<br />
				The quiz will automatically be submited once all questions and answers have been completed.
				Alternatively, you can use the "Submit" button at any time to submit early and review your progress.
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
