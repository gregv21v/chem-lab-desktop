/*
	Pump: every time you click the pump, a drop of liquid is
	produced. Liquid always comes from the bottom of the pump.

	Alternatively, if an engine is attached to the pump, it will pump
	fluid out automatically.




	extra:
		make it so button bubbles in and out when clicked

*/
import GameObject from "./GameObject";
import Drop from "./fluids/Drop";
import ToolTip from "../gui/ToolTip";
import { getRandomInt } from "../util";

import * as d3 from "d3"
import Fluid from "./fluids/Fluid";
import Group from "../shapes/Group";
import Circle from "../shapes/Circle";
import Rect from "../shapes/Rect";

export default class Pump extends GameObject {
	/**
	 * constructor()
	 * @description constructs the pump game object
	 * @param {World} world the world that the pump is in
	 * @param {Point} position the position of the pump
	 * @param {Number} production 
	 */
	constructor(game, layer, position, production) {
		super(layer, position, {x: 0, y: 0})

		this._production = production; // the amount the pump produces
		this._position = position; // the position of the pump
		this._game = game; // the game

		
		this._description = [
			"Produces liquids when clicked"
		]

		this._possibleFluids = [
			new Fluid("Rocks", 3, this._production * this._production, 200, -10, {red: 102, green: 102, blue: 153, opacity: 1}),
			new Fluid("Minerals", 3, this._production * this._production, 200, -10, {red: 142, green: 140, blue: 145, opacity: 1}),
			new Fluid("Iron", 3, this._production * this._production, 200, -10, {red: 102, green: 51, blue: 0, opacity: 1}),
			new Fluid("Water", 2, this._production * this._production, 50, -5, {red: 0, green: 0, blue: 255, opacity: 0.5}),
			new Fluid(
				"Algea", 1, 
				this._production * this._production, 50, -5, 
				{red: 0, green: 200, blue: 0, opacity:0.7}
			)
			//new Fluid("Dust", 5, this._production * this._production, 20, {red: 173, green: 161, blue: 113, opacity: 255}),
			//new Fluid("Lava", 1, this._production * this._production, 10, {red: 255, green: 0, blue: 0, opacity: 255}),
		]
	}

	create() {
		this._graphicsGroup = this.createGraphics(this._layer);

		var self = this;
		this._graphicsGroup.getObject("button").svg.on("mousedown", () => {

			switch(self._game.player.mode) {
				case 0: // place mode
					if(self._game.player.hand === null) {
						self.animate();
						self.produceDrop(self._game.world)
					} else {
						if(self._game.world.place(self)) self._game.player.hand = null;
					}
					break; 
				case 1: // edit mode
					self._game.player.hand = self;
					break;
				case 2: // sell mode 
					self._game.player.credits += 10;
					self._game.hud.update();
					break;    
			}
		})

		this.update();
	};

	update() {
		this._graphicsGroup.update();
	}


	/**
	 * animate() 
	 * @description animates the graphics of the svg 
	 */
	animate() {
		let spout = this._graphicsGroup.getObject("spout");
		let duration = 100
		spout.svg.rect
			.transition()
				.duration(duration)
				.attr("width", this._production / 20)
				.attr("x", this._position.x + this._production / 40)
		spout.svg.rect
			.transition()
				.duration(duration)
				.delay(duration)
				.attr("width", this._production)
				.attr("x", this._position.x - this._production / 2)

	}



	/**
	 * createGraphics()
	 * @description the group of that the graphic is attached to
	 * @param {SVGGroup} svgGroup the svg group to add the graphic to
	 */
	createGraphics(svgGroup) {
		let group = new Group();

		let spout = new Rect(svgGroup, {
			x: this._position.x - this._production / 2,
			y: this._position.y + 10 - this._production / 2
		}, this._production, this._production)

		spout.fill.color = "blue";
		spout.fill.opacity = 1;
		spout.create();
		group.add(spout, "spout");

		let button = new Circle(svgGroup, {...this._position}, 10)
		button.fill.color = "red";
		button.fill.opacity = 1;
		button.create();
		group.add(button, "button");

		return group;
	}


	/**
	 * produceDrop()
	 * @description Creates a drop of liquid upon clicking the pump.
	 * @param {World} world the world to produce the drop in
	 */
	produceDrop(world) {
		let fluid = this._possibleFluids[getRandomInt(0, this._possibleFluids.length)];
		let size = getRandomInt(5, this._production)

		let drop = new Drop(
			d3.select("[name='debug']"),
			{x: this._position.x - this._production/2, y: this._position.y}, // position
			{x: 0, y: 1}, // velocity
			size,
			fluid
		)
		
		drop.create();
		world.addDrop(drop);
	}

	updateTooltip() {
	  this._tooltip.position = this._position;
	}




	/**
	 * moveBy()
	 * @description moves the position of the Snappable by delta
	 * @param {Point} delta the difference between the current position and the new position
	 */
	moveBy(delta) {
		this._position.x += delta.x;
		this._position.y += delta.y;
		this._graphicsGroup.moveBy(delta.x, delta.y)
	}


	/**
	 * moveTo()
	 * @description moves to a given point, where the center of the Snappable is
	 *  fixed at the given point
	 * @param point the point to center on
	*/
	moveTo(point) {

		let delta = {
			x: point.x - this._position.x,
			y: point.y - this._position.y
		}

    	this.moveBy(delta);
  	}

	/**
	 * get production()
	 * @description gets how much this pump produces
	 * @returns the amount this pump produces
	 */
	get production() {
		return this._production;
	}

	/**
	 * set world()
	 * @description sets the world that this pump is assigned to 
	 * @param {World} world the world that this pump is assigned to
	 */
	set world(value) {
		this._world = value;
	}

	/**
	 * get width()
	 * @returns the width of the pump
	 */
	get width() {
		return this._production;
	}


	/**
	 * get height()
	 * @returns the height of the Pump
	 */
	get height() {
		return this._production;
	}

	/**
	 * get name()
	 * @description A info used for creating a tooltip
	*/
	get name() {
		return "Pump: " + this._production;
	}

	/**
	 * get liquidType()
	 * @description gets the liquid type
	 */
	get liquidType() {
		return "Water";
	}



	/**
	 * get description()
	 * @description gets the description
	 */
	get description() {
		return this._description;
	}

	/**
	 * getThumbnail()
	 * @description gets a thumbnail to represent this game object with the dimensions of width and height
	 * @param {Number} x the x coordinate
	 * @param {Number} y the y coordinate
	 * @param {Number} width the width of the thumbnail
	 * @param {Number} height the height of the thumbnail
	 * @param {SVGElement} group the group to add the thumbnail to
	 */
	getThumbnail(x, y, amount, group) {
		let graphics = this.createGraphics(group);

		graphics.moveTo(x + graphics.width / 2, y + graphics.height / 2);
		graphics.scale(0.75);
		graphics.update();
		
		return graphics;
	}

}
