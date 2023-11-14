// creates array with questions and answers
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
// Declaring DOM methods
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
// timing and scoring variables
var timer;
var score = 0;
var timerCount;
var currentQuestion=0;
// function to start the quiz
startEl.addEventListener("click",function(event){
	event.preventDefault();
    // hide the start screen and display the question element
    startScreen.classList.add('hide');
    questionEl.classList.remove("hide"); 
    // set the timer count based on the number of questions
	timerCount=questionAnswers.length*15;
    // start the timer and update the time displayed on the page
	startScreen.classList.add('start');
	stratime();
    // get the questions and update the displayed question
	getquestion();
	
});
// function to start time
function stratime(){
    // Set timer countdown interval
	timer=setInterval(function(){
		// Decrement timer count
        timerCount--;
        // Update timer element
		timerEl.textContent=timerCount;
		// Check if timer has reached 0
        if(timerCount===0){
			// call end game function
            endGame();
		}
	},1000);
};



// function to get question
function getquestion(){
    // get current question object
    var current = questionAnswers[currentQuestion];
    
    // set question title text
    document.getElementById("question-title").textContent= current.ques;
    
    // clear option elements
    optionEls.innerHTML="";
    // iterate through current question options
    current.options.forEach(function(choice){
        // create button for each option
        var button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choices");
        
        // add click event listener to button
        button.addEventListener("click", correctAnswer);
        
        // append button to option elements
        optionEls.appendChild(button);
    });
}

// Checks the answer for the current question
function correctAnswer(event){
    // Get selected option
	var selectedOption = event.target;
    // Check if the selected option is correct
    var correct = selectedOption.textContent === questionAnswers[currentQuestion].answer;
    
    // Update score, feedback based on correctness
    if (correct) {
        score+=10;
        feedbackEl.textContent ="Correct!";
    } else{
        feedbackEl.textContent ="Wrong";
        timerCount =timerCount- 10;
    }
    
    // Show and hide feedback after 300ms
    feedbackEl.classList.remove("hide");
    setTimeout(() => {
        feedbackEl.classList.add("hide");
      }, 300);
    
    // Move to the next question
    currentQuestion++;
    
    // If there are more questions, get the next question
    if(currentQuestion<questionAnswers.length){
    	getquestion();
    }else{
        endGame();
    }
}
// function to end the game
function endGame() {  
    // stop the timer
    clearInterval(timer);
    // hide the question element
    questionEl.classList.add("hide");
    questionEl.style.display='none';
     // display the end screen
    end.classList.remove("hide");
    // show the final score
    finalScoreEl.textContent = score;
};
// function to highScore
function highScores(){
     // Check initials input and trim whitespaces
    var intials=intialsinput.value.trim();
    // If initials not empty
    if(intials!==''){
        // Create new high score object
        var newHighscore={intials,score};
        // Retrieve existing high scores from local storage or initialize as empty array
        var highestScores=JSON.parse(localStorage.getItem("highestScores"))||[];
        // Add new high score to the array
        highestScores.push(newHighscore);
        // Store updated high scores in local storage
        localStorage.setItem('highestScores', JSON.stringify(highestScores));
       // Redirect to high scores page
        window.location.href="highscores.html";
    }
};
// Event listener for starting the quiz
startEl.addEventListener("click", getquestion);
var highScoresLink = document.querySelector(".scores a");
highScoresLink.addEventListener("click", function(e){
     // prevent default action
    e.preventDefault();
     // navigate to highscores page
    window.location.href="highscores.html";
    });
    // Event listener for submitting high score
submitEl.addEventListener("click", highScores);