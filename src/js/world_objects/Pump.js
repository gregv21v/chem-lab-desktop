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
import FluidRegistry from "./fluids/FluidRegistry";

export default class Pump extends GameObject {
	/**
	 * constructor()
	 * @description constructs the pump game object
	 * @param {World} world the world that the pump is in
	 * @param {Point} position the position of the pump
	 * @param {Number} production 
	 */
	constructor(layer, world, position, production) {
		super(layer, position, {x: 0, y: 0})

		this._production = production;
		this._position = position;

		this._svg = {
			spout: this._layer.append("rect"), // where the liquid comes out
			button: this._layer.append("circle") // pressed to get liquid
		}

		this._tooltip = new ToolTip(
	    	this._position,
	    	"Click to produce liquid"
		);


		var self = this;
		this._world = world;
		this._svg.button.on("mousedown", function() {
			if(self._world)
				self.produceDrop(world)
			else 
				console.log("You need to set the world for this pump to produce a drop.")
		})

		this._possibleFluids = [
			new Fluid("Water", 2, this._production * this._production, {red: 0, green: 0, blue: 200}),
			new Fluid("Smoke", -1, this._production * this._production, {red: 142, green: 140, blue: 145}),
			new Fluid("Dust", 5, this._production * this._production, {red: 173, green: 161, blue: 113}),
			new Fluid("Lava", 1, this._production * this._production, {red: 255, green: 0, blue: 0})
		]
	}

	create() {
		this.updateSVG();
	};

	updateSVG() {
		var self = this;
		//this._tooltip.createSVG();

		this._svg.button.attr("r", this._production);
		this._svg.button.attr("cx", this._position.x);
		this._svg.button.attr("cy", this._position.y + this._production);
		this._svg.button.style("fill", "red")
			.on("mouseenter", function() {
				self._tooltip.show();
			})
			.on("mouseout", function() {
				self._tooltip.hide();
			});

		this._svg.spout.attr("width", this._production);
		this._svg.spout.attr("height", this._production * 2);
		this._svg.spout.attr("x", this._position.x - this._production/2);
		this._svg.spout.attr("y", this._position.y + this._production);
	}


	/**
	 * produceDrop()
	 * @description Creates a drop of liquid upon clicking the pump.
	 * @param {World} world the world to produce the drop in
	 */
	produceDrop(world) {
		let fluid = FluidRegistry.getRandom();
		let size = getRandomInt(5, this._production)

		let drop = new Drop(
			d3.select("svg"),
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
		return this._production * 4;
	}


	/**
	 * get height()
	 * @returns the height of the Pump
	 */
	get height() {
		return this._production * 4;
	}

	/**
	 * get name()
	 * @description A info used for creating a tooltip
	*/
	get name() {
		return this._production;
	}

	/**
	 * get liquidType()
	 * @description gets the liquid type
	 */
	get liquidType() {
		return "Water";
	}

}
