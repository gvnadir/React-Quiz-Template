import React, { useState, useEffect } from 'react';
import questions from '../../data/questions';
import './Landing.css';

const Landing = ({ onStart }) => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		document.documentElement.classList.toggle('dark-theme', darkMode);
	}, [darkMode]);

	return (
		<div className='landing-container'>
			{/* <div className="theme-toggle-container"> */}
			{/* </div> */}
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
			<div className='theme-switcher-container'>
				<button onClick={() => setDarkMode(!darkMode)} className="theme-toggle-btn">
					{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
				</button>
			</div>
			<div className='button-container-landing'>
				<button onClick={onStart}>Start Quiz</button>
			</div>
		</div>
	);
};

export default Landing;
