/*
  Game - This is where the game starts
*/

import Player from "./Player"
import Shop from "./gui/Shop"
import TradeItem from "./gui/TradeItem"
import BorderedButton from "./gui/buttons/BorderedButton"
import * as d3 from "d3"
import FluidRegistry from "./world_objects/fluids/FluidRegistry"
import Fluid from "./world_objects/fluids/Fluid"
import EmptyFluid from "./world_objects/fluids/EmptyFluid"
import ScrollableContainer from "./gui/ScrollableContainer"


export default class Game {

  /**
   * constructor()
   * @description constructs the game 
   * @param {Integer} mode the mode of the game
   *  modes 
   *    0 => Test
   *    1 => Creative
   *    2 => Normal   
   */
  constructor(mode=0) {
    this._mode = mode;
    let mainSVG = d3.select("svg")

    this._layers = []

    this._layers.push(mainSVG.append("g")) // gui
    this._layers.push(mainSVG.append("g")) // containers
    this._layers.push(mainSVG.append("g")) // fluids

    this._layers[0].attr("name", "gui")
    this._layers[1].attr("name", "containers")
    this._layers[2].attr("name", "fluids")

    // add fluids to the fluid registery for use later
    FluidRegistry.register(new Fluid("Water", 2, {red: 0, green: 0, blue: 200}))
    FluidRegistry.register(new Fluid("Smoke", -1, {red: 142, green: 140, blue: 145}))
    FluidRegistry.register(new Fluid("Dust", 5, {red: 173, green: 161, blue: 113}))
    FluidRegistry.register(new Fluid("Magma", 1, {red: 255, green: 0, blue: 0}))
    FluidRegistry.register(new Fluid("Nitrogen Gas", -2, {red: 0, green: 0, blue: 100}))

    this._player = new Player(); // contains inventory

    //this.world = new World(this._player);
    this._shop = new Shop();


    /*this._testTradeItem = new TradeItem(
      {x: 30, y: 30},
      50, 50, "Player", 100, 50);
    this._testTradeItem.create(d3.select("svg"))*/
    

    this._testBtn = new BorderedButton(
      {x: 100, y: 100},
      50, 50, 2
    )

 
    //this.gui = new GUI();


    // setup the player


    // setup the world


    // setup the shop



    // setup the gui

    let self = this;
    d3.select("body").on("keydown", (event) => {
      self.onKeyPress(event)
    })
  }


  /**
   * render() 
   * @description renders the game 
   */
  render() {
    this._player.create();
    this._player.update()

    //this._testBtn.createSVG();
    //this._testTradeItem.createSVG();
  }

  /**
   * onKeyPress()
   * @description called when key is pressed
   */
  onKeyPress(event) {
    this._player.onKeyPress(event) 
  }
}
