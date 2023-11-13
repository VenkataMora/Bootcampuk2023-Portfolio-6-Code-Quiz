document.addEventListener('DOMContentLoaded', function() {
  var hiScore = JSON.parse(localStorage.getItem('highestScores')) || [];
  var hiscoresList = document.getElementById('highscores');
function clearHiScores() {
  localStorage.removeItem('highestScores');
  hiscoresList.innerHTML = '';
};
hiScore.forEach(score => {
  var listItem = document.createElement('li'); 
  listItem.textContent = `${score.intials}: ${score.score}`; 
  hiscoresList.appendChild(listItem); 
});
var clearScoresButton = document.getElementById('clear'); 
clearScoresButton.addEventListener('click', clearHiScores); 
});
