var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: 0,
  points: 50,
  ColorPlus:0,
  keys: {
    RIGTH: 39,
    LEFT: 37,
  },
  arrayDrops: [],
  arrayDropsFriends: [],
    





  start: function (id) {
    var fps2 = 1000 / this.fps
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;

    this.reset();

    this.dropCount = 0;
    this.dropFriendsCount = 0;

    this.interval = setInterval(function () {
      this.clear();
      this.drawAll();
      this.moveAll();
      this.isCollision()
      this.isCollisionFriends();

      this.dropCount++;
      this.dropFriendsCount++;

      if (this.dropCount === 40) {
        this.dropCount = 0;
        this.createDrops();

      }

      if (this.dropFriendsCount === 80) {
        this.dropFriendsCount = 0;
        this.createDropsFriends();

      }
    }.bind(this), fps2)
  },




  reset: function () {
    this.background = new Background(this);
    this.player = new Player(this);

    
  },
  createDrops: function () {

    var dropItem = new Drops(this, Math.round(Math.random() * (900 - 400) + 400), 60, );
    this.arrayDrops.push(dropItem)

  },

  createDropsFriends: function () {

    var dropItem = new DropsFriends(this, Math.round(Math.random() * (900 - 400) + 400), 62,);
    this.arrayDropsFriends.push(dropItem)

  },



  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawAll: function () {
    this.background.draw();
    this.drawDrops();
    this.player.draw();
    this.drawLives();
    this.drawDropsFriends();
    this.drawball();
    

  },


  drawDrops: function () {
    this.arrayDrops.forEach(function (elemt) {
      elemt.draw();
      elemt.move();
    })
  },
    drawDropsFriends: function () {
    
      this.arrayDropsFriends.forEach(function (elemtf) {
     
        elemtf.drawf();
        elemtf.movef();
      })
 
    },


  moveAll: function () {

    this.player.move();
  },



  isCollisionFriends: function () {

    this.arrayDropsFriends.forEach(function (dropf) {
      var dx = this.player.x - dropf.x;
      var dy = this.player.y - dropf.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.player.r + dropf.r) {
        if (this.ColorPlus >= 0) {
          this.ColorPlus++;
        } 
        if(this.ColorPlus >= 50){
          setTimeout(function(){
            alert("Paint");
            document.location.reload();
          },500)
        }
     
        

      }
    }.bind(this))
    //console.log(result)
  },



  isCollision: function () {

    this.arrayDrops.forEach(function (drop) {
      var dx = this.player.x - drop.x;
      var dy = this.player.y - drop.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.player.r + drop.r) {
        if (this.points >= 0) {

          this.points--;
        }

        else if (this.points==0) {
         
          this.points=0;
          setTimeout(function(){
            alert("Game over");
            document.location.reload();
          },500)

        }

      }

    }.bind(this))
    //console.log(result)
  },


  drawLives: function () {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Point: " + this.points, 40, 40);
  },
  drawball: function () {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Color +: " + this.ColorPlus, 700, 40);
  }


}