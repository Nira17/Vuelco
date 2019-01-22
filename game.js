var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  keys: {
    RIGTH: 39,
    LEFT: 37,
  },


  start: function () {


    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;

    this.reset();

    this.interval = setInterval(function () {

      this.moveAll();
      this.clear();
      this.drawAll();
  



    }.bind(this))
  },

  reset: function () {
    this.background = new Background(this);
    this.player = new Player(this);
    
    this.drops = new Drops(this);
    
    
    // this.scoreBoard = ScoreBoard
    // this.framesCounter = 0;
    // this.obstacles = [];
    // this.score = 0;
  },

  clear: function () {
    console.log(this.canvas.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {
   this.background.draw();
   this.player.draw();
   this.drops.draw();
    // this.obstacles.forEach(function (obstacle) { obstacle.draw(); });
    // this.drawScore();
  },

  moveAll: function () {
   
    this.player.move();
    this.drops.move();
    // this.obstacles.forEach(function (obstacle) { obstacle.move(); });
  },

  // drawScore: function () {
  //         this.scoreBoard.update(this.score, this.ctx)
  //       }


  isCollision: function () {
    // colisiones genéricas 
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    // esto chequea que el personaje no estén en colisión con cualquier obstáculo
    return this.drops.some(function (obstacle) {
      return (
        ((this.player.x + this.player.w) >= obstacle.x &&
          this.player.x < (obstacle.x + obstacle.w) &&
          this.player.y + (this.player.h - 20) >= obstacle.y)
      );
    }.bind(this));
  },

}