const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var time;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg();
    
}

function setup(){
     canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    textFont("spanish");
    strokeWeight(2);
    stroke("blue");
    fill("black");
    textSize(30);
    

    if(time>=12){
        text("Time : "+ time%12 + " PM", 50,100);
    }else if(time==0){
        text("Time : 12 AM",100,100);
    }else{
        text("Time : "+ time%12 + " AM", 50,100);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   
    //change the data in JSON format and store it in variable responseJSON
     var responseJSON =await response.json()
    console.log(responseJSON.datetime);
    //fetch datetime from responseJSON
    var dateTime = responseJSON.datetime;
    // slice the datetime to extract hour
     time = dateTime.slice(11,13);

    
    if(time>=0 && time<18 ){
        bg = "sunrise.png";
    }
    else{
        bg="sunset.png"
    }
    
    backgroundImg = loadImage(bg);
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}