class Player {
  constructor(){
    this.rank=null;
    this.index = null;
    this.distance = 0;
    this.name = null;



  }
mathsrank(){
  database.ref('rank').on("value",(b)=>{
    this.rank=b.val()

  })

}
static updaterank(rank){
  database.ref('/').update({rank:rank})
}
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
