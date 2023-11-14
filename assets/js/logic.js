// Load hi scores from local storage
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve high scores from local storage or use an empty array if there are no high scores
  var hiScore = JSON.parse(localStorage.getItem('highestScores')) || [];
  // Get reference to the hi scores list
  var hiscoresList = document.getElementById('highscores');
  // Function to clear hi scores
function clearHiScores() {
  localStorage.removeItem('highestScores');
  hiscoresList.innerHTML = '';
};
 // Render hi scores to the list
hiScore.forEach(score => {
  var listItem = document.createElement('li'); 
  listItem.textContent = `${score.intials}: ${score.score}`; 
  hiscoresList.appendChild(listItem); 
});
// Attach event listener to the "Clear Highscores" button
var clearScoresButton = document.getElementById('clear'); 
clearScoresButton.addEventListener('click', clearHiScores); 
});
