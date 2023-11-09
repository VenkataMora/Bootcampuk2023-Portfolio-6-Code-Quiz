var startEl=document.getElementById('start');
var timerEl=document.querySelector("#time");
var timer;
var timerCount;
startEl.addEventListener("click",function(event){
	event.preventDefault();
	timerCount=10;
	stratime();
	
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
