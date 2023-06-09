/*
  The Player object stores all the relavent information about the player
  including items that he has in the store, and in the world.
*/

export default class TestPlayer {
  constructor() {
    var svg = document.querySelector("svg");
    var height = svg.getAttribute("height") - 30;
    var self = this;

    this.hand = null;

    this.world = new World(this, {x: 270, y: 20}, svg.getAttribute("width") - (270 + 400), height);
    this.inventory = new Inventory(this, {x: 20, y: 45}, 250, height - 25);
    this.credits = new ValueBox({x: 20, y: 20}, 250, 25);
    this.credits.setFill({color: "red"})
    this.credits.setTextFill({color: "black"})
    this.credits.setStroke({color: "black", width: 10})
    this.credits.setLabel("Coins");
    this.credits.setValue(0)

    // add example items to the players inventory

    this.inventory.add(new Valve(
      {
        x: this.inventory.width + this.world.width/2,
        y: this.world.height/2
      },
      20,
      10,
      5
    ));
    this.inventory.add(new TopTank({x: 475, y: 540}, {width: 40, height: 100}, 5));
    this.inventory.add(new TopTank({x: 475, y: 540}, {width: 40, height: 100}, 5));

    var newPipe = new Pipe({x: 500, y: 500}, 100, 10, 5)
    this.inventory.add(newPipe);



    this.sellBtn = new Button(
      {
        x: this.inventory.width + this.world.width/2 - 99 /* half the width of button */,
        y: this.world.height - 35 /* Space for the button */
      },
      208,
      30
    );
    this.sellBtn.setText("Sell");
    this.sellBtn.setFill({color: "red"});
    this.sellBtn.setStroke({color: "blue", width: 2})


    // positioned sell tank at center of world.
    var sellTank = new Tank(
      {
        x: this.inventory.width + this.world.width/2 - 100, /* border width of sell button */
        y: this.inventory.height - 50 - 6 // Space for the button
      },
      {
        width: 200,
        height: 40
      },
      5
    );
    sellTank.wallColor = "red";


    this.sellBtn.setOnClick(function() {
      console.log("Sold");

      // get the liquid from the tank
      var liquid = sellTank.getLiquid();
      console.log(liquid);

      // empty the tank
      sellTank.empty();

      self.credits.value += liquid.amount * liquid.type.value;
      self.credits.updateText();
      self.credits.createSVG();

    })

    var startPump = new Pump(this.world, {x: 0, y: 0}, 10);
    startPump.position.x = this.inventory.width + this.world.width/2 - startPump.width/2;
    startPump.position.y = startPump.width + startPump.production;

    var testValve = new Valve(
      {x: this.world.width / 2, y: this.world.height / 2},
      100, // width
      10, // interiorHeight
      5  // wallWidth
    )
    //testValve.showSnapAreas();

    /*var testFaucet = new Faucet({
      x: this.inventory.width + this.world.width/2 - 100,
      y: 50
    }, 50, 40, 10)*/



    this.world.add(sellTank);
    this.world.add(startPump);
    //this.world.add(testValve)
    //this.world.add(testFaucet);
  }


  update() {
    var self = this;
    setInterval(function() {
      self.world.update();
    }, 20);
  };

  createSVG() {

    this.inventory.createSVG();
    this.world.createSVG();
    this.sellBtn.createSVG();
    this.credits.createSVG();

    // show-hide snap areas
    //this.world.showSnapAreas();
  };

}
