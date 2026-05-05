export async function fetchTriviaQuestions(settings) {
    const { amount, category, difficulty } = settings;

    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("Failed to fetch trivia questions");
        }

        throw new Error("Failed to fetch trivia questions");
    }

    const data = await response.json();

    return data.results
}