var questionAnswers = [
    {
        number: 1,
        ques: "Javascript is an _______ language?",
        answer: 'Object-Oriented',
        options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"]
    },
    {
        number: 2,
        ques: "What does HTML stand for in programming?",
        answer: 'HyperText Markup Language',
        options: ["HyperText Markup Language", "HypterText Marketing Language", "High Text Machine Learning", "HTML"]
    },
    {
        number: 3,
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
        number: 4,
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
var startScreen=document.querySelector("#start-screen");
var questionEl=document.getElementById('questions');
var optionEls=document.querySelector('#choices');
var feedbackEl = document.getElementById("feedback");
var timer;
var timerCount;
var currentQuestion=1;
startEl.addEventListener("click",function(event){
	event.preventDefault();
    startScreen.style.display = "none";
	timerCount=questionAnswers.length*15;
	startScreen.classList.add('hide');
	stratime();
	getquestion();
	
});
function stratime(){
	timer=setInterval(function(){
		timerCount--;
		timerEl.textContent=timerCount;
		if(timerCount===0){
			clearInterval(timer);
			// confirm("gameover");
		}
	},1000);
}



function getquestion(){
var current = questionAnswers[currentQuestion];
document.getElementById("question-title").textContent= current.ques;
optionEls.innerHTML="";
current.options.forEach(function(choice){
    var button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice");
    button.addEventListener("click", selectAnswer);
    optionEls.appendChild(button);
});
}

function selectAnswer(event){
	var selectedOption = event.target;
    var correct = selectedOption.textContent === questionAnswers[currentQuestion].answer;
    if (correct) {
        score+=10;
        feedbackEl.textContent ="Correct!";
    } else{
    	timer -= 10;
    }
    feedbackEl.classList.remove("hide");
   
         


};