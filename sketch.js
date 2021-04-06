var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;
var database;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFed=database.ref('FeedTime');
  lastFed.on("value",feedDog);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedtheDog=createButton("Feed the Dog");
  FeedtheDog.position(900,95);
  FeedtheDog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
  textSize(20);
  fill('black');
  text("Food Remaining:"+foodS,700,95)

  if (lastFed == 0) {
     text(`Last Feed: 12 AM`, 350, 30); 
    } 
    else if (lastFed >= 12) { 
      text('Last Feed:' +lastFed % 12 +'PM', 350, 30);
     } 
     else {
        text('Last Feed:'+ lastFed+ 'AM', 350, 20);
     }

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
 
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS
    
  })
  database.ref('/').update({
    "FeedTime":hour()
  })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
