import React from 'react';
import './QuizResult.css'

const QuizResult = ({ questions, selectedAnswers, currentQuestion, timeElapsed, isQuestionCorrect, handleRestart }) => {
	const totalScore = questions
		.slice(0, currentQuestion + 1)
		.reduce((score, _, idx) => score + (isQuestionCorrect(idx, questions, selectedAnswers) ? 1 : 0), 0);

	return (
		<div className='results-container'>
			<h2>Quiz results</h2>
			<p>
				Score: <strong>{totalScore} / {currentQuestion + 1}</strong> (
				<strong>{Math.round((totalScore / (currentQuestion + 1)) * 100)}%</strong>)
			</p>
			<p>Elapsed Time: <strong>{timeElapsed}</strong></p>
			<hr />
			{questions.slice(0, currentQuestion + 1).map((q, idx) => {
				const wasCorrect = isQuestionCorrect(idx, questions, selectedAnswers);
				const correctAnswersList = q.correct.map(answerIdx => q.options[answerIdx]).join(", ");
				const userAnswersList = selectedAnswers[idx].length > 0
					? selectedAnswers[idx].map(answerIdx => q.options[answerIdx]).join(", ")
					: "none";

				return (
					<div key={idx} style={{ marginBottom: "1.5em" }}>
						<h3>Question {idx + 1}:</h3>
						<p><em>{q.text}</em></p>
						<p>✅ <strong>Correct answers:</strong> {correctAnswersList}</p>
						<p>✍️ <strong>Your selections:</strong> {userAnswersList}</p>
						<p>🡆 <strong>Result:</strong>{" "}
							<span style={{ color: wasCorrect ? "green" : "red", fontWeight: "bold" }}>
								{wasCorrect ? "Correct" : "Incorrect"}
							</span>
						</p>
					</div>
				);
			})}
			<button className="restart" onClick={handleRestart}>Restart Quiz</button>
		</div>
	);
};

export default QuizResult;
