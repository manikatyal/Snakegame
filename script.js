//Game Constants
let highscore=localStorage.getItem("highscore");//Updating and storing highscore value stored in system browser
if(highscore===null){
    hiscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(hiscoreval));

}
else{
    hiscoreval=JSON.parse(highscore);
    highscorebox.innerHTML="Highscore:" +hiscoreval;
   }

let inputdir={x:0 ,y:0};
const foodsound=new Audio('gmusic/snakeeat.mp3');
const gameover=new Audio('gmusic/gmover.mp3');

const musicsound=new Audio('gmusic/bgm.mp3');
let speed=8;
let score=0;
let lastpainttime=0;
let snakearr=[
    {x:13,y:15}
];//INITAL POSN OF OUR SNAKE KA HEAD
let food={x:6 , y:7};//INITAL POSIN OF FOOD
// Game Funtions

function main(ctime){
    window.requestAnimationFrame(main);
    
  // console.log(ctime);
   if((ctime - lastpainttime)/1000< 1/speed){
    return;
   }
   lastpainttime=ctime;
   gameengine();

}
function iscollide(snake){
    //If snake bump into itself(when snakehead smash its own body part)
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // If snake bump into wall
    if((snake[0].x<=0 || snake[0].x>=18) || (snake[0].y>=18 ||snake[0].y<=0)){
        return true;
    }

    }
     


function gameengine(){
    //part 1: is updating the snake array & food
    // If snake collides
    if(iscollide(snakearr)){
        gameover.play();
        musicsound.pause();
        inputdir={x:0, y:0};
        alert("Game Over . Press any key to start Again");
        snakearr=[{x:13,y:15}];//Restart the game
     
        score=0;
        scorebox.innerHTML=" Score: " +score;
       
    }
   //If snake eaten the food,increment score and snakearr,regenrate the food
   if(snakearr[0].x===food.x && snakearr[0].y===food.y){
    foodsound.play();
    //unshift add new elemt in 1st pos of snakearr
    snakearr.unshift({x: snakearr[0].x + inputdir.x , y: snakearr[0].y + inputdir.y});
  //To modify and update score and Highscore
    score+=1;
    scorebox.innerHTML=" Score: " +score;
    if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("highscore",JSON.stringify(hiscoreval));
        highscorebox.innerHTML="Highscore: "+ hiscoreval;//updating highscore
    }
    //to gen food between row and col==2 to 16
    let a=2;
    let b=16;
    food={x: Math.round(a + (b - a)*Math.random()),y: Math.round(a + (b - a)*Math.random())};
   }
   //If snake not eaten food then just move the snake
   // So we had tomove evry block of snakebody(snakearr)to next position
   for(let i=snakearr.length-2;i>=0;i--){
    
    snakearr[i+1]={...snakearr[i]};//this object destructuring is used to avoid refrences ka jhamela
   }
    snakearr[0].x+=inputdir.x;//Moving head
    snakearr[0].y+=inputdir.y;
    //part 2: is Display the snake 

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakelement=document.createElement('div');
        snakelement.style.gridRowStart=e.y;
        snakelement.style.gridColumnStart=e.x;
      
        if(index===0){
            snakelement.classList.add('head');  
        }
        else{
            snakelement.classList.add('snake');
        }
        board.appendChild(snakelement);
    });
     //part 2: is Display the food


     foodelement=document.createElement('div');
     foodelement.style.gridRowStart=food.y;
     foodelement.style.gridColumnStart=food.x;
     foodelement.classList.add('food');
     board.appendChild(foodelement);

} 









//Main logic starts here
//This below given function is used instead of setimeout or setinterval for making game loop USED FOR
//  to perform an animation and requests that the browser call a specified function to update an animation before the next repaint(screen update).
window.requestAnimationFrame(main);

window.addEventListener('keydown',e  =>{
    inputdir={x:0, y:1};//start the game
    musicsound.play();
   
    switch(e.key){
            case "ArrowUp":
            inputdir.x= 0;
            inputdir.y= -1;
            break;
            case "ArrowDown":
            inputdir.x= 0;
            inputdir.y= 1;
            break;
            case "ArrowLeft":
            inputdir.x= -1;
            inputdir.y= 0;
            break;
            case "ArrowRight":
            inputdir.x= 1;
            inputdir.y= 0;
            break;
            default: break;//input dir will be x=0 and y=1 as initally if no dirn key is entered
    }
   
});
let up =document.getElementById('up');
up.addEventListener("click",function(){
    musicsound.play();
  inputdir.x=0;
  inputdir.y=-1;
});
let down =document.getElementById('down');
down.addEventListener("click",function(){
    musicsound.play();
  inputdir.x=0;
  inputdir.y=1;
});
let right =document.getElementById('right');
right.addEventListener("click",function(){
    musicsound.play();
  inputdir.x=1;
  inputdir.y=0;
});
let left =document.getElementById('left');
left.addEventListener("click",function(){
    musicsound.play();
  inputdir.x=-1;
  inputdir.y=0;
});





