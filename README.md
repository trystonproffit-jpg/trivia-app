# Trials of Trivia

A fantasy-themed trivia quiz app built with React. Users enter a mysterious tavern, choose their quiz settings, answer enchanted trivia scrolls, and receive a goofy fantasy result title based on their score.

## Project Description

Trials of Trivia is a frontend React application that uses the Open Trivia Database API to generate quiz questions. The app lets users choose the number of questions, a category, and a difficulty level before starting a quiz.

The goal of this project is to practice:

- React components
- Client-side routing
- State management
- Fetching data from a public API
- Loading and error handling
- Conditional rendering
- Basic form validation
- Styling a polished user interface

## User Story

As a trivia player, I want to choose a quiz category and difficulty, answer questions one at a time, and see a final score so that I can test my knowledge in a fun and interactive way.

## Problem It Solves

Many trivia apps feel plain and generic. This app adds a playful fantasy theme to make the quiz experience feel more engaging and memorable while still keeping the interface simple and easy to use.

## Target User

This app is for casual users who enjoy trivia games and want a quick, themed quiz experience.

## API Used

This project uses the Open Trivia Database API:

```txt
https://opentdb.com/api.php
```

The API provides trivia questions based on:

- question amount
- category
- difficulty
- question type

Example API request:

```txt
https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986
```

## Features

- Choose number of questions
- Choose quiz category
- Choose difficulty level
- Fetch live trivia questions from an external API
- Decode API text for clean display
- Shuffle answer choices
- Display one question at a time
- Track score
- Show correct and incorrect answer feedback
- Disable answers after selection
- Display quiz progress with an animated progress bar
- Show final score and percentage
- Display fantasy-themed result titles and messages
- Return to home from multiple pages
- Validate quiz setup input
- Handle loading, error, and empty question states

## Routes

| Route | Description |
|---|---|
| `/` | Home page / tavern entrance |
| `/setup` | Quiz setup page |
| `/quiz` | Main quiz page |
| `/results` | Final results page |

## Components

| Component | Purpose |
|---|---|
| `HomeButton` | Reusable button for returning to the home page |
| `AnswerButton` | Displays each answer choice |
| `QuestionCard` | Displays current question and progress bar |
| `Loading` | Displays loading state while fetching questions |
| `ErrorMessage` | Displays API or validation-related errors |

## Main Pages

| Page | Purpose |
|---|---|
| `Home.jsx` | Introduces the app and sends user to setup |
| `Setup.jsx` | Lets user choose quiz settings |
| `Quiz.jsx` | Fetches questions and runs the quiz |
| `Results.jsx` | Shows final score, title, message, and replay options |

## Technologies Used

- React
- Vite
- React Router
- JavaScript
- CSS
- Open Trivia Database API

## How to Run Locally

Clone the repository:

```bash
git clone git@github.com:trystonproffit-jpg/trivia-app.git
```

Move into the project:

```bash
cd trivia-app/client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Current MVP Status

The current MVP includes the full quiz flow:

```txt
Home → Setup → Quiz → Results
```

Users can choose quiz settings, answer API-generated questions, see feedback, track their score, and view a themed result screen.

## Future Improvements

Possible future features:

- Add more fantasy-themed visuals
- Add a background image or generated fantasy scene
- Add high score tracking with localStorage
- Add sound effects
- Add more category options
- Add a timer per question
- Add a review screen for missed questions
- Add animations between questions
- Deploy the app with Netlify or Vercel

## Author

Built by Tryston Proffit as part of a React capstone project.