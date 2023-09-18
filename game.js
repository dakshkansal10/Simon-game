var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var rounds=0;
var coins=100;

$("#restart").click(function(){
    location.reload(true);
})
$("#play").click(function(){
    if(!started){
        $("#winner").text(" ");
rounds++;
if(rounds==1)
{
    coins=100;
}
$("#coins").text("Coins:"+coins);
$("#rd").text("Rounds:"+rounds);
var level=0;
$("#level-title").text("Level "+level);
nextSequence();
started=true;
$("body").css("background-color"," hwb(244 0% 2%)");
}});

$(document).keypress(function(){
    if(!started){
        $("#winner").text(" ");
rounds++;
if(rounds==1)
{
    coins=100;
}
$("#coins").text("Coins:"+coins);
$("#rd").text("Rounds:"+rounds);
var level=0;
$("#level-title").text("Level "+level);
nextSequence();
started=true;
$("body").css("background-color"," hwb(244 0% 2%)");
}});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){
            
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }   
        
    }
    else{ 
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },400);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        coins=coins-20;
        if(coins==0)
        {
            rounds=0;
        }
        $("body").css("background-color","red");
        startOver();
    }
    
}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    if(level==11)
    {
        $("#level-title").text("Congratulations you are the Winner");
        coins=coins+20;
        winner();
        
    }
    else{
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    }
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    //   Another method for removing class after 100milliseconds.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
function winner()
{
  $("body").css("background-color","green");
  $("#winner").text("Press any key to play another round");
  $(document).keypress(startOver());
}
function finished()
{
    
}