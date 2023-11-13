var questionAnswers = [
    {
        ques: "Javascript is an _______ language?",
        answer: 'Object-Oriented',
        options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"]
    },
    {
        ques: "What does HTML stand for in programming?",
        answer: 'HyperText Markup Language',
        options: ["HyperText Markup Language", "HypterText Marketing Language", "High Text Machine Learning", "HTML"]
    },
    {
        ques: "Which programming language is used to create websites?",
        answer: 'HTML/CSS/JavaScript',
        options: [
            "HTML/CSS/JavaScript",
            "Java/C#/.NET",
            "Python/Ruby/PHP",
            "SQL/NoSQL"
        ]
    },
    {

        ques: " Which function is used to serialize an object into a JSON string in Javascript?",
        answer: 'stringify()',
        options: [
            'parse()',
            'stringify()',
            'encodeURIComponent()',
            'decodeURIComponent()'
        ]
    }
];
var startEl=document.getElementById('start');
var timerEl=document.querySelector("#time");
var startScreen=document.getElementById("start-screen");
var questionEl=document.getElementById('questions');
var optionEls=document.getElementById('choices');
var feedbackEl = document.getElementById("feedback");
var end = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var intialsinput=document.querySelector("#initials");
var submitEl=document.getElementById("submit");

var timer;
var score = 0;
var timerCount;
var currentQuestion=0;
startEl.addEventListener("click",function(event){
	event.preventDefault();
    startScreen.classList.add('hide');
    questionEl.classList.remove("hide"); 
	timerCount=questionAnswers.length*15;
	startScreen.classList.add('start');
	stratime();
	getquestion();
	
});
function stratime(){
	timer=setInterval(function(){
		timerCount--;
		timerEl.textContent=timerCount;
		if(timerCount===0){
			endGame();
		}
	},1000);
};



function getquestion(){
var current = questionAnswers[currentQuestion];
document.getElementById("question-title").textContent= current.ques;
optionEls.innerHTML="";
current.options.forEach(function(choice){
    var button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choices");
    button.addEventListener("click", correctAnswer);
    optionEls.appendChild(button);
});
}

function correctAnswer(event){
	var selectedOption = event.target;
    var correct = selectedOption.textContent === questionAnswers[currentQuestion].answer;
    if (correct) {
        score+=10;
        feedbackEl.textContent ="Correct!";
    } else{
        feedbackEl.textContent ="Wrong";
    	timerCount -= 10;
    }
    feedbackEl.classList.remove("hide");
    setTimeout(() => {
        feedbackEl.classList.add("hide");
      }, 300);
      currentQuestion++;
    if(currentQuestion<questionAnswers.length){
    	getquestion();
    }else{
        endGame();
    }
};

function endGame() {  
    clearInterval(timer);
    questionEl.classList.add("hide");
    questionEl.style.display='none';
    end.classList.remove("hide");
    finalScoreEl.textContent = score;
};

function highScores(){
    var intials=intialsinput.value.trim();
    if(intials!==''){
        var newHighscore={intials,score};
        var highestScores=JSON.parse(localStorage.getItem("highScores"))||[];
        highestScores.push(newHighscore);
        localStorage.setItem('highestScores',JSON.stringify(highestScores));
        window.location.href="highscores.html";
    }
};

startEl.addEventListener("click", getquestion);
submitEl.addEventListener("click", highScores);
var highScoresLink = document.querySelector(".scores a");
highScoresLink.addEventListener("click", function(e){
    e.preventDefault();
    window.location.href="highscores.html";
    });