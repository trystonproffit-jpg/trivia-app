export async function fetchTriviaQuestions(settings) {
    const { amount, category, difficulty } = settings;

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("Failed to fetch trivia questions");
        }

        throw new Error("Failed to fetch trivia questions");
    }

    const data = await response.json();

    const decodedResults = data.results.map((question) => {
        return {
            ...question,
            question: decodeURIComponent(question.question),
            correct_answer: decodeURIComponent(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
                decodeURIComponent(answer)
            ),
        };
    });

    return decodedResults
}