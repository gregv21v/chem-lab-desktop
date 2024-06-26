/*
  Player - The Player object stores all the relavent information about the player
  including items that he has in the shop, and in the world.
*/

import World from "./World"
import Inventory from "./gui/Inventory"
import ValueBox from "./gui/ValueBox"
import Valve from "./world_objects/pipes/Valve"
import Pipe from "./world_objects/pipes/Pipe"
import Tank from "./world_objects/tanks/Tank"
import Pump from "./world_objects/Pump"
import * as d3 from "d3"
import GameObject from "./world_objects/GameObject"
import ElbowPipe from "./world_objects/pipes/ElbowPipe"
import CrossPipe from "./world_objects/pipes/CrossPipe"

export default class Player {

  /**
   * constructor()
   * @description constructs the Player
   */
  constructor(game) {
    this._game = game;
    let svg = d3.select("svg");
    let height = svg.attr("height") - 30;

    // Modes:
    // 0 - Place Mode: You can place object 
    // 1 - Edit Mode: You can edit objects 
    // 2 - Sell Mode: You can sell objects
    this._mode = 0;
    this._hand = null;
    this._credits = 0;
    this._currentJobs = {};

    
    //this.inventory.createSlots();

    /**
     * Test Tanks
     */
    //let startX = 300;
    //let startY = 100;
    
    /*let testTanks = [
      new Tank(
        game.layers[1],
        {x: startX + 100, y: startY}, {width: 40, height: 40}, 5, 
        true, true, true, true 
      ),
      new Tank(
        game.layers[1],
        {x: startX + 200, y: startY}, {width: 40, height: 40}, 5, 
        true, false, true, true 
      ),
      new Tank(
        game.layers[1],
        {x: startX + 300, y: startY}, {width: 40, height: 40}, 5, 
        true, true, false, true 
      ),
      new Tank(
        game.layers[1],
        {x: startX + 400, y: startY}, {width: 40, height: 40}, 5, 
        true, true, true, false 
      ),
      new Tank(
        game.layers[1],
        {x: startX + 500, y: startY}, {width: 40, height: 40}, 5, 
        true, false, false, true 
      ),
      new Tank(
        game.layers[1],
        {x: startX + 600, y: startY}, {width: 40, height: 40}, 5, 
        false, false, false, false 
      )
    ]*/


    // positioned sell tank at center of world.
    


    /*this.sellBtn.setOnClick(function() {
      console.log("Sold");

      // get the liquid from the tank
      var liquid = sellTank.getLiquid();
      console.log(liquid);

      // empty the tank
      sellTank.empty();

      self.credits.value += liquid.amount * liquid.type.value;
      self.credits.updateText();
      self.credits.createSVG();

    })*/

    //testValve.showSnapAreas();

    /*var testFaucet = new Faucet({
      x: this.inventory.width + this.world.width/2 - 100,
      y: 50
    }, 50, 40, 10)*/



    //this.world.add(sellTank);
    //this.world.add(startPump);
    //this.world.add(testValve)
    //this.world.add(testFaucet);
  }

  /**
   * create()
   * @description creates the player
   */
  create() {
    
  }


  /**
   * removeJob()
   * @description removes a contract from the player
   * @param {Integer} id the id of the contract to remove
   */
  removeJob(id) {
    this._currentJobs[id] = null;
  }

  /**
   * addJob() 
   * @description adds a job to the players list of jobs
   * @param {Job} job job to add
   */
  addJob(job) {
    this._currentJobs[job.id] = job;
  }


  /**
   * get modeCount()
   * @description returns the number of player modes
   */
  get modeCount() {
    return 3;
  }

  /**
   * get hand()
   * @returns the object in the players hand
   */
  get hand() {
    return this._hand;
  }

  /**
   * set hand()
   * @description sets the player hand value
   * @param {GameObject} value the value to set the players hand to
   */
  set hand(value) {
    this._hand = value;
  }


  /**
   * get mode()
   * @description gets the mode value 
   */
  get mode() {
    return this._mode;
  }


  /**
   * set mode()
   * @description sets the mode value
   */
  set mode(value) {
    this._mode = value;
  }


  /**
   * set credits() 
   * @description sets the credits value 
   */
  set credits(value) {
    this._credits = value;
  }

  /**
   * get credits()
   * @description gets the credits value
   */
  get credits() {
    return this._credits;
  }


  

}
