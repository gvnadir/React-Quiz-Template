import React, { useState, useMemo, useEffect } from 'react';
import './App.css'
import rawQuestions from './data/questions.json';
import Landing from './components/Landing/Landing';
import QuizResult from './components/QuizResult/QuizResult';
import { shuffleArray, isQuestionCorrect } from './utils/utils';

function App() {

	const [questions, setQuestions] = useState(() => shuffleArray(rawQuestions));
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState(
		() => questions.map(() => [])
	);
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		let timer;
		if (quizStarted && !showResults) {
			timer = setInterval(() => {
				setTimeElapsed((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [quizStarted, showResults]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	};

	if (!quizStarted) {
		return <Landing onStart={() => setQuizStarted(true)} />
	}

	if (showResults) {
		let totalScore = 0;
		questions.forEach((q, idx) => {
			if (isQuestionCorrect(idx, questions, selectedAnswers)) {
				totalScore += 1;
			}
		});
	}

	const handleQuit = () => {
		setShowResults(true);
	};

	const handleRestart = () => {
		setQuestions(shuffleArray(rawQuestions));
		setQuizStarted(true);
		setCurrentQuestion(0);
		setCurrentAnswerIndex(0);
		setSelectedAnswers(() => shuffleArray(rawQuestions).map(() => []));
		setShowResults(false);
		setTimeElapsed(0);
	};


	if (showResults) {
		return (
			<QuizResult
				questions={questions}
				selectedAnswers={selectedAnswers}
				currentQuestion={currentQuestion}
				timeElapsed={formatTime(timeElapsed)}
				isQuestionCorrect={isQuestionCorrect}
				handleRestart={handleRestart}
			/>
		);
	}

	const handleSelectOption = (idx, type) => {
		setSelectedAnswers(prevSelected => {
			const newSelected = [...prevSelected];
			if (type === 'radio') {
				newSelected[currentQuestion] = [idx];
			} else {
				if (newSelected[currentQuestion].includes(idx)) {
					newSelected[currentQuestion] = newSelected[currentQuestion].filter(i => i !== idx);
				} else {
					newSelected[currentQuestion] = [...newSelected[currentQuestion], idx];
				}
			}
			return newSelected;
		});
	};

	const handleNext = () => {
		if (currentQ.options.length === 2 && currentQ.options.includes('True') && currentQ.options.includes('False')) {
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(prevQ => prevQ + 1);
				setCurrentAnswerIndex(0);
			} else {
				setShowResults(true);
			}
		} else {
			if (currentAnswerIndex < currentQ.options.length - 1) {
				setCurrentAnswerIndex(prev => prev + 1);
			} else {
				if (currentQuestion < questions.length - 1) {
					setCurrentQuestion(prevQ => prevQ + 1);
					setCurrentAnswerIndex(0);
				} else {
					setShowResults(true);
				}
			}
		}
	};

	const currentQ = questions[currentQuestion];
	return (
		<div className="container">
			<div className="content">
				<h2>Question {currentQuestion + 1} / {questions.length}</h2>
				<p className="time">⏱ Time: {formatTime(timeElapsed)}</p>
				<p className="question"><strong>{currentQ.text}</strong></p>
				<div className="options-container">
					{currentQ.options.length === 2 && currentQ.options.includes('True') && currentQ.options.includes('False') ? (
						currentQ.options.map((option, idx) => (
							<label key={idx} className="option-label">
								<input
									type="radio"
									name={`question-${currentQuestion}`}
									value={idx}
									checked={selectedAnswers[currentQuestion]?.includes(idx)}
									onChange={() => handleSelectOption(idx, 'radio')}
								/>
								{option}
							</label>
						))
					) : (
						<label className="option-label">
							<input
								type="checkbox"
								value={currentAnswerIndex}
								checked={selectedAnswers[currentQuestion]?.includes(currentAnswerIndex)}
								onChange={() => handleSelectOption(currentAnswerIndex, 'checkbox')}
							/>
							{currentQ.options[currentAnswerIndex]}
						</label>
					)}
				</div>
			</div>
			<div className="footer">
				<div className="button-container">
					<button onClick={handleNext}>Next</button>
				</div>
				<div className="button-submit-container">
					<button className="submit" onClick={handleQuit}>Submit</button>
				</div>
			</div>
		</div>
	);

}

export default App;
