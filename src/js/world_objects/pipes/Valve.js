/*
  Valve - controls the flow of liquids through the pipes.
*/

import Group from "../../shapes/Group";
import Rect from "../../shapes/Rect";
import Pipe from "./Pipe";
import * as d3 from "d3";

export default class Valve extends Pipe {
  /**
   * constructor()
   * @description constructs the valve
   * @param {Point} center the center of the valve
   * @param {Number} width the width of the valve
   * @param {Number} interiorHeight the interior height of the valve
   * @param {Number} wallWidth the width of the walls of the valve
   */
  constructor(world, player, layer, position, length, interiorHeight, wallWidth) {
    super(world, player, layer, position, length, interiorHeight, wallWidth);

    this._opened = false;


    this._description = [
      "Valves control the flow of fluids"
    ]
  }


  /**
   * create()
   * @description creates the valve
   */
  create() {
    super.create();

    let self = this;

    this._latchButton = new Rect(
      d3.select("[name='clicks']"),
      {
        x: this._position.x + this._length / 2 - this._length / 10,
        y: this._position.y + this._wallWidth
      },
      this._length / 5,
      this._interiorHeight
    )

    this._latchButton.fill.opacity = 0;
    this._latchButton.stroke.opacity = 0;
    this._latchButton.create();
    this._latchButton.setOnClick(() => {
      self.toggle();
    })

    this._graphicsGroup.add(this._latchButton);

  }

  /**
	 * createGraphics()
	 * @description creates the graphics for the pipe 
	 * @param {svgGroup} svgGroup the svg group for the graphics
	 */
	createGraphics(svgGroup) {
		
		let group = new Group();

		let walls = new Rect(
			svgGroup, 
			{...this.position},
			this._length,
			this._diameter
		)
		walls.fill.color = "black"
		walls.fill.opacity = 1
		walls.stroke.color = "black"
		walls.stroke.opacity = 0;
		walls.create();
		group.add(walls)

		let interior = new Rect(
			svgGroup, 
			{x: this._position.x - this._wallWidth, y: this._position.y + this._wallWidth},
			this._length + this._wallWidth * 2,
			this._interiorHeight
		)
		interior.stroke.opacity = 0;
		interior.fill.color = "white"
		interior.fill.opacity = 1
		interior.create();
    group.add(interior)


    this._latch = new Rect(
      svgGroup, 
      {
        x: this._position.x + this._length / 2 - this._length / 10, 
        y: this._position.y + this._wallWidth
      },
      this._length / 5,
      this._interiorHeight
    )
    this._latch.fill.color = "black"
    this._latch.stroke.color = "black"
    this._latch.create()
    group.add(this._latch);

		return group;
	}



  /**
   * toggle()
   * @description toggle the valve opened and closed
   */
  toggle() {
    if(this._opened) {
      this._opened = false;
      this._latch.show();
    } else {
      this._opened = true;
      this._latch.hide();
    }
  };

  

  /**
   * get name()
   * @returns name of this Valve
   */
  get name() {
    return "Valve";
  }


  

}
