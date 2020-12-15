var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=true;
var level=0, count=0, len=0;
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  start=true;
  len=0;
  count=0;
}
function nextSequence(){
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern)
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}
function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");
        setTimeout(function(){
            $('#'+currentColour).removeClass("pressed");
        },100);
}
function handler(){
   var userChosenColour=event.target.id;
   userClickedPattern.push(userChosenColour);
   animatePress(userChosenColour);
   playSound(userChosenColour);
   if(userClickedPattern.length===gamePattern.length){
     count=0;checkAnswer();
   }
   else{
     if(userChosenColour===gamePattern[len]){
       len++;
     }
     else{
       // console.log("userChosenColour 1");
       // console.log(userChosenColour);
       // console.log(gamePattern[len]);
       var audio=new Audio("sounds/wrong.mp3");
         audio.play();
         $('body').addClass("game-over");
               setTimeout(function(){
                   $('body').removeClass("game-over");
               },200);
               $('h1').text("Game Over, Press Any Key to Restart");
               startOver();
     }
   }
}
function checkAnswer(){
  // console.log(userClickedPattern);
      for(var i=0;i<gamePattern.length;i++){
        if(userClickedPattern[i]===gamePattern[i]){
          count++;
        }
      }
      if(count===gamePattern.length){
        // console.log("success");
        setTimeout(function(){
            nextSequence();
            userClickedPattern=[];
            len=0;
        },1000);
      }
      else{
        // console.log("from count");
        var audio=new Audio("sounds/wrong.mp3");
          audio.play();
          $('body').addClass("game-over");
                setTimeout(function(){
                    $('body').removeClass("game-over");
                },200);
                $('h1').text("Game Over, Press Any Key to Restart");
                startOver();
      }
}
$(document).on('keydown',function(){
  if(start==true){
    nextSequence();
    start=false;
  }
})
$(".btn").click(handler);
