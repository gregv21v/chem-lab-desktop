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
	constructor(world, player, layer, position, production) {
		super(layer, position, {x: 0, y: 0})

		this._production = production; // the amount the pump produces
		this._position = position; // the position of the pump
		this._world = world; // the world the pump is in
		this._player = player; // the player

		
		this._description = [
			"Produces liquids when clicked"
		]

		this._possibleFluids = [
			new Fluid("Rocks", 2, this._production * this._production, 200, -10, {red: 102, green: 102, blue: 153, opacity: 1}),
			new Fluid("Minerals", 2, this._production * this._production, 200, -10, {red: 142, green: 140, blue: 145, opacity: 1}),
			new Fluid("Iron", 3, this._production * this._production, 200, -10, {red: 102, green: 51, blue: 0, opacity: 1}),
			new Fluid("Water", 2, this._production * this._production, 50, -5, {red: 0, green: 0, blue: 255, opacity: 0.5}),
			/*new Fluid(
				"Algea", 2, this._production * this._production, 50, -5, {red: 0, green: 200, blue: 0, opacity:0.7}
			)*/
			//new Fluid("Dust", 5, this._production * this._production, 20, {red: 173, green: 161, blue: 113, opacity: 255}),
			//new Fluid("Lava", 1, this._production * this._production, 10, {red: 255, green: 0, blue: 0, opacity: 255}),
		]
	}

	create() {
		this._svg = {
			spout: this._layer.append("rect"), // where the liquid comes out
			button: this._layer.append("circle") // pressed to get liquid
		}

		var self = this;
		this._svg.button.on("mousedown", function() {
			if (self._player.hand === null) {
				if(self._player.isInEditMode) {
					self._player.hand = self;
				} else {
					self.produceDrop(self._world)
				}
			} else {
				if (self._world.place(self)) self._player.hand = null;
			}
		})

		this.update();
	};

	update() {
		var self = this;
		//this._tooltip.createSVG();

		this._svg.button.attr("r", this._production);
		this._svg.button.attr("cx", this._position.x);
		this._svg.button.attr("cy", this._position.y + this._production);
		this._svg.button.style("fill", "red")
			.on("mouseenter", function() {
				//self._tooltip.update();
				//self._tooltip.show();
			})
			.on("mouseleave", function() {
				//self._tooltip.update();
				//self._tooltip.hide();
			});

		this._svg.spout.attr("width", this._production);
		this._svg.spout.attr("height", this._production * 2);
		this._svg.spout.attr("x", this._position.x - this._production/2);
		this._svg.spout.attr("y", this._position.y + this._production);
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
		group.add(spout);

		let button = new Circle(svgGroup, this._position, 10)
		button.fill.color = "red";
		button.fill.opacity = 1;
		button.create();
		group.add(button);

		

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
			{x: this._position.x - this._production/2, y: this._position.y + this._production * 3}, // position
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
	 * moveRelativeToCenter()
	 * @description moves the Snappable relative to it's center
	 * @param point point to move to
	 */
	moveRelativeToCenter(point) {
		this._position.x = point.x - this._production
		this._position.y = point.y - this._production
	}


	/**
	 * moveTo()
	 * @description moves the pump to a point
	 */
	moveTo(point) {
		this._position.x = point.x - this._production/2
		this._position.y = point.y - this._production/2
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
