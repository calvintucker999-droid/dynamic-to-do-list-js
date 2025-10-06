function checkAnswer() {
// Step 1: Define the correct answer
const correctAnswer = "4";

// Step 2: Get the user's selected answer
const selectedOption = document.querySelector('input[name="quiz"]:checked');

// Handle case when no answer is selected
if (!selectedOption) {
    document.getElementById('feedback').textContent = "Please select an answer before submitting.";
    return;
}

const userAnswer = selectedOption.value;

// Step 3: Compare user answer with correct answer
const feedback = document.getElementById('feedback');
if (userAnswer === correctAnswer) {
    feedback.textContent = "Correct! Well done.";
    feedback.style.color = "green";
} else {
    feedback.textContent = "That's incorrect. Try again!";
    feedback.style.color = "red";