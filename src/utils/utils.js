export const shuffleArray = (arr) => {
	return [...arr].sort(() => Math.random() - 0.5);
};

export const isQuestionCorrect = (questionIndex, questions, selectedAnswers) => {
	const correctSet = new Set(questions[questionIndex].correct);
	const selectedSet = new Set(selectedAnswers[questionIndex]);
	if (correctSet.size !== selectedSet.size) {
		return false;
	}
	for (let idx of correctSet) {
		if (!selectedSet.has(idx)) {
			return false;
		}
	}
	return true;
};