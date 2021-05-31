class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
    car1.addImage(car1Image);
    car2.addImage(car2Image);
    car3.addImage(car3Image);

    car4.addImage(car4Image);
car1.scale=0.5
car2.scale=0.6
car3.scale=0.6

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.mathsrank()
    
    if(allPlayers !== undefined){
      var display_position = 100;
      background("black")
     image(track,0,-displayHeight*5,displayWidth,displayHeight*6)
      //index of the array
      var index = 0;

    //  x and y position of the cars
      var x = 150;
      var y;
      console.log(player.distance)

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill ("red")
        ellipse(x,y,100,80)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }

       
        textSize(15);
        text(allPlayers[plr].name ,cars[index-1].x,cars[index-1].y)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>4450){
  gameState=2
  player.rank+=1
  Player.updaterank(player.rank)

}
    drawSprites();

  }
  END(){
    console.log("retry")
    console.log(player.rank)
  }
}
